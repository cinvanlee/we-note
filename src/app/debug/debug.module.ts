import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { DebugRoutingModule } from "./debug-routing.module";
import { LayoutComponent } from "./layout/layout.component";
import { RxjsOperatorComponent } from "./rxjs-operator/rxjs-operator.component";
import { TodoComponent } from "./todo/todo.component";
import { UserConfigComponent } from "./user-config/user-config.component";

@NgModule({
    declarations: [
        LayoutComponent,
        RxjsOperatorComponent,
        TodoComponent,
        UserConfigComponent
    ],
    imports: [CommonModule, SharedModule, DebugRoutingModule]
})
export class DebugModule {}
