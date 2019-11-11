import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

interface ITab {
    path: string;
    name: string;
    active: boolean;
}

@Injectable({
    providedIn: "root"
})
export class TabService {
    private tabs: ITab[] = [];

    constructor() {}

    public getTabs(): Observable<ITab[]> {
        return of(this.tabs);
    }

    public activeTab({ path, name }) {
        const existIndex = this.tabs.findIndex(tab => tab.path === path);
        if (existIndex === -1) {
            this.tabs.push({ path, name, active: true });
        } else {
            this.tabs = this.tabs.map(tab => {
                tab.active = tab.path === path;
                return tab;
            });
        }
    }
}
