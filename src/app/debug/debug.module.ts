import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DebugRoutingModule } from './debug-routing.module';
import { MaterialComponent } from './material/material.component';
import { LayoutComponent } from './layout/layout.component';
import { IconComponent } from './icon/icon.component';
import { DialogComponent } from './dialog/dialog.component';
import { WelcomeDialogComponent } from './dialog/welcome-dialog/welcome-dialog.component';

const COMPONENTS_DYNAMIC = [
    WelcomeDialogComponent
];

@NgModule({
    declarations: [
        MaterialComponent,
        LayoutComponent,
        IconComponent,
        DialogComponent,
        ...COMPONENTS_DYNAMIC
    ],
    imports: [
        CommonModule,
        SharedModule,
        DebugRoutingModule
    ],
    entryComponents: [
        ...COMPONENTS_DYNAMIC
    ]
})
export class DebugModule {
}
