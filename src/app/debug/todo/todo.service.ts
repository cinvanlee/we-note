import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}

@Injectable({
    providedIn: "root"
})
export class TodoService {
    public todos$ = new BehaviorSubject<ITodo[]>([]);

    public getTodos$() {
        return this.todos$;
    }

    public addTodo(title) {
        const todos$ = this.todos$.getValue();
        const newTodo = {
            id: +new Date(),
            title,
            completed: false
        };
        this.todos$.next([...todos$, newTodo]);
    }

    public removeTodoById(id) {
        const todos$ = this.todos$.getValue();
        const newTodos = todos$.filter(todo => todo.id !== id);
        this.todos$.next(newTodos);
    }

    public toggleTodoStatus(id, completed) {
        const todos$ = this.todos$.getValue();
        const newTodos = todos$.map(todo => {
            if (todo.id === id) {
                todo.completed = completed;
            }
            return todo;
        });
        this.todos$.next(newTodos);
    }
}
