import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/pages';
import { DefaultComponent } from './core/layouts';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            { path: '', loadChildren: './core/core.module#CoreModule' },
            { path: 'note', loadChildren: './note/note.module#NoteModule' },
            { path: 'debug', loadChildren: './debug/debug.module#DebugModule' },
        ],
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
