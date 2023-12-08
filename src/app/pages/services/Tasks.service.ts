import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Task } from "src/app/shared/task.model";

@Injectable({providedIn: 'root'})
export class TasksService{
    taskChange = new Subject<Task[]>()

    Tasks: Task[] = [
        new Task('Task A', 'Description A', 'personal', new Date(2023, 3, 4)),
        new Task('Task B', 'Description B', 'work', new Date()),
        new Task('Task C', 'Description C', 'personal', new Date()),
        new Task('Task D', 'Description D', 'work', new Date(2023, 3, 6)),
        new Task('Task E', 'Description E', 'personal', new Date(2023, 3, 6)),
    ]
    getTasks() {
        return this.Tasks
    }
    getTask(i: number) {
        return this.Tasks[i]
    }
}