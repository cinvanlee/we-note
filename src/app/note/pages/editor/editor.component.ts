import { Component, OnInit } from "@angular/core";
import { INote } from "../../services/note/note.interface";

const mockNotes = [
    {
        uuid: "1",
        title: "Test Note Title 1",
        createdAt: 1572944936509,
        updatedAt: 1572944936509,
        active: true
    },
    {
        uuid: "2",
        title: "Test Note Title 2",
        createdAt: 1572944936509,
        updatedAt: 1572944936509
    },
    {
        uuid: "3",
        title: "Test Note TitleTitleTitleTitleTitleTitleTitleTitle 3",
        createdAt: 1572944936509,
        updatedAt: 1572944936509
    },
    {
        uuid: "4",
        title: "Test Note Title 4",
        createdAt: 1572944936509,
        updatedAt: 1572944936509
    },
    {
        uuid: "5",
        title: "Test Note Title 5",
        createdAt: 1572944936509,
        updatedAt: 1572944936509
    },
    {
        uuid: "5",
        title: "Test Note Title 5",
        createdAt: 1572944936509,
        updatedAt: 1572944936509
    },
    {
        uuid: "5",
        title: "Test Note Title 5",
        createdAt: 1572944936509,
        updatedAt: 1572944936509
    },
    {
        uuid: "5",
        title: "Test Note Title 5",
        createdAt: 1572944936509,
        updatedAt: 1572944936509
    },
];
@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"]
})
export class EditorComponent implements OnInit {
    notes: INote[];

    constructor() {
        this.notes = mockNotes;
    }

    ngOnInit() {}
}
