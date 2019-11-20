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
        { path: "/debug/dialog", name: "Dialog", icon: "palette" },
        { path: "/debug/rxjs-operator", name: "RxJS 操作符", icon: "palette" },
        { path: "/debug/todo", name: "Todo APP", icon: "palette" },
        { path: "/debug/user-config", name: "操作用户配置", icon: "palette" },
    ];

    constructor() {}

    ngOnInit() {}
}
