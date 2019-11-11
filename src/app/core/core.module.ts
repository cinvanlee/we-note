import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing.module";
import { DefaultComponent } from "./layouts";
import { NotFoundComponent, WelcomeComponent } from "./pages";
import { SettingComponent } from "./pages/setting/setting.component";

@NgModule({
    declarations: [
        DefaultComponent,
        WelcomeComponent,
        NotFoundComponent,
        SettingComponent
    ],
    imports: [CommonModule, SharedModule, CoreRoutingModule]
})
export class CoreModule {}
