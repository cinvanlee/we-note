import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ThemeModule } from '../theme/theme.module';
import { NoteComponent } from './note/note.component';

@NgModule({
    declarations: [WelcomeComponent, NoteComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        NgZorroAntdModule,
        PagesRoutingModule,
        ThemeModule
    ]
})
export class PagesModule {
}
