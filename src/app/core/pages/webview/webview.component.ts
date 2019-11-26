import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-webview",
    templateUrl: "./webview.component.html",
    styleUrls: ["./webview.component.less"]
})
export class WebviewComponent implements OnInit {
    url = "";

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                this.url = params.url;
            });
    }
}
