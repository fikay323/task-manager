import { Injectable } from "@angular/core";
import { Task } from "src/app/shared/task.model";

@Injectable({providedIn: 'root'})
export class TasksService{
    Tasks: Task[] = [
        new Task('Task A', 'Description A', 'List 1', new Date(2023, 3, 4)),
        new Task('Task B', 'Description B', 'List 2', new Date()),
        new Task('Task C', 'Description C', 'List 3', new Date()),
        new Task('Task D', 'Description D', 'List 4', new Date(2023, 3, 6)),
        new Task('Task E', 'Description E', 'List 5', new Date(2023, 3, 6)),
    ]
}