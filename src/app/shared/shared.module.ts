import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";
import { WebviewDirective } from "./directives/";
import { MaterialModules } from "./material.module";

@NgModule({
    declarations: [WebviewDirective],
    imports: [CommonModule, TranslateModule, FormsModule, ...MaterialModules],
    exports: [
        TranslateModule,
        WebviewDirective,
        FormsModule,
        ...MaterialModules
    ]
})
export class SharedModule {}
