import { Injectable } from "@angular/core";
import _ from "lodash";
import * as pkg from "../../../../../package.json";
import { IConfig } from "./we-note.interface";

const fs = window.require("fs-extra");
const electron = window.require("electron");
const jf = window.require("jsonfile");
const shell = window.require("shelljs");

@Injectable({
    providedIn: "root"
})
export class WeNoteService {
    constructor() {}

    isFile(_path) {
        try {
            const stat = fs.lstatSync(_path);
            return stat.isFile();
        } catch (e) {
            return false;
        }
    }

    isDir(_path) {
        try {
            const stat = fs.lstatSync(_path);
            return stat.isDirectory();
        } catch (e) {
            return false;
        }
    }

    getAppDir() {
        const appDir = electron.remote.app.getPath("documents");
        return `${appDir}/WE_NOTE`;
    }

    async setAppDir(appDir) {
        if (!this.isDir(appDir)) {
            return Promise.reject(`The directory: ${appDir} is not available!`);
        }
        await this.setAppConfig("appDir", appDir);
    }

    getAppLocale() {
        return electron.remote.app.getLocale();
    }

    getAppConfigPath() {
        const appDir = this.getAppDir();
        return `${appDir}/config.json`;
    }

    getAppConfig(): Promise<IConfig> {
        const configPath = this.getAppConfigPath();
        return new Promise((resolve, reject) => {
            try {
                const config = jf.readFileSync(configPath);
                resolve(config);
            } catch (e) {
                reject(new Error("Read WE_NOTE/config.json failed."));
            }
        });
    }

    getAppConfigByKey(key: string): Promise<any> {
        const configPath = this.getAppConfigPath();
        return new Promise((resolve, reject) => {
            try {
                const config = jf.readFileSync(configPath);
                resolve(_.get(config, key));
            } catch (e) {
                reject(new Error("Get app config failed."));
            }
        });
    }

    async setAppConfig(key: string, value: any): Promise<IConfig> {
        const configPath = this.getAppConfigPath();
        const config = await this.getAppConfig();
        return new Promise((resolve, reject) => {
            _.set(config, key, value);

            try {
                JSON.stringify(config);
            } catch (e) {
                reject(new Error("New Config is invalid."));
            }

            try {
                jf.writeFileSync(configPath, config);
                resolve(config);
            } catch (e) {
                reject(new Error("Set WE_NOTE/config.json failed."));
            }
        });
    }

    async initAppConfig() {
        const appDir = this.getAppDir();
        if (this.isDir(appDir)) {
            const cfg = await this.getAppConfig();
            this.setTheme(cfg["theme"]);
            this.setFont(cfg["font"]);
            this.setFontSize(cfg.fontSize);
            return Promise.resolve(cfg);
        }

        const timestamp = +new Date();
        const config: IConfig = {
            name: pkg.name,
            version: pkg.version,
            appDir,
            theme: "light",
            font: "Helvetica",
            fontSize: "14",
            language: this.getAppLocale(),
            createdAt: timestamp,
            updatedAt: timestamp,
            tabs: [],
            blogEngine: "hexo",
            hexo: {
                enable: false,
                dir: "",
                localServerPid: 0
            },
            useDefaultBrowser: false
        };
        return new Promise((resolve, reject) => {
            try {
                shell.mkdir("-p", [appDir]);
                jf.writeFileSync(`${appDir}/config.json`, config);
                resolve(config);
            } catch (e) {
                reject(new Error("Init app config failed"));
            }
        });
    }

    async setTheme(themeName) {
        const classList = document.body.classList;
        // @ts-ignore
        for (const name of classList) {
            classList.remove(name);
        }
        const themeCls = `theme-${themeName}`;
        document.body.classList.add(themeCls);
        await this.setAppConfig("theme", themeName);
    }

    async setLanguage(language) {
        await this.setAppConfig("language", language);
    }

    getAvailableFonts() {
        return [
            { label: "Helvetica", value: "Helvetica" },
            { label: "Arial", value: "Arial" },
            { label: "Lucida Family", value: "Lucida Family" },
            { label: "Verdana", value: "Verdana" },
            { label: "Tahoma", value: "Tahoma" },
            { label: "Trebuchet MS", value: "Trebuchet MS" },
            { label: "Georgia", value: "Georgia" },
            { label: "Times", value: "Times" },
            { label: "微软雅黑", value: "微软雅黑" },
            { label: "华文细黑", value: "华文细黑" }
        ];
    }

    async setFont(font) {
        document.body.style.fontFamily = font;
        await this.setAppConfig("font", font);
    }

    async setFontSize(fontSize) {
        document.body.style.fontSize = `${fontSize}px`;
        await this.setAppConfig("fontSize", fontSize);
    }

    openInFinder(path) {
        electron.shell.openItem(path);
    }

    writeFile(filePath, fileContent) {
        // if not exist, create it
        if (!this.isFile(filePath)) {
        }
    }
}
