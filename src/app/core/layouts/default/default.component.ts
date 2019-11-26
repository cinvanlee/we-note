import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TabService } from "../../services/tab/tab.service";
import { WeNoteService } from "../../services/we-note/we-note.service";

@Component({
    selector: "app-default",
    providers: [TabService],
    templateUrl: "./default.component.html",
    styleUrls: ["./default.component.less"]
})
export class DefaultComponent implements OnInit, OnDestroy {
    modules = [
        { path: "/nav-hub", name: "Navigation", icon: "appstore" },
        { path: "/notebook", name: "Notebook", icon: "book" },
        { path: "/passworder", name: "Password Manager", icon: "lock" },
        { path: "/preference", name: "Preference", icon: "setting" }
    ];

    selectedTabIndex = 0;
    tabs = [];
    activeTabPath = "";
    tabSub: any;
    appVersion = "";

    constructor(
        private tabService: TabService,
        private router: Router,
        private wnService: WeNoteService
    ) {}

    async ngOnInit() {
        this.appVersion = await this.wnService.getAppConfigByKey("version");
        this.tabSub = this.tabService.getTabs().subscribe(tabs => {
            this.tabs = tabs;
            tabs.forEach((tab, index) => {
                if (tab.active) {
                    this.activeTabPath = tab.path;
                    this.selectedTabIndex = index;
                }
            });
        });
    }

    ngOnDestroy() {
        this.tabSub.unsubscribe();
    }

    handleLogoClick() {
        this.tabService.addOrActiveTab({
            path: "/",
            name: "Dashboard"
        });
    }

    handleModuleClick(module) {
        this.tabService.addOrActiveTab(module);
    }

    handleRemoveTab(tab) {
        this.tabService.removeTab(tab);
    }

    handleActiveTab(tab) {
        this.tabService.activeTab(tab);
    }

    openGithub() {
        this.tabService.openExternal("https://github.com/rmlzy/we-note");
    }
}
