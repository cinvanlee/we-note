import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}

@Injectable({
    providedIn: "root"
})
export class TodoService {
    todo$: Observable<ITodo[]>;

    constructor() {}
}
