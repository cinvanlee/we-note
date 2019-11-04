import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { PagesRoutingModule } from './pages-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
    declarations: [WelcomeComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        PagesRoutingModule,
        ThemeModule
    ]
})
export class PagesModule {
}
