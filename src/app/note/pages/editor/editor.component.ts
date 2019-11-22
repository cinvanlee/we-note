import { Component, OnInit } from "@angular/core";
import "brace";
import "brace/mode/markdown";
import "brace/theme/github";
import _ from "lodash";
import { INote } from "../../services/note/note.interface";
import { NoteService } from "../../services/note/note.service";
import { NzContextMenuService } from "ng-zorro-antd";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.less"]
})
export class EditorComponent implements OnInit {
    notes: INote[];
    editor: any;
    mode = "edit";
    note = {
        uuid: "",
        title: "",
        content: "",
        created_at: 0,
        updated_at: 0,
        tags: []
    };

    constructor(
        private noteService: NoteService,
        private nzContextMenuService: NzContextMenuService
    ) {
        this.notes = [];
    }

    handleTitleChange = _.debounce(value => {
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

    ngOnInit() {
        this.noteService.initNoteApp();
        this.refreshNoteList();
        this.initAceEditor();
    }

    private initAceEditor() {
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
                const value = this.editor.getValue();
                this.note.content = value;
                this.saveNote();
            }, 1000)
        );
    }

    private async refreshNoteList() {
        const notes = await this.noteService.fetchList();
        this.notes = notes.sort((a, b) => b.created_at - a.created_at);
    }

    private async handleAddClick() {
        await this.noteService.createOne();
        await this.refreshNoteList();
    }

    private async handleNoteClick(uuid) {
        const note = await this.noteService.fetchOne(uuid);
        this.notes = this.notes.map(item => {
            item.active = item.uuid === uuid;
            return item;
        });
        this.note = note;
        this.editor.setValue(note.content);
    }

    private async saveNote() {
        await this.noteService.updateOne(this.note);
    }

    private handleCreateTag(evt) {
        const tagName = evt.target.value;
        if (this.note.tags.includes(tagName)) {
            return;
        }
        this.note.tags.push(tagName);
        this.saveNote();
    }

    handleNoteContextClick($event, menu): void {
        this.nzContextMenuService.create($event, menu);
    }
}
