import { Injectable } from "@angular/core";
import { ElectronService } from "../electron/electron.service";
import { WeNoteService } from "../we-note/we-note.service";
import { INote, INoteDetail } from "./notebook.interface";

const fs = window.require("fs-extra");
const jf = window.require("jsonfile");
const uuid = window.require("uuid/v4");
const shell = window.require("shelljs");
const moment = window.require("moment");
const MarkdownIt = window.require("markdown-it");

@Injectable({
    providedIn: "root"
})
export class NotebookService {
    md = new MarkdownIt({
        html: true,
        xhtmlOut: false,
        breaks: true,
        linkify: true,
        typographer: true,
        quotes: "“”‘’"
    });

    constructor(private wnService: WeNoteService, private electronService: ElectronService) {
        this.md.validateLink = () => true;
    }

    private getNoteAppPath() {
        const appDir = this.wnService.getAppDir();
        return `${appDir}/NOTEBOOK`;
    }

    private isDir(_path) {
        return fs.existsSync(_path) && fs.statSync(_path).isDirectory();
    }

    initNotebook(): Promise<string> {
        const noteAppPath = this.getNoteAppPath();
        const bookPath = `${noteAppPath}/Book`;
        const inboxPath = `${noteAppPath}/Inbox`;
        const trashPath = `${noteAppPath}/Trash`;
        return new Promise((resolve, reject) => {
            if (fs.existsSync(noteAppPath)) {
                resolve("OK");
                return;
            }
            try {
                shell.mkdir("-p", [bookPath, inboxPath, trashPath]);
            } catch (e) {
                reject(new Error("Init app dir failed"));
                return;
            }
            try {
                const bookMeta = {
                    name: "We Note",
                    uuid: uuid()
                };
                jf.writeFileSync(`${bookPath}/meta.json`, bookMeta);

                const inboxMeta = {
                    name: "Inbox",
                    uuid: "Inbox"
                };
                jf.writeFileSync(`${inboxPath}/meta.json`, inboxMeta);

                const trashMeta = {
                    name: "Inbox",
                    uuid: "Inbox"
                };
                jf.writeFileSync(`${trashPath}/meta.json`, trashMeta);
                resolve("OK");
            } catch (e) {
                reject(new Error("Init note app failed."));
            }
        });
    }

    fetchList(): Promise<INote[]> {
        const noteAppPath = this.getNoteAppPath();
        const bookPath = `${noteAppPath}/Book`;
        return new Promise((resolve, reject) => {
            try {
                const lsRes = shell.ls("-d", `${bookPath}/*`);
                if (lsRes.code !== 0) {
                    reject(new Error("List all notes failed."));
                    return;
                }
                let notes = lsRes.filter(notePath => this.isDir(notePath));
                notes = notes.map(note => {
                    const meta = jf.readFileSync(`${note}/meta.json`);
                    return {
                        ...meta,
                        title: meta.title || "Untitled Note",
                        created_formatted: moment(meta.createdAt).format("YYYY-MM-DD hh:mm:ss"),
                        updated_formatted: moment(meta.updatedAt).format("YYYY-MM-DD hh:mm:ss")
                    };
                });
                resolve(notes);
            } catch (e) {
                reject(new Error("List all notes failed."));
            }
        });
    }

    fetchOne(_uuid): Promise<INoteDetail> {
        const noteAppPath = this.getNoteAppPath();
        const metaPath = `${noteAppPath}/Book/${_uuid}/meta.json`;
        const contentPath = `${noteAppPath}/Book/${_uuid}/content.json`;
        return new Promise((resolve, reject) => {
            try {
                const metaInfo = jf.readFileSync(metaPath);
                const contentInfo = jf.readFileSync(contentPath);
                resolve({
                    ...metaInfo,
                    created_formatted: moment(metaInfo.createdAt).format("YYYY-MM-DD hh:mm:ss"),
                    updated_formatted: moment(metaInfo.updatedAt).format("YYYY-MM-DD hh:mm:ss"),
                    content: contentInfo.content
                });
            } catch (e) {
                reject(new Error(`Read note: ${_uuid} failed.`));
            }
        });
    }

