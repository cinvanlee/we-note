import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing.module";
import { DefaultComponent } from "./layouts";
import {
    NotebookComponent,
    NotFoundComponent,
    PassworderComponent,
    SettingComponent,
    WebviewComponent,
    WelcomeComponent
} from "./pages";

@NgModule({
    declarations: [
        DefaultComponent,
        WelcomeComponent,
        NotFoundComponent,
        SettingComponent,
        WebviewComponent,
        NotebookComponent,
        PassworderComponent
    ],
    imports: [CommonModule, SharedModule, CoreRoutingModule]
})
export class CoreModule {}
