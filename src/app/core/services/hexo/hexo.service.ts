import { Injectable } from "@angular/core";
import _ from "lodash";
import { NotebookService } from "../notebook/notebook.service";
import { WeNoteService } from "../we-note/we-note.service";

const fs = window.require("fs-extra");
const electron = window.require("electron");
const jf = window.require("jsonfile");
const shell = window.require("shelljs");
const child_process = window.require("child_process");
const yaml = window.require("js-yaml");

interface IResponse {
    success: boolean;
    message?: string;
    data?: any;
}

@Injectable({
    providedIn: "root"
})
export class HexoService {
    hexoServer: any;

    constructor(
        private wnService: WeNoteService,
        private nbService: NotebookService
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

    async startHexoServer(): Promise<any> {
        const hexoDir = this.getHexoDir();
        return new Promise(async (resolve, reject) => {
            try {
                child_process.exec(
                    `cd ${hexoDir}; hexo server;`,
                    (error, stdout, stderr) => {
                        if (error) {
                            reject(new Error("Start hexo server failed."));
                            return;
                        }
                    }
                );
                resolve();
            } catch (e) {
                reject(new Error("Start hexo server failed."));
            }
        });
    }

    async stopHexoServer() {
        // TODO: This solution is bad.
        return new Promise((resolve, reject) => {
            try {
                shell.exec(`kill -9 $(lsof -i tcp:4000 -t)`);
            } catch (e) {
                reject(new Error("Stop hexo server failed."));
            }
        });
    }

    async getConfig() {
        const hexoDir = this.getHexoDir();
        return new Promise((resolve, reject) => {
            try {
                const doc = yaml.safeLoad(
                    fs.readFileSync(`${hexoDir}/_config.yml`, "utf8")
                );
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
