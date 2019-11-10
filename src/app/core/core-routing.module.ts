import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './pages';
import { DefaultComponent } from './layouts';
import { SettingComponent } from './pages/setting/setting.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            { path: '', component: WelcomeComponent },
            { path: 'setting', component: SettingComponent },
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CoreRoutingModule {
}
