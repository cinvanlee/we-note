import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DialogComponent } from "./dialog/dialog.component";
import { IconComponent } from "./icon/icon.component";
import { LayoutComponent } from "./layout/layout.component";
import { MaterialComponent } from "./material/material.component";
import { RxjsOperatorComponent } from "./rxjs-operator/rxjs-operator.component";
import { TodoComponent } from "./todo/todo.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            { path: "icon", component: IconComponent },
            { path: "material", component: MaterialComponent },
            { path: "dialog", component: DialogComponent },
            { path: "rxjs-operator", component: RxjsOperatorComponent },
            { path: "todo", component: TodoComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DebugRoutingModule {}
