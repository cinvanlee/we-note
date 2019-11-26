import { Component, OnInit } from "@angular/core";
import { TabService } from "../../../core/services/tab/tab.service";
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
        private tabService: TabService
    ) {}

    ngOnInit() {
        this.sites = this.navService.sites;
    }

    openSite(site) {
        if (!site.url) {
            return;
        }
        const path = `/webview?url=${encodeURIComponent(site.url)}`;
        this.tabService.addOrActiveTab({ path, name: site.title });
    }
}
