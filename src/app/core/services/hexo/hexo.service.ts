import { Injectable } from "@angular/core";
import { NotebookService } from "../notebook/notebook.service";
import { WeNoteService } from "../we-note/we-note.service";

const fs = window.require("fs-extra");
const electron = window.require("electron");
const jf = window.require("jsonfile");
const shell = window.require("shelljs");

interface IResponse {
    success: boolean;
    message?: string;
    data?: any;
}

@Injectable({
    providedIn: "root"
})
export class HexoService {
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
        return this.wnService.isFile(`${hexoDir}/package.json`);
    }

    async init(): Promise<IResponse> {
        const appDir = this.wnService.getAppDir();
        const hexoDir = this.getHexoDir();
        const postsDir = `${hexoDir}/_posts`;

        return new Promise(async (resolve, reject) => {
            try {
                if (this.isHexoInstalled()) {
                    resolve({
                        success: true,
                        message: "ERROR",
                        data: "Hexo is already installed."
                    });
                    return;
                }
                if (!this.wnService.isDir(hexoDir)) {
                    shell.mkdir("-p", [hexoDir, postsDir]);
                }
                const hasHexoCommand = Boolean(shell.which("hexo"));
                if (!hasHexoCommand) {
                    reject({
                        success: false,
                        message: "ERROR",
                        data: "No hexo command detected."
                    });
                    return;
                }

                shell.rm("-rf", hexoDir);
                const installRes = shell.exec(`cd ${appDir}; hexo init HEXO;`);
                if (installRes.code === 0) {
                    await this.wnService.setAppConfig("hexo.dir", hexoDir);
                    resolve({
                        success: true,
                        message: "SUCCESS",
                        data: "Hexo installed."
                    });
                } else {
                    reject({
                        success: false,
                        message: "ERROR",
                        data: "Init hexo failed."
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    async note2hexo(): Promise<any> {
        const hexoDir = this.getHexoDir();
        const postsDir = `${hexoDir}/_posts`;

        try {
            shell.rm("-rf", `${hexoDir}/_posts/*`);
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
        return Promise.resolve("OK");
    }

    async startHexoServer(): Promise<any> {
        const hexoDir = this.getHexoDir();
        return new Promise(async (resolve, reject) => {
            try {
                shell.exec(`cd ${hexoDir}; hexo server;`);
                resolve({
                    success: true,
                    message: "SUCCESS",
                    data: "Hexo server started."
                });
            } catch (e) {
                reject({
                    success: false,
                    message: "ERROR",
                    data: "Start hexo server failed."
                });
            }
        });
    }
}
