import { observable, action } from "mobx";
import history from "@/helper/history";
import storage from "@/helper/storage";

class TabBarStore {
    @observable tabs = [];

    @action async init() {
        const localTabs = (await storage.get("WN__TABS")) || {};
        self.tabs = localTabs.tabs || [];
    }

    @action open(tab) {
        const existIndex = self.tabs.findIndex(item => item.url === tab.url);
        if (existIndex === -1) {
            self.tabs.push(tab);
        }
        self.active(tab);
        self.persist();
    }

    @action active(tab) {
        self.tabs = self.tabs.map(item => {
            item.active = item.url === tab.url;
            return item;
        });
        history.push(tab.url);
        self.persist();
    }

    @action close(tab) {
        const existIndex = self.tabs.findIndex(item => item.url === tab.url);
        if (existIndex === -1) {
            return;
        }
        const activeTab =
            self.tabs[existIndex + 1] || self.tabs[existIndex - 1];
        self.tabs.splice(existIndex, 1);
        if (activeTab) {
            self.active(activeTab);
        }
        self.persist();
    }

    persist() {
        storage.set("WN__TABS", {
            tabs: self.tabs
        });
    }
}

const self = new TabBarStore();
export default self;
