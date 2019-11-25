import { Component, OnInit } from "@angular/core";
import {WeNoteService} from "../../core/services/we-note/we-note.service";

@Component({
    selector: "app-user-config",
    templateUrl: "./user-config.component.html",
    styleUrls: ["./user-config.component.less"]
})
export class UserConfigComponent implements OnInit {
    output: string;

    constructor(private wnService: WeNoteService) {}

    ngOnInit() {}

    private getFormattedJSON(json) {
        let formatted = "";
        try {
            formatted = JSON.stringify(json, null, "    ");
        } catch (e) {
            // ignore
        }
        return formatted;
    }

    async getAppPath() {
        this.output = this.wnService.getAppConfigPath();
    }

    async getUserConfig() {
        const config = await this.wnService.getAppConfig();
        this.output = this.getFormattedJSON(config);
    }

    async setUserConfig() {
        const config = await this.wnService.setAppConfig(
            "updated_at",
            +new Date()
        );
        this.output = this.getFormattedJSON(config);
    }

    async toggleTheme() {
        const theme = await this.wnService.getAppConfigByKey("theme");
        const newTheme = theme === "light" ? "dark" : "light";
        await this.wnService.setTheme(newTheme);
    }

    async getAppName() {
        this.output = (await this.wnService.getAppConfigByKey("name")) as string;
    }
}
