import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ElectronService } from "../electron/electron.service";
import { WeNoteService } from "../we-note/we-note.service";

interface ITab {
    path: string;
    name: string;
    active: boolean;
}

@Injectable({
    providedIn: "root"
})
export class TabService {
    tabs$ = new BehaviorSubject<ITab[]>([]);

    constructor(private wnService: WeNoteService, private router: Router, private electronService: ElectronService) {
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

    getTabs(): Observable<ITab[]> {
        return this.tabs$;
    }

    addOrActiveTab({ path, name }) {
        const tabs = this.tabs$.getValue();
        const existIndex = tabs.findIndex(tab => tab.path === path);
        if (existIndex === -1) {
            this.addTab({ path, name });
        } else {
            this.activeTab({ path, name });
        }
    }

    activeTab({ path, name }) {
        const tabs = this.tabs$.getValue();
        const newTabs = tabs.map(tab => {
            tab.active = tab.path === path;
            return tab;
        });
        this.tabs$.next(newTabs);
        this.router.navigateByUrl(path);
    }

    addTab({ path, name }) {
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

    removeTab({ path }) {
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
        this.electronService.shell.openExternal(url);
    }

    openWebview({ path, name }) {
        this.addOrActiveTab({
            path: `/webview?url=${encodeURIComponent(path)}`,
            name
        });
    }

    async activeCachedTab() {
        const tabs = await this.wnService.getAppConfigByKey("tabs");
        let activeTab;
        tabs.forEach(item => {
            if (item.active) {
                activeTab = item;
            }
        });
        if (!activeTab) {
            activeTab = { path: "/", name: "Dashboard", active: true };
        }
        this.addOrActiveTab(activeTab);
    }
}
