import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditorComponent } from "./pages";

const routes: Routes = [{ path: "editor", component: EditorComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoteRoutingModule {}
