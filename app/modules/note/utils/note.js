import fs from "fs";
import path from "path";
import jsonfile from "jsonfile";
import electron from "electron";
import uuidv1 from "uuid/v1";
import shell from "shelljs";

class NoteUtils {
    appPath = electron.remote.app.getAppPath();

    fullPath(_path) {
        return path.join(this.appPath, _path);
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
            type: "text",
            content: ""
        };
        return new Promise((resolve, reject) => {
            const noteDir = this.fullPath(`output/Blog/${uuid}`);
            const resourceDir = this.fullPath(`output/Blog/${uuid}/resources`);
            const metaPath = this.fullPath(`output/Blog/${uuid}/meta.json`);
            const contentPath = this.fullPath(`output/Blog/${uuid}/content.json`);

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
        const noteDir = this.fullPath(`output/Blog`);
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

    getNoteById(uuid) {
        const contentPath = this.fullPath(`output/Blog/${uuid}/content.json`);
        return new Promise((resolve, reject) => {
            try {
                const content = jsonfile.readFileSync(contentPath);
                resolve(content);
            } catch (e) {
                reject(new Error(`Read ${contentPath} failed.`));
            }
        });
    }

    updateNoteById(uuid, content) {
        const contentPath = this.fullPath(`output/Blog/${uuid}/content.json`);
        const metaPath = this.fullPath(`output/Blog/${uuid}/meta.json`);
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
}

const self = new NoteUtils();
export default self;
