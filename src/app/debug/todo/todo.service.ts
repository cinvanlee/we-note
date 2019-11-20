import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}

@Injectable({
    providedIn: "root"
})
export class TodoService {
    public todo$: Observable<ITodo[]>;
    private defaultTodo = [
        {
            id: +new Date(),
            title: "Default",
            completed: false
        }
    ];

    constructor() {
        this.todo$ = of(this.defaultTodo);
    }

    public getAllTodos() {
        return this.todo$;
    }

    public addTodo(title) {
        // 1. 直接操作源数据: defaultTodo ??

        // 2. 返回新的 Observable ??
        return of([
            {
                id: +new Date(),
                title,
                completed: false
            }
        ]);
    }
}
