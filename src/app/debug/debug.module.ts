import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { DebugRoutingModule } from "./debug-routing.module";
import { DialogComponent } from "./dialog/dialog.component";
import { WelcomeDialogComponent } from "./dialog/welcome-dialog/welcome-dialog.component";
import { IconComponent } from "./icon/icon.component";
import { LayoutComponent } from "./layout/layout.component";
import { MaterialComponent } from "./material/material.component";
import { RxjsOperatorComponent } from "./rxjs-operator/rxjs-operator.component";
import { TodoComponent } from "./todo/todo.component";

const COMPONENTS_DYNAMIC = [WelcomeDialogComponent];

@NgModule({
    declarations: [
        ...COMPONENTS_DYNAMIC,
        MaterialComponent,
        LayoutComponent,
        IconComponent,
        DialogComponent,
        RxjsOperatorComponent,
        TodoComponent
    ],
    imports: [CommonModule, SharedModule, DebugRoutingModule],
    entryComponents: [...COMPONENTS_DYNAMIC]
})
export class DebugModule {}
