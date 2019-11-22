import { Injectable } from "@angular/core";
import { INote, INoteDetail } from "./note.interface";
const fs = window.require("fs");
const path = window.require("path");
const electron = window.require("electron");
const jf = window.require("jsonfile");
const uuid = window.require("uuid/v4");
const shell = window.require("shelljs");
const moment = window.require("moment");

@Injectable({
    providedIn: "root"
})
export class NoteService {
    constructor() {}

    private getNoteAppPath() {
        const appDir = electron.remote.app.getAppPath();
        return `${appDir}/USER_DATA/NOTE`;
    }

    private isDir(_path) {
        const exist = fs.existsSync(_path) || path.existsSync(_path);
        return exist && fs.statSync(_path).isDirectory();
    }

    public initNoteApp(): Promise<string> {
        const noteAppPath = this.getNoteAppPath();
        const bookPath = `${noteAppPath}/Book`;
        const inboxPath = `${noteAppPath}/Inbox`;
        const trashPath = `${noteAppPath}/Trash`;
        return new Promise((resolve, reject) => {
            if (this.isDir(noteAppPath)) {
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

    public fetchList(): Promise<INote[]> {
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
                        created_formatted: moment(meta.created_at).format(
                            "YYYY-MM-DD hh:mm:ss"
                        ),
                        updated_formatted: moment(meta.updated_at).format(
                            "YYYY-MM-DD hh:mm:ss"
                        )
                    };
                });
                resolve(notes);
            } catch (e) {
                reject(new Error("List all notes failed."));
            }
        });
    }

    public fetchOne(_uuid): Promise<INoteDetail> {
        const noteAppPath = this.getNoteAppPath();
        const metaPath = `${noteAppPath}/Book/${_uuid}/meta.json`;
        const contentPath = `${noteAppPath}/Book/${_uuid}/content.json`;
        return new Promise((resolve, reject) => {
            try {
                const metaInfo = jf.readFileSync(metaPath);
                const contentInfo = jf.readFileSync(contentPath);
                resolve({
                    ...metaInfo,
                    created_formatted: moment(metaInfo.created_at).format(
                        "YYYY-MM-DD hh:mm:ss"
                    ),
                    updated_formatted: moment(metaInfo.updated_at).format(
                        "YYYY-MM-DD hh:mm:ss"
                    ),
                    content: contentInfo.content
                });
            } catch (e) {
                reject(new Error(`Read note: ${_uuid} failed.`));
            }
        });
    }

    public createOne() {
        const noteAppPath = this.getNoteAppPath();
        const _uuid = uuid();
        const timestamp = +new Date();
        const meta = {
            created_at: timestamp,
            tags: [],
            title: "",
            updated_at: timestamp,
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
                resolve("OK");
            } catch (e) {
                reject(new Error("Write default note file failed."));
            }
        });
    }

    public updateOne(note) {
        const noteAppPath = this.getNoteAppPath();
        const timestamp = +new Date();
        const meta = {
            created_at: timestamp,
            tags: [],
            title: note.title,
            updated_at: timestamp,
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

    public deleteOne() {}
}
