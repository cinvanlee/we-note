import electron from "electron";
import shell from "shelljs";
import jf from "jsonfile";
import _ from "lodash";
import pkg from "../../package";

class AppUtil {
    getAppPath() {
        return electron.remote.app.getAppPath();
    }

    getAppDir() {
        const appPath = self.getAppPath();
        return `${appPath}/USER_DATA`;
    }

    getAppLocale() {
        return electron.remote.app.getLocale();
    }

    quit() {
        electron.remote.app.quit();
    }

    initAppDir() {
        const appDir = self.getAppDir();
        const config = {
            name: pkg.name,
            version: pkg.version,
            theme: "default",
            language: self.getAppLocale(),
            firstRun: true,
            createdAt: +new Date(),
            updateAt: +new Date(),
            hexo: {
                enable: true,
                path: "TEST_HEXO_PATH"
            }
        };
        return new Promise((resolve, reject) => {
            const res = shell.mkdir("-p", [
                `${appDir}/NOTE`,
                `${appDir}/NOTE/Inbox`,
                `${appDir}/NOTE/Trash`
            ]);
            if (res.code !== 0) {
                reject(new Error("Init app dir failed."));
            }
            try {
                jf.writeFileSync(`${appDir}/config.json`, config);
                resolve(config);
            } catch (e) {
                reject(new Error("Init app config failed"));
            }
        });
    }

    getAppConfig(key) {
        const appDir = self.getAppDir();
        const configPath = `${appDir}/config.json`;
        return new Promise((resolve, reject) => {
            try {
                const config = jf.readFileSync(configPath);
                if (key) {
                    resolve(_.get(config, key));
                }
                resolve(config);
            } catch (e) {
                reject(new Error("Get app config failed."));
            }
        });
    }

    setAppConfig(key, value) {
        const appDir = self.getAppDir();
        const configPath = `${appDir}/config.json`;
        return new Promise((resolve, reject) => {
            self.getAppConfig()
                .then(config => {
                    try {
                        _.set(config, key, value);
                        jf.writeFileSync(configPath, config);
                        console.log(config);
                        resolve(config);
                    } catch (e) {
                        reject("Set app config failed.");
                    }
                })
                .catch(err => {
                    reject("Set app config failed.");
                });
        });
    }
}

const self = new AppUtil();
export default self;
