import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DialogComponent } from "./dialog/dialog.component";
import { IconComponent } from "./icon/icon.component";
import { LayoutComponent } from "./layout/layout.component";
import { MaterialComponent } from "./material/material.component";
import { SubscribeServiceDataComponent } from "./subscribe-service-data/subscribe-service-data.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            { path: "icon", component: IconComponent },
            { path: "material", component: MaterialComponent },
            { path: "dialog", component: DialogComponent },
            {
                path: "subscribe-service-data",
                component: SubscribeServiceDataComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DebugRoutingModule {}
