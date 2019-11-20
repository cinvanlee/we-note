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
        this.todoService.getAllTodos().subscribe(todos => {
            this.todos = todos;
        });
    }

    addTodo() {
        this.todoService.addTodo(this.todoName)
            .subscribe(newTodo => {
                this.todos = this.todos.concat(newTodo);
                this.todoName = '';
            });
    }
}
