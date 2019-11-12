import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

interface ICount {
    value: number;
}

@Injectable({
    providedIn: "root"
})
export class CounterService {
    private initialCount = { value: 0 };
    private countTracker = new BehaviorSubject<ICount>(this.initialCount);

    constructor() {}

    getCount(): Observable<ICount> {
        return this.countTracker.asObservable();
    }

    setCount(val: number, delta: number) {
        this.countTracker.next({ value: val + delta });
    }

    resetCount() {
        this.countTracker.next(this.initialCount);
    }
}
