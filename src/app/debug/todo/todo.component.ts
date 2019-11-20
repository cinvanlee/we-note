import { Component, OnInit } from "@angular/core";
import { TodoService } from "./todo.service";

@Component({
    selector: "app-todo",
    templateUrl: "./todo.component.html",
    styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
    todos = [];
    todoName = "";

    constructor(private todoService: TodoService) {}

    ngOnInit() {
        this.todoService.getTodos$().subscribe(todos => {
            this.todos = todos;
        });
    }

    addTodo() {
        this.todoService.addTodo(this.todoName);

        // reset input value
        this.todoName = "";
    }

    removeTodo(id) {
        console.log(id);
        this.todoService.removeTodoById(id);
    }

    toggleTodoStatus({ id, completed }) {
        this.todoService.toggleTodoStatus(id, !completed);
    }
}
