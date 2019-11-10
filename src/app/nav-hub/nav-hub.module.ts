import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NavHubRoutingModule } from './nav-hub-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
    declarations: [ DashboardComponent ],
    imports: [
        CommonModule,
        SharedModule,
        NavHubRoutingModule
    ]
})
export class NavHubModule {
}
