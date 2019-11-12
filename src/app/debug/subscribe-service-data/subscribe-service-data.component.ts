import { Component, OnDestroy, OnInit } from "@angular/core";
import { CounterService } from "./counter.service";

@Component({
    selector: "app-subscribe-service-data",
    providers: [CounterService],
    templateUrl: "./subscribe-service-data.component.html",
    styleUrls: ["./subscribe-service-data.component.scss"]
})
export class SubscribeServiceDataComponent implements OnInit, OnDestroy {
    currentCount: number;
    countSub;

    constructor(private counter: CounterService) {}

    ngOnInit() {
        this.countSub = this.counter.getCount().subscribe(res => {
            this.currentCount = res.value;
        });
    }

    ngOnDestroy(): void {
        this.countSub.unsubscribe();
    }

    increment() {
        this.counter.setCount(this.currentCount, 1);
    }

    decrement() {
        this.counter.setCount(this.currentCount, -1);
    }

    reset() {
        this.counter.resetCount();
    }
}
