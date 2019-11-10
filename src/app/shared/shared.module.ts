import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { MaterialModules } from './material.module';
import { WebviewDirective } from './directives/';

@NgModule({
    declarations: [WebviewDirective],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ...MaterialModules
    ],
    exports: [
        TranslateModule,
        WebviewDirective,
        FormsModule,
        ...MaterialModules
    ]
})
export class SharedModule {
}
