import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { WebviewDirective } from "./directives/";

@NgModule({
    declarations: [WebviewDirective],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        NgZorroAntdModule
    ],
    exports: [
        TranslateModule,
        WebviewDirective,
        FormsModule,
        NgZorroAntdModule
    ]
})
export class SharedModule {}
