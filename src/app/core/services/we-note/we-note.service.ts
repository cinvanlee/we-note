import { Injectable } from "@angular/core";
import _ from "lodash";
import * as pkg from "../../../../../package.json";

const fs = window.require("fs");
const electron = window.require("electron");
const jf = window.require("jsonfile");
const shell = window.require("shelljs");

@Injectable({
    providedIn: "root"
})
export class WeNoteService {
    constructor() {}

    isDir(_path) {
        return fs.existsSync(_path) && fs.statSync(_path).isDirectory();
    }

    public getAppDir() {
        const appDir = electron.remote.app.getPath("documents");
        return `${appDir}/WE_NOTE`;
    }

    public getAppLocale() {
        return electron.remote.app.getLocale();
    }

    public getAppConfigPath() {
        const appDir = this.getAppDir();
        return `${appDir}/config.json`;
    }

    public getAppConfig() {
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

    public getAppConfigByKey(key: string) {
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

    public async setAppConfig(key: string, value: any) {
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

    public async initAppConfig() {
        const appDir = this.getAppDir();
        if (this.isDir(appDir)) {
            const cfg = await this.getAppConfig();
            this.setTheme(cfg.theme);
            return Promise.resolve(cfg);
        }

        const timestamp = +new Date();
        const config = {
            name: pkg.name,
            version: pkg.version,
            theme: "default",
            language: this.getAppLocale(),
            created_at: timestamp,
            updated_at: timestamp,
            tabs: []
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

    public async setTheme(themeName) {
        const classList = document.body.classList;
        // @ts-ignore
        for (const name of classList) {
            classList.remove(name);
        }
        const themeCls = `theme-${themeName}`;
        document.body.classList.add(themeCls);
        await this.setAppConfig("theme", themeName);
    }
}
