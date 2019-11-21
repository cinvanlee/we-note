import { Component, OnInit } from "@angular/core";
import { UserConfigService } from "../../core/services/user-config/user-config.service";

@Component({
    selector: "app-user-config",
    templateUrl: "./user-config.component.html",
    styleUrls: ["./user-config.component.scss"]
})
export class UserConfigComponent implements OnInit {
    output: string;

    constructor(private userConfigService: UserConfigService) {}

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

    async getUserConfig() {
        const config = await this.userConfigService.read();
        this.output = this.getFormattedJSON(config);
    }

    async setUserConfig() {
        const config = await this.userConfigService.set(
            "updatedAt",
            +new Date()
        );
        this.output = this.getFormattedJSON(config);
    }

    async toggleTheme() {
        const theme = await this.userConfigService.getConfigByKey("theme");
        const newTheme = theme === "light" ? "dark" : "light";
        const config = await this.userConfigService.set("theme", newTheme);
        this.output = this.getFormattedJSON(config);
    }

    async getAppName() {
        this.output = await this.userConfigService.getConfigByKey("name");
    }
}
