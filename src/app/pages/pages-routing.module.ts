import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../theme/layouts/default/default.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NoteComponent } from './note/note.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            { path: '', component: WelcomeComponent },
            { path: 'note', component: NoteComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
