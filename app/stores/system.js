import { action, observable, observe } from "mobx";

class SystemStore {
    @observable lang = "zh-CN";
}

const self = new SystemStore();
export default self;
