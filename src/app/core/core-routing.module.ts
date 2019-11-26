import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DefaultComponent } from "./layouts";
import { WelcomeComponent } from "./pages";
import { NotebookComponent } from "./pages/notebook/notebook.component";
import { SettingComponent } from "./pages/setting/setting.component";
import { WebviewComponent } from "./pages/webview/webview.component";

const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            {
                path: "",
                component: WelcomeComponent
            },
            {
                path: "setting",
                component: SettingComponent
            },
            {
                path: "notebook",
                component: NotebookComponent
            },
            {
                path: "webview",
                component: WebviewComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {}
