import { Component, OnInit } from "@angular/core";
import { TabService } from "../../../core/services/tab/tab.service";
import { WeNoteService } from "../../../core/services/we-note/we-note.service";
import { NavHubService } from "../../services/nav-hub.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.less"]
})
export class DashboardComponent implements OnInit {
    sites: any;

    constructor(
        private navService: NavHubService,
        private tabService: TabService,
        private wnService: WeNoteService
    ) {}

    ngOnInit() {
        this.sites = this.navService.sites;
    }

    async openSite(site) {
        const useDefaultBrowser = await this.wnService.getAppConfigByKey(
            "useDefaultBrowser"
        );
        if (useDefaultBrowser) {
            this.tabService.openExternal(site.url);
        } else {
            this.tabService.openWebview({ path: site.url, name: site.title });
        }
    }

    openAllSite(block) {
        block.links.forEach(site => {
            this.openSite(site);
        });
    }
}
