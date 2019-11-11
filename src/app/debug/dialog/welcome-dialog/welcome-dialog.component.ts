import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-welcome-dialog',
    templateUrl: './welcome-dialog.component.html',
    styleUrls: [ './welcome-dialog.component.scss' ]
})
export class WelcomeDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data) {
    }

    ngOnInit() {
    }

}
