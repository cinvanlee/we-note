import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TabService } from "../../services/tab/tab.service";

@Component({
    selector: "app-default",
    providers: [TabService],
    templateUrl: "./default.component.html",
    styleUrls: ["./default.component.less"]
})
export class DefaultComponent implements OnInit, OnDestroy {
    modules = [
        { path: "/debug", name: "Debug", icon: "bug" },
        { path: "/nav-hub", name: "Navigation", icon: "appstore" },
        { path: "/notebook", name: "Notebook", icon: "book" },
        { path: "/preference", name: "Preference", icon: "setting" }
    ];

    tabs = [];
    activeTabPath = '';
    tabSub: any;

    constructor(private tabService: TabService, private router: Router) {}

    ngOnInit() {
        this.tabSub = this.tabService.getTabs().subscribe(tabs => {
            this.tabs = tabs;
            tabs.forEach(tab => {
                if (tab.active) {
                    this.activeTabPath = tab.path;
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
}
