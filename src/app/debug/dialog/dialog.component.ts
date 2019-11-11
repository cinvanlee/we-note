import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { WelcomeDialogComponent } from "./welcome-dialog/welcome-dialog.component";

@Component({
    selector: "app-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent implements OnInit {
    constructor(public dialog: MatDialog) {}

    ngOnInit() {}

    openDialog() {
        const dialogRef = this.dialog.open(WelcomeDialogComponent, {
            width: "250px",
            data: { hello: "Hello Dialog" }
        });
    }
}
