import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
    editor = null;

    constructor() {
    }

    ngOnInit() {
        this.editor = ace.edit('ace-editor');
        this.editor.setTheme('ace/theme/github');
        this.editor.session.setMode('ace/mode/markdown');
    }

}
