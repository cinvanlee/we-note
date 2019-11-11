import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NoteRoutingModule } from "./note-routing.module";
import { EditorComponent } from "./pages";

@NgModule({
    declarations: [EditorComponent],
    imports: [CommonModule, NoteRoutingModule]
})
export class NoteModule {}
