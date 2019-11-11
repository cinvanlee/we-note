import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DefaultComponent } from "./layouts";
import { WelcomeComponent } from "./pages";
import { SettingComponent } from "./pages/setting/setting.component";

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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {}
