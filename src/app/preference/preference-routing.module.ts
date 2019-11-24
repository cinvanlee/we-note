import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BehaviorComponent } from "./behavior/behavior.component";
import { DeployComponent } from "./deploy/deploy.component";
import { LayoutComponent } from "./layout/layout.component";
import { SystemComponent } from "./system/system.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            { path: "behavior", component: BehaviorComponent },
            { path: "deploy", component: DeployComponent },
            { path: "system", component: SystemComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreferenceRoutingModule {}
