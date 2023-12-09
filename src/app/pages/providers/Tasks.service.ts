import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Task } from "src/app/shared/task.model";

@Injectable({providedIn: 'root'})
export class TasksService{
    taskChange = new Subject<Task[]>()

    Tasks: Task[] = [
        new Task('Task A', 'Description A', 'personal', new Date(2023, 11, 13), this.getRandomNumber()),
        new Task('Task B', 'Description B', 'work', new Date(), this.getRandomNumber()),
        new Task('Task C', 'Description C', 'personal', new Date(2023, 11, 4), this.getRandomNumber()),
        new Task('Task D', 'Description D', 'work', new Date(), this.getRandomNumber()),
        new Task('Task E', 'Description E', 'personal', new Date(2023, 11, 10), this.getRandomNumber()),
        new Task('Task F', 'Description F', 'personal', new Date(2023, 11, 9), this.getRandomNumber()),
    ]
    getRandomNumber() {
        const number = Math.floor(Math.random()*10000000)
        return number
    }
    getTasks() {
        return this.Tasks
    }
    getTask(i: number) {
        return this.Tasks[i]
    }
}