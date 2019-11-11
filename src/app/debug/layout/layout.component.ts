import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
    menus = [
        { path: "/debug/icon", name: "Icon", icon: "face" },
        { path: "/debug/material", name: "Material", icon: "palette" },
        { path: "/debug/dialog", name: "Dialog", icon: "palette" }
    ];

    constructor() {}

    ngOnInit() {}
}
