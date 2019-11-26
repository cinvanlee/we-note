import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { IConfig } from "../../core/services/we-note/we-note.interface";
import { WeNoteService } from "../../core/services/we-note/we-note.service";

@Component({
    selector: "app-behavior",
    templateUrl: "./behavior.component.html",
    styleUrls: ["./behavior.component.less"]
})
export class BehaviorComponent implements OnInit {
    theme = "light";
    language = "en";
    font = "";
    loading = false;
    fontSize = '14';

    fontList = [];

    constructor(
        private wnService: WeNoteService,
        private message: NzMessageService
    ) {}

    ngOnInit() {
        this.initPageData();
    }

    async initPageData() {
        const config: IConfig = await this.wnService.getAppConfig();
        this.theme = config.theme;
        this.font = config.font;
        this.fontList = this.wnService.getAvailableFonts();
    }

    async apply() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        if (this.theme) {
            await this.wnService.setTheme(this.theme);
        }
        if (this.language) {
            await this.wnService.setLanguage(this.language);
        }
        if (this.font) {
            await this.wnService.setFont(this.font);
        }
        if (this.fontSize) {
            await this.wnService.setFontSize(this.fontSize);
        }
        setTimeout(() => {
            this.loading = false;
            this.message.success("Success !");
        }, 500);
    }
}
