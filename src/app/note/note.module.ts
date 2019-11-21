import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { NoteRoutingModule } from "./note-routing.module";
import { EditorComponent } from "./pages";

@NgModule({
    declarations: [EditorComponent],
    imports: [CommonModule, NoteRoutingModule, SharedModule]
})
export class NoteModule {}
