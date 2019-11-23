import { Component, OnInit } from "@angular/core";
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
export class EditorComponent implements OnInit {
    notes: INote[];
    editor: any;
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
    previewHTML = "";

    constructor(
        private noteService: NoteService,
        private nzContextMenuService: NzContextMenuService
    ) {
        this.notes = [];
    }

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

    async ngOnInit() {
        await this.noteService.initNoteApp();
        await this.refreshNoteList();
        this.initAceEditor();
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
                this.note.content = this.editor.getValue();;
                this.renderPreviewHtml();
                this.saveNote();
            }, 300)
        );
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
        this.editor.setValue(note.content);
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
        if (this.mode !== 'edit') {
            this.previewHTML = this.noteService.md2html(this.note.content);
        }
    }

    showInFinder(uuid) {
        this.noteService.showInFinder(uuid);
    }
}
