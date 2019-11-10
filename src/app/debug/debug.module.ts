import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DebugRoutingModule } from './debug-routing.module';
import { MaterialComponent } from './material/material.component';
import { LayoutComponent } from './layout/layout.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
    declarations: [ MaterialComponent, LayoutComponent, IconComponent ],
    imports: [
        CommonModule,
        SharedModule,
        DebugRoutingModule
    ]
})
export class DebugModule {
}
