import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "./core/layouts";
import { NotFoundComponent } from "./core/pages";

const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            { path: "", loadChildren: "./core/core.module#CoreModule" },
            {
                path: "preference",
                loadChildren: "./preference/preference.module#PreferenceModule"
            },
            {
                path: "nav-hub",
                loadChildren: "./nav-hub/nav-hub.module#NavHubModule"
            }
        ]
    },
    { path: "**", component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
