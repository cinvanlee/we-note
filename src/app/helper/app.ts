import * as _ from 'lodash';
import * as pkg from '../../../package.json';
const remote = window.require('electron').remote;
const shell = window.require('shelljs');
const jf = window.require('jsonfile');

const DefaultConfig = [

];

class AppUtil {
    getAppPath() {
        return remote.app.getAppPath();
    }

    getAppDir() {
        const appPath = appUtil.getAppPath();
        return `${appPath}/USER_DATA`;
    }

    getAppLocale() {
        return remote.app.getLocale();
    }

    getAppConfig(key) {
        const appDir = appUtil.getAppDir();
        const configPath = `${appDir}/config.json`;
        return new Promise((resolve, reject) => {
            try {
                const config = jf.readFileSync(configPath);
                if (key) {
                    resolve(_.get(config, key));
                }
                resolve(config);
            } catch (e) {
                reject(new Error('Get app config failed.'));
            }
        });
    }

    initAppDir() {
        const appDir = appUtil.getAppDir();
        const config = {
            name: pkg.name,
            version: pkg.version,
            theme: 'default',
            language: appUtil.getAppLocale(),
            firstRun: true,
            createdAt: +new Date(),
            updateAt: +new Date(),
            hexo: {
                enable: true,
                path: 'TEST_HEXO_PATH'
            },
            sideMenuList: [
                {
                    'name': '笔记本',
                    'url': '/note',
                    'icon': 'book'
                }
            ],
            tabBarList: []
        };
        return new Promise((resolve, reject) => {
            const res = shell.mkdir('-p', [
                `${appDir}/NOTE`,
                `${appDir}/NOTE/Inbox`,
                `${appDir}/NOTE/Trash`
            ]);
            if (res.code !== 0) {
                reject(new Error('Init app dir failed.'));
            }
            try {
                jf.writeFileSync(`${appDir}/config.json`, config);
                resolve(config);
            } catch (e) {
                reject(new Error('Init app config failed'));
            }
        });
    }
}

export const appUtil = new AppUtil();
