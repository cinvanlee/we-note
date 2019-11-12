import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface ITodo {
    name: string;
    completed: boolean;
}

@Injectable({
    providedIn: "root"
})
export class TodoService {
    private todos = new BehaviorSubject<ITodo[]>([]);

    constructor() {}
}
