import { Component, OnDestroy, OnInit } from "@angular/core";
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
        { path: "/note", name: "Note", icon: "book" },
        { path: "/setting", name: "Setting", icon: "settings" }
    ];

    tabs = [];
    tabSub: any;

    constructor(private tabService: TabService) {}

    ngOnInit() {
        this.tabSub = this.tabService.getTabs().subscribe(tabs => {
            this.tabs = tabs;
        });
    }

    ngOnDestroy() {
        this.tabSub.unsubscribe();
    }

    handleModuleClick(module) {
        this.tabService.activeTab(module);
    }
}
