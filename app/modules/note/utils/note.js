import fs from "fs";
import path from "path";
import jsonfile from "jsonfile";
import electron from "electron";
import uuidv1 from "uuid/v1";
import shell from "shelljs";
import appUtil from "@/helper/app";

class NoteUtils {
    appPath = electron.remote.app.getAppPath();

    getNotePath(_path) {
        return path.join(appUtil.getAppDir(), 'NOTE', _path);
    }

    exists(_path) {
        return fs.existsSync(_path) || path.existsSync(_path);
    }

    isDir(_path) {
        return this.exists(_path) && fs.statSync(_path).isDirectory();
    }

    create() {
        const uuid = uuidv1();
        const timestamp = +new Date();
        const defaultTitle = "Untitled Note";
        const defaultMeta = {
            created_at: timestamp,
            updated_at: timestamp,
            title: defaultTitle,
            uuid
        };
        const defaultContent = {
            title: defaultTitle,
            type: "markdown",
            content: ""
        };
        return new Promise((resolve, reject) => {
            const noteDir = this.getNotePath(`Inbox/${uuid}`);
            const resourceDir = this.getNotePath(`Inbox/${uuid}/resources`);
            const metaPath = this.getNotePath(`Inbox/${uuid}/meta.json`);
            const contentPath = this.getNotePath(`Inbox/${uuid}/content.json`);

            const mkdirRes = shell.mkdir("-p", [noteDir, resourceDir]);
            if (mkdirRes.code !== 0) {
                reject(new Error("Initial note folder failed."));
                return;
            }

            try {
                jsonfile.writeFileSync(metaPath, defaultMeta, { spaces: 2 });
                jsonfile.writeFileSync(contentPath, defaultContent, { spaces: 2 });
                resolve(defaultMeta);
            } catch (e) {
                shell.rm("-rf", noteDir);
                reject(new Error("Initial note files failed."));
            }
        });
    }

    listAll() {
        const noteDir = this.getNotePath(`Inbox`);
        return new Promise((resolve, reject) => {
            const lsRes = shell.ls("-d", `${noteDir}/*`);
            if (lsRes.code !== 0) {
                reject(new Error("List all notes failed."));
                return;
            }
            let notes = lsRes.filter(notePath => this.isDir(notePath));
            notes = notes.map(note => {
                return jsonfile.readFileSync(`${note}/meta.json`);
            });
            resolve(notes);
        });
    }

    getNoteByUuid(uuid) {
        const contentPath = this.getNotePath(`Inbox/${uuid}/content.json`);
        return new Promise((resolve, reject) => {
            try {
                const content = jsonfile.readFileSync(contentPath);
                resolve(content);
            } catch (e) {
                reject(new Error(`Read ${contentPath} failed.`));
            }
        });
    }

    updateNoteByUuid(uuid, content) {
        const contentPath = this.getNotePath(`Inbox/${uuid}/content.json`);
        const metaPath = this.getNotePath(`Inbox/${uuid}/meta.json`);
        return new Promise((resolve, reject) => {
            try {
                const meta = jsonfile.readFileSync(metaPath);
                meta.title = content.title;
                meta.updated_at = +new Date();
                jsonfile.writeFileSync(metaPath, meta, { spaces: 2 });
                jsonfile.writeFileSync(contentPath, content, { spaces: 2 });
                resolve(meta);
            } catch (e) {
                reject(new Error(`Update ${contentPath} failed.`));
            }
        });
    }

    showInFinder(uuid) {
        const noteDir = this.getNotePath(`Inbox/${uuid}`);
        electron.shell.showItemInFolder(noteDir);
    }

    deleteNoteByUuid(uuid) {
        const noteDir = this.getNotePath(`Inbox/${uuid}`);
        return new Promise((resolve, reject) => {
            const res = shell.rm("-rf", noteDir);
            if (res.code !== 0) {
                reject(new Error(`Delete ${noteDir} failed`));
                return;
            }
            resolve(noteDir);
        });
    }

    deployToHexo() {
        // 1. 读取 Inbox 下所有的笔记
        // 2. 解析笔记, 输出为 hexo 格式的 md 文件到 _posts 目录下
        // 3. 移动 _posts 到 hexo 路径下
        // 4. 执行 after script 里的部署任务
        // 5. 抓取执行结果
    }
}

const self = new NoteUtils();
export default self;
