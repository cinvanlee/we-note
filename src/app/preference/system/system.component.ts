import { Component, OnInit } from "@angular/core";
import { WeNoteService } from "../../core/services/we-note/we-note.service";

@Component({
    selector: "app-system",
    templateUrl: "./system.component.html",
    styleUrls: ["./system.component.less"]
})
export class SystemComponent implements OnInit {
    appDir = "";
    useDefaultBrowser = false;

    constructor(private wnService: WeNoteService) {}

    ngOnInit() {
        this.initPageData();
    }

    async initPageData() {
        this.appDir = await this.wnService.getAppDir();
        this.useDefaultBrowser = await this.wnService.getAppConfigByKey(
            "useDefaultBrowser"
        );
    }

    async openAppDirInFinder() {
        this.wnService.openInFinder(this.appDir);
    }

    async submitForm() {
        await this.wnService.setAppConfig(
            "useDefaultBrowser",
            this.useDefaultBrowser
        );
    }
}
