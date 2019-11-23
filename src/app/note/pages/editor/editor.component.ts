import { Component, OnDestroy, OnInit } from "@angular/core";
import "brace";
import "brace/mode/markdown";
import "brace/theme/github";
import _ from "lodash";
import { NzContextMenuService } from "ng-zorro-antd";
import { INote } from "../../services/note/note.interface";
import { NoteService } from "../../services/note/note.service";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.less"]
})
export class EditorComponent implements OnInit, OnDestroy {
    notes: INote[];
    editor: any;
    // note mode, edit | 'preview' | 'multiple'
    mode = "edit";
    tagName = "";
    note = {
        uuid: "",
        title: "",
        content: "",
        created_at: 0,
        updated_at: 0,
        tags: []
    };
    editorFocused = false;
    previewHTML = "";

    onTitleChange = _.debounce(value => {
        this.note.title = value;
        const { uuid } = this.note;
        this.notes = this.notes.map(note => {
            if (note.uuid === uuid) {
                note.title = value;
            }
            return note;
        });
        this.saveNote();
    }, 1000);

    constructor(
        private noteService: NoteService,
        private nzContextMenuService: NzContextMenuService
    ) {
        this.notes = [];
    }

    async ngOnInit() {
        await this.noteService.initNoteApp();
        await this.refreshNoteList();
        this.initAceEditor();
        window.addEventListener("paste", this.pasteListener.bind(this), false);
    }

    ngOnDestroy(): void {
        window.removeEventListener("paste", this.pasteListener);
    }

    initAceEditor() {
        // API DOC:
        // https://ace.c9.io/#nav=api&api=editor
        this.editor = ace.edit("ace-editor");
        this.editor.getSession().setMode("ace/mode/markdown");
        this.editor.getSession().setUseWrapMode(true);
        this.editor.setTheme("ace/theme/github");
        this.editor.setShowPrintMargin(false);
        this.editor.setOption("showLineNumbers", false);
        this.editor.on(
            "change",
            _.debounce(e => {
                this.note.content = this.editor.getValue();
                this.renderPreviewHtml();
                this.saveNote();
            }, 300)
        );
        this.editor.on("focus", () => {
            this.editorFocused = true;
        });
        this.editor.on("blur", () => {
            this.editorFocused = false;
        });
    }

    async pasteListener(evt) {
        if (!this.editorFocused) {
            return;
        }
        // @ts-ignore
        if (!evt.clipboardData) {
            return;
        }
        // @ts-ignore
        const items = evt.clipboardData.items;
        if (!items) {
            return;
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") === -1) {
                continue;
            }
            try {
                const blob = items[i].getAsFile();
                const imgUrl = await this.noteService.saveImage(
                    this.note.uuid,
                    blob
                );
                this.editor.insert(`\n![](${imgUrl})\n`);
            } catch (e) {
                break;
            }
        }
    }

    async refreshNoteList() {
        const notes = await this.noteService.fetchList();
        this.notes = notes.sort((a, b) => b.created_at - a.created_at);
    }

    async createNote() {
        const uuid = await this.noteService.createOne();
        await this.refreshNoteList();
        this.selectNote(uuid);
    }

    async deleteNote(uuid) {
        await this.noteService.moveToTrash(uuid);
        await this.refreshNoteList();

        // if delete current selected note,
        // select last note
        if (uuid === this.note.uuid) {
            const firstNote = this.notes[0];
            this.selectNote(firstNote.uuid);
        }
    }

    async selectNote(uuid) {
        const note = await this.noteService.fetchOne(uuid);
        this.notes = this.notes.map(item => {
            item.active = item.uuid === uuid;
            return item;
        });
        this.note = note;
        // moves cursor to the start
        this.editor.setValue(note.content, -1);
    }

    onNoteContextClick($event, menu) {
        this.nzContextMenuService.create($event, menu);
    }

    async saveNote() {
        await this.noteService.updateOne(this.note);
    }

    async createTag(evt) {
        const tagName = evt.target.value;
        if (this.note.tags.includes(tagName)) {
            return;
        }
        this.note.tags.push(tagName);
        await this.saveNote();
        this.tagName = "";
    }

    removeTag(tagName) {
        this.note.tags = this.note.tags.filter(tag => tag !== tagName);
        this.saveNote();
    }

    toggleMode(modeName) {
        this.mode = modeName;
        this.renderPreviewHtml();
    }

    renderPreviewHtml() {
        if (this.mode !== "edit") {
            const { uuid, content } = this.note;
            this.previewHTML = this.noteService.md2html(uuid, content);
        }
    }

    showInFinder(uuid) {
        this.noteService.showInFinder(uuid);
    }
}
