import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd";
import { TabService } from "../../services/tab/tab.service";

@Component({
    selector: "app-webview",
    templateUrl: "./webview.component.html",
    styleUrls: ["./webview.component.less"]
})
export class WebviewComponent implements OnInit, OnDestroy {
    url = "";
    loading = false;
    webview: any;
    canGoBack = false;
    canGoForward = false;

    constructor(private route: ActivatedRoute, private tabService: TabService, private notify: NzNotificationService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.url = params.url;
        });

        this.webview = document.querySelector("webview");
        this.webview.addEventListener("did-start-loading", this.onDidStartLoading.bind(this));
        // Close loading while dom is ready
        this.webview.addEventListener("dom-ready", this.onDidStopLoading.bind(this));
        this.webview.addEventListener("did-navigate", this.onDidNavigate.bind(this));
    }

    ngOnDestroy(): void {
        this.webview.removeEventListener("did-start-loading", this.onDidStartLoading.bind(this));
        this.webview.removeEventListener("dom-ready", this.onDidStopLoading.bind(this));
        this.webview.removeEventListener("did-navigate", this.onDidNavigate.bind(this));
    }

    onDidStartLoading() {
        this.loading = true;
    }

    onDidStopLoading() {
        this.loading = false;
    }

    onDidNavigate() {
        if (this.webview) {
            this.canGoBack = this.webview.canGoBack();
            this.canGoForward = this.webview.canGoForward();
        }
    }

    openInFinder() {
        this.tabService.openExternal(this.url);
    }

    back() {
        this.webview.goBack();
    }

    goForward() {
        this.webview.goForward();
    }

    reload() {
        this.webview.reload();
    }

    toNewSite(newUrl) {
        // FORM:
        // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
        function validURL(str) {
            const pattern = new RegExp(
                "^(https?:\\/\\/)?" + // protocol
                "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                    "(\\#[-a-z\\d_]*)?$",
                "i"
            ); // fragment locator
            return !!pattern.test(str);
        }
        if (!validURL(newUrl)) {
            this.notify.error("ERROR", "The format of the URL you entered is incorrect. ");
            return;
        }
        this.url = `https://${newUrl}`;
    }
}
