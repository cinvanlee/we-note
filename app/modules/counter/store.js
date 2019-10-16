import { observable, action } from "mobx";

class Counter {
    @observable money = 0;

    @action increment() {
        self.money++;
    }

    @action decrement() {
        self.money--;
    }
}

const self = new Counter();
export default self;
