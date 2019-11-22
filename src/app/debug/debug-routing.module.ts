import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { RxjsOperatorComponent } from "./rxjs-operator/rxjs-operator.component";
import { TodoComponent } from "./todo/todo.component";
import { UserConfigComponent } from "./user-config/user-config.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            { path: "rxjs-operator", component: RxjsOperatorComponent },
            { path: "todo", component: TodoComponent },
            { path: "user-config", component: UserConfigComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DebugRoutingModule {}
