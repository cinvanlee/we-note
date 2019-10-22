import { action, observable, computed } from "mobx";
import storage from "../helper/storage";

const LOCAL_STORAGE_KEY = "WN__Iframes";
const DEFAULT_IFRAMES = [
    {
        name: "笔记本",
        url: "#/note",
        disableClose: true,
        active: false
    }
];

class TabBarStore {
    @observable iframes = DEFAULT_IFRAMES;

    @computed get current() {
        return self.iframes.find(item => item.active);
    }

    @action
    async init() {
        self.iframes = await storage.get(LOCAL_STORAGE_KEY);
    }

    @action open(iframe) {
        const existedIndex = self.iframes.findIndex(
            item => item.url === iframe.url
        );
        if (existedIndex === -1) {
            self.iframes.push(iframe);
        }
        self.active(iframe);
    }

    @action close(iframe) {
        const existedIndex = self.iframes.findIndex(
            item => item.url === iframe.url
        );
        let nextActiveIframe = null;
        if (self.iframes[existedIndex - 1]) {
            nextActiveIframe = self.iframes[existedIndex - 1];
        }
        if (self.iframes[existedIndex + 1]) {
            nextActiveIframe = self.iframes[existedIndex + 1];
        }
        if (existedIndex !== -1) {
            self.iframes.splice(existedIndex, 1);
            self.active(nextActiveIframe);
        }
        self.persist();
    }

    @action closeAll() {
        self.iframes = DEFAULT_IFRAMES;
        self.persist();
    }

    @action active(iframe) {
        self.iframes = self.iframes.map(item => {
            item.active = item.url === iframe.url;
            return item;
        });
        self.persist();
    }

    persist() {
        storage.set(LOCAL_STORAGE_KEY, self.iframes);
    }
}

const self = new TabBarStore();
export default self;
