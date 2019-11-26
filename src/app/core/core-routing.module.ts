import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DefaultComponent } from "./layouts";
import { NotebookComponent, PassworderComponent, SettingComponent, WebviewComponent, WelcomeComponent } from "./pages";

const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            { path: "", component: WelcomeComponent },
            { path: "setting", component: SettingComponent },
            { path: "notebook", component: NotebookComponent },
            { path: "webview", component: WebviewComponent },
            { path: "passworder", component: PassworderComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {}
