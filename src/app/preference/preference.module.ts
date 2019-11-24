import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { BehaviorComponent } from "./behavior/behavior.component";
import { DeployComponent } from "./deploy/deploy.component";
import { LayoutComponent } from "./layout/layout.component";
import { PreferenceRoutingModule } from "./preference-routing.module";
import { SystemComponent } from "./system/system.component";

@NgModule({
    declarations: [
        LayoutComponent,
        DeployComponent,
        BehaviorComponent,
        SystemComponent
    ],
    imports: [CommonModule, PreferenceRoutingModule, SharedModule]
})
export class PreferenceModule {}
