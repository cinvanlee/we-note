import { Injectable } from "@angular/core";
import _ from "lodash";
import { ElectronService } from "../electron/electron.service";
import { NotebookService } from "../notebook/notebook.service";
import { WeNoteService } from "../we-note/we-note.service";

const fs = window.require("fs-extra");
const electron = window.require("electron");
const jf = window.require("jsonfile");
const shell = window.require("shelljs");
const yaml = window.require("js-yaml");
const psTree = window.require("ps-tree");

@Injectable({
    providedIn: "root"
})
export class HexoService {
    constructor(
        private wnService: WeNoteService,
        private nbService: NotebookService,
        private electronService: ElectronService
    ) {
        // shell.exec not support Electron
        // https://github.com/shelljs/shelljs/wiki/Electron-compatibility
        shell.config.execPath = shell.which("node").toString();
    }

    getHexoDir() {
        const appDir = this.wnService.getAppDir();
        return `${appDir}/HEXO`;
    }

    isHexoInstalled() {
        const hexoDir = this.getHexoDir();
        return this.wnService.isFile(`${hexoDir}/_config.yml`);
    }

    async init(): Promise<any> {
        const appDir = this.wnService.getAppDir();
        const hexoDir = this.getHexoDir();
        const postsDir = `${hexoDir}/source/_posts`;

        return new Promise(async (resolve, reject) => {
            try {
                if (this.isHexoInstalled()) {
                    resolve();
                    return;
                }
                if (!this.wnService.isDir(hexoDir)) {
                    shell.mkdir("-p", [hexoDir, postsDir]);
                }
                const hasHexoCommand = Boolean(shell.which("hexo"));
                if (!hasHexoCommand) {
                    resolve(new Error("No hexo command detected."));
                    return;
                }

                shell.rm("-rf", hexoDir);
                const installRes = shell.exec(`cd ${appDir}; hexo init HEXO;`);
                if (installRes.code === 0) {
                    await this.wnService.setAppConfig("hexo.dir", hexoDir);
                    resolve();
                } else {
                    resolve(new Error("Init hexo failed."));
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    async isLocalServerRunning() {
        const pid = await this.wnService.getAppConfigByKey("hexo.localServerPid");
        return pid !== 0;
    }

    async note2hexo(): Promise<any> {
        const hexoDir = this.getHexoDir();
        const postsDir = `${hexoDir}/source/_posts`;

        try {
            shell.rm("-rf", `${hexoDir}/source/_posts/*`);
        } catch (e) {
            return Promise.reject(e);
        }

        let error;
        const noteMetas = await this.nbService.fetchList();
        for (const meta of noteMetas) {
            const note = await this.nbService.fetchOne(meta.uuid);
            const mdStr = `---
title: '${note.title}'
date: ${note.createdAt}
tags: [${note.tags}]
---
${note.content}`;
            const mdFile = `${postsDir}/${note.uuid}.md`;
            try {
                await fs.outputFile(mdFile, mdStr);
            } catch (e) {
                error = e;
                break;
            }
        }
        if (error) {
            return Promise.reject(error);
        }
        return Promise.resolve();
    }

    async startHexoServer(listener): Promise<any> {
        const hexoDir = this.getHexoDir();
        return new Promise(async (resolve, reject) => {
            try {
                const child = this.electronService.childProcess.exec(
                    `cd ${hexoDir}; hexo server;`,
                    (error, stdout, stderr) => {
                        if (error) {
                            reject(new Error("Start hexo server failed."));
                            return;
                        }
                    }
                );
                await this.wnService.setAppConfig("hexo.localServerPid", child.pid);
                child.stdout.on("data", data => {
                    listener(data.toString());
                });
                resolve();
            } catch (e) {
                reject(new Error("Start hexo server failed."));
            }
        });
    }

    async stopHexoServer() {
        return new Promise(async (resolve, reject) => {
            const pid = await this.wnService.getAppConfigByKey("hexo.localServerPid");
            psTree(pid, async (err, children) => {
                if (err) {
                    reject(new Error(`Kill pid: ${pid} failed.`));
                    return;
                }
                this.electronService.childProcess.spawn("kill", ["-9"].concat(children.map(p => p.PID)));
                await this.wnService.setAppConfig("hexo.localServerPid", 0);
                resolve();
            });
        });
    }

    async getConfig() {
        const hexoDir = this.getHexoDir();
        return new Promise((resolve, reject) => {
            try {
                const doc = yaml.safeLoad(fs.readFileSync(`${hexoDir}/_config.yml`, "utf8"));
                resolve(doc);
            } catch (e) {
                reject(new Error("Read hexo config.yml failed."));
            }
        });
    }

    async getConfigByKey(key) {
        const config = await this.getConfig();
        return _.get(config, "key");
    }

    async saveConfig(config) {
        const hexoDir = this.getHexoDir();
        return new Promise(async (resolve, reject) => {
            try {
                const ymlStr = yaml.safeDump(config);
                await fs.outputFile(`${hexoDir}/_config.yml`, ymlStr);
                resolve();
            } catch (e) {
                reject(new Error("Update hexo config.yml failed."));
            }
        });
    }
}
