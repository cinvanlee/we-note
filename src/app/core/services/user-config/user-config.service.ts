import { Injectable } from "@angular/core";
import _ from "lodash";
const fs = window.require("fs");
const electron = window.require("electron");
const jf = window.require("jsonfile");

export interface IUserConfig {
    name: string;
    version: string;
    theme: string;
    language: string;
    createdAt: number;
    updateAt: number;
}

@Injectable({
    providedIn: "root"
})
export class UserConfigService {
    constructor() {}

    private static getUserDirPath() {
        const appDir = electron.remote.app.getAppPath();
        return `${appDir}/USER_DATA`;
    }

    public getConfigFilePath(): string {
        const userDirPath = UserConfigService.getUserDirPath();
        return `${userDirPath}/config.json`;
    }

    public async getConfigByKey(key) {
        const config = await this.read();
        return _.get(config, key);
    }

    public read(): Promise<IUserConfig> {
        const configPath = this.getConfigFilePath();
        return new Promise((resolve, reject) => {
            try {
                const config: IUserConfig = jf.readFileSync(configPath);
                resolve(config);
            } catch (e) {
                reject(new Error("Read USER_DATA/config.json failed."));
            }
        });
    }

    public async set(key: string, value: any): Promise<IUserConfig> {
        const configPath = this.getConfigFilePath();
        const config = await this.read();
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
                reject(new Error("Set USER_DATA/config.json failed."));
            }
        });
    }
}
