import { Component, OnInit } from "@angular/core";
import { WeNoteService } from "../../core/services/we-note/we-note.service";

@Component({
    selector: "app-system",
    templateUrl: "./system.component.html",
    styleUrls: ["./system.component.less"]
})
export class SystemComponent implements OnInit {
    appDir = "";

    constructor(private wnService: WeNoteService) {}

    ngOnInit() {
        this.initPageData();
    }

    async initPageData() {
        this.appDir = await this.wnService.getAppDir();
    }

    async openAppDirInFinder() {
        this.wnService.openInFinder(this.appDir);
    }

    async apply() {}
}
