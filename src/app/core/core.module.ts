import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DefaultComponent } from './layouts';
import { WelcomeComponent, NotFoundComponent } from './pages';

@NgModule({
    declarations: [
        DefaultComponent,
        WelcomeComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreRoutingModule
    ]
})
export class CoreModule {
}
