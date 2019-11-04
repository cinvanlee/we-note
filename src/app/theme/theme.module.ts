import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ThemeRoutingModule } from './theme-routing.module';
import { DefaultComponent } from './layouts/default/default.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { TabBarComponent, SideMenuComponent } from './components';

@NgModule({
    declarations: [DefaultComponent, BlankComponent, TabBarComponent, SideMenuComponent],
    imports: [
        CommonModule,
        FormsModule,
        ThemeRoutingModule,
        NgZorroAntdModule
    ]
})
export class ThemeModule {
}
