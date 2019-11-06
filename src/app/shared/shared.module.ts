import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { WebviewDirective } from './directives/';

const materialModules = [
    MatButtonModule,
    MatIconModule
];

@NgModule({
    declarations: [WebviewDirective],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ...materialModules
    ],
    exports: [
        TranslateModule,
        WebviewDirective,
        FormsModule,
        ...materialModules
    ]
})
export class SharedModule {
}
