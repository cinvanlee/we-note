import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './pages';
import { DefaultComponent } from './layouts';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            { path: '', component: WelcomeComponent }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CoreRoutingModule {
}
