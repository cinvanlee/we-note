import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing.module";
import { DefaultComponent } from "./layouts";
import { NotFoundComponent, WelcomeComponent } from "./pages";
import { NotebookComponent } from './pages/notebook/notebook.component';
import { SettingComponent } from "./pages/setting/setting.component";
import { WebviewComponent } from './pages/webview/webview.component';

@NgModule({
    declarations: [
        DefaultComponent,
        WelcomeComponent,
        NotFoundComponent,
        SettingComponent,
        WebviewComponent,
        NotebookComponent
    ],
    imports: [CommonModule, SharedModule, CoreRoutingModule]
})
export class CoreModule {}
