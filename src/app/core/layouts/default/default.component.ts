import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TabService } from "../../services";

@Component({
    selector: "app-default",
    providers: [TabService],
    templateUrl: "./default.component.html",
    styleUrls: ["./default.component.scss"]
})
export class DefaultComponent implements OnInit, OnDestroy {
    modules = [
        { path: "/debug", name: "Debug", icon: "bug_report" },
        { path: "/nav-hub", name: "Navhub", icon: "apps" },
        { path: "/note", name: "Note", icon: "book" }
    ];

    tabs = [];
    activeTabPath: string;
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
            name: "首页"
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
