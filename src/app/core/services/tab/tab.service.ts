import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { WeNoteService } from "../we-note/we-note.service";

const electron = window.require("electron");

interface ITab {
    path: string;
    name: string;
    active: boolean;
}

@Injectable({
    providedIn: "root"
})
export class TabService {
    public tabs$ = new BehaviorSubject<ITab[]>([]);

    constructor(private wnService: WeNoteService, private router: Router) {
        this.readCachedTabs();
        this.tabs$.subscribe(tabs => {
            try {
                wnService.setAppConfig("tabs", tabs);
            } catch (e) {
                // ignore
            }
        });
    }

    private async readCachedTabs() {
        const cachedTabs = await this.wnService.getAppConfigByKey("tabs");
        // @ts-ignore
        this.tabs$.next(cachedTabs);
    }

    public getTabs(): Observable<ITab[]> {
        return this.tabs$;
    }

    public addOrActiveTab({ path, name }) {
        const tabs = this.tabs$.getValue();
        const existIndex = tabs.findIndex(tab => tab.path === path);
        if (existIndex === -1) {
            this.addTab({ path, name });
        } else {
            this.activeTab({ path, name });
        }
    }

    public activeTab({ path, name }) {
        const tabs = this.tabs$.getValue();
        const newTabs = tabs.map(tab => {
            tab.active = tab.path === path;
            return tab;
        });
        this.tabs$.next(newTabs);
        this.router.navigateByUrl(path);
    }

    public addTab({ path, name }) {
        let tabs = this.tabs$.getValue();
        tabs = tabs.map(tab => {
            tab.active = false;
            return tab;
        });
        const newTab = {
            path,
            name,
            active: true
        };
        this.tabs$.next([...tabs, newTab]);
        this.router.navigateByUrl(path);
    }

    public removeTab({ path }) {
        const tabs = this.tabs$.getValue();
        const newTabs = tabs.filter(tab => tab.path !== path);
        const lastTab = newTabs[newTabs.length - 1];
        this.tabs$.next(newTabs);
        if (lastTab) {
            this.activeTab(lastTab);
        } else {
            this.addTab({ path: "/", name: "Dashboard" });
        }
    }

    updateActivatedTabName(name) {
        const tabs = this.tabs$.getValue();
        const newTabs = tabs.map(tab => {
            if (tab.active) {
                tab.name = name;
            }
            return tab;
        });
        this.tabs$.next(newTabs);
    }

    updateActivatedTabPath(path) {
        const tabs = this.tabs$.getValue();
        const newTabs = tabs.map(tab => {
            if (tab.active) {
                tab.path = path;
            }
            return tab;
        });
        this.tabs$.next(newTabs);
    }

    openExternal(url) {
        electron.shell.openExternal(url);
    }

    openWebview({ path, name }) {
        this.addOrActiveTab({
            path: `/webview?url=${encodeURIComponent(path)}`,
            name
        });
    }
}
