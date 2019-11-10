import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DefaultComponent } from './layouts';
import { WelcomeComponent, NotFoundComponent } from './pages';
import { SettingComponent } from './pages/setting/setting.component';

@NgModule({
    declarations: [
        DefaultComponent,
        WelcomeComponent,
        NotFoundComponent,
        SettingComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreRoutingModule
    ]
})
export class CoreModule {
}