    createOne(): Promise<string> {
        const noteAppPath = this.getNoteAppPath();
        const _uuid = uuid();
        const timestamp = +new Date();
        const meta = {
            createdAt: timestamp,
            tags: [],
            title: "",
            updatedAt: timestamp,
            uuid: _uuid
        };
        const content = {
            title: "",
            content: ""
        };
        const bookPath = `${noteAppPath}/Book`;
        const resourcesPath = `${bookPath}/${_uuid}/resources`;
        const metaPath = `${bookPath}/${_uuid}/meta.json`;
        const contentPath = `${bookPath}/${_uuid}/content.json`;
        return new Promise((resolve, reject) => {
            try {
                shell.mkdir("-p", [resourcesPath]);
            } catch (e) {
                reject(new Error("Init note dir failed."));
            }
            try {
                jf.writeFileSync(metaPath, meta);
                jf.writeFileSync(contentPath, content);
                resolve(_uuid);
            } catch (e) {
                reject(new Error("Write default note file failed."));
            }
        });
    }

    updateOne(note) {
        const noteAppPath = this.getNoteAppPath();
        const timestamp = +new Date();
        const meta = {
            createdAt: timestamp,
            tags: note.tags,
            title: note.title,
            updatedAt: timestamp,
            uuid: note.uuid
        };
        const content = {
            title: note.title,
            content: note.content
        };
        const bookPath = `${noteAppPath}/Book`;
        const metaPath = `${bookPath}/${note.uuid}/meta.json`;
        const contentPath = `${bookPath}/${note.uuid}/content.json`;
        return new Promise((resolve, reject) => {
            try {
                jf.writeFileSync(metaPath, meta);
                jf.writeFileSync(contentPath, content);
                resolve("OK");
            } catch (e) {
                reject(new Error("Update note file failed."));
            }
        });
    }

    moveToTrash(_uuid) {
        const noteAppPath = this.getNoteAppPath();
        const notePath = `${noteAppPath}/Book/${_uuid}`;
        const trashPath = `${noteAppPath}/Trash/${_uuid}`;
        return new Promise((resolve, reject) => {
            try {
                shell.mv(notePath, trashPath);
                resolve("OK");
            } catch (e) {
                reject(new Error("Delete note failed."));
            }
        });
    }

    clearTrash() {
        const noteAppPath = this.getNoteAppPath();
        const metaPath = `${noteAppPath}/Trash/meta.json`;
        return new Promise((resolve, reject) => {
            try {
                shell.rm("-rf", `${noteAppPath}/Trash/*`);
                const meta = {
                    title: "Trash",
                    uuid: "Trash"
                };
                jf.writeFileSync(metaPath, meta);
                resolve("OK");
            } catch (e) {
                reject(new Error("Clear Trash failed."));
            }
        });
    }

    md2html(_uuid, mdText) {
        // replace `./resources` to `BOOK/note_uuid/resources`
        const noteAppPath = this.getNoteAppPath();
        const resourcePath = `file://${noteAppPath}/Book/${_uuid}/resources`;
        mdText = mdText.replace(new RegExp("./resources", "g"), resourcePath);
        return this.md.render(mdText);
    }

    showInFinder(_uuid) {
        const noteAppPath = this.getNoteAppPath();
        const notePath = `${noteAppPath}/Book/${_uuid}`;
        this.electronService.shell.openItem(notePath);
    }

    saveImage(_uuid, imgBlob) {
        const noteAppPath = this.getNoteAppPath();
        const imgUuid = uuid();
        const imgPath = `${noteAppPath}/Book/${_uuid}/resources/${imgUuid}.jpg`;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imgBlob);
            reader.onload = event => {
                // @ts-ignore
                const base64 = event.target.result;
                const file = base64.replace(/^data:image\/\w+;base64,/, "");
                fs.writeFile(imgPath, file, { encoding: "base64" }, err => {
                    if (err) {
                        reject(`Save ${imgPath} failed.`);
                    }
                    resolve(`./resources/${imgUuid}.jpg`);
                });
            };
        });
    }
}
