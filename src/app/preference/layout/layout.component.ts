import { Component, OnInit } from "@angular/core";
import { TabService } from "../../core/services/tab/tab.service";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.less"]
})
export class LayoutComponent implements OnInit {
    menus = [
        { path: "/preference/behavior", name: "Behavior", icon: "palette" },
        { path: "/preference/deploy", name: "Deploy", icon: "palette" },
        { path: "/preference/system", name: "System", icon: "palette" }
    ];

    constructor(private tabService: TabService) {}

    ngOnInit() {}

    updateActivatedTab(tab) {
        this.tabService.updateActivatedTabPath(tab.path);
    }
}
