import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as Observable from "rxjs";

@Component({
    selector: "app-rxjs-operator",
    templateUrl: "./rxjs-operator.component.html",
    styleUrls: ["./rxjs-operator.component.less"]
})
export class RxjsOperatorComponent implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.testSubject();
    }

    testOf() {
        const source$ = Observable.of("Hello RxJS");
        source$.subscribe(text => {
            console.log(text);
            // output:
            // => Hello RxJS
        });
    }

    testRange() {
        const source$ = Observable.range(1, 10);
        source$.subscribe(num => {
            console.log(num);
            // output:
            // 1
            // 2
            // ...
            // 10
        });
    }

    testGenerate() {
        /**
         * generate 是 for 循环的变种
         */
        // for (let i = 0; i <= 10; i++) {
        //     console.log(i * 2);
        // }
        const source$ = Observable.generate(
            0,
            value => value <= 10,
            value => value + 1,
            value => value * 2
        );
        source$.subscribe(num => {
            console.log(num);
            // output:
            // 0
            // 2
            // 4
            // ...
            // 20
        });
    }

    testRepeat() {}

    testInterval() {
        // 相当于 setInterval
        const source$ = Observable.interval(1000);
        source$.subscribe(num => {
            console.log(num);
            // output: 每次输出间隔一秒
            // => 0
            // => 1
            // => ...
        });
    }

    testTimer() {
        // 相当于 setTimeout
        const source$ = Observable.timer(3000);
        source$.subscribe(num => {
            console.log(num);
            // 三秒后输出:
            // => 0
        });
    }

    testFromArray() {
        const array = [1, 2, "Hello", true];
        const source$ = Observable.from(array);
        source$.subscribe(item => {
            console.log(item);
            // output:
            // => 1
            // => 2
            // => Hello
            // => true
        });
    }

    testFromPromise() {
        this.http.get("https://cnodejs.org/api/v1/topics").subscribe(res => {
            console.log(res);
            // output:
            // {
            //   success: true,
            //   data: []
            // }
        });
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([1, 2, 3, 4]);
            }, 3000);
        });
        const source$ = Observable.from(promise);
        source$.subscribe(res => {
            console.log(res);
            // 三秒后输出:
            // => [1, 2, 3, 4]
        });
    }

    testFromEvent() {
        const source$ = Observable.fromEvent(document.body, "click");
        source$.subscribe(evt => {
            console.log(evt);
            // 文档被点击时, 输出 Click Event
        });
    }

    testSubject() {
        const subject = new Observable.Subject();
        subject.subscribe(
            value => {
                console.log(value);
            },
            err => {
                console.error(err);
            },
            () => {
                console.log("completed");
            }
        );

        setInterval(() => {
            subject.next(new Date());
            // output: 每隔一秒输出当前时间
            // Wed Nov 20 2019 13:31:20 GMT+0800 (China Standard Time)
        }, 1000);
    }
}
