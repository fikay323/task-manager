import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Task } from "src/app/shared/task.model";

@Injectable({providedIn: 'root'})
export class TasksService{
    taskChanged = new Subject<Task[]>()
    taskSelected = new Subject<Task| undefined | null>()

    constructor(private router: Router) {}

    Tasks: Task[] = [
        new Task('Task A', 'Description A', 'personal', new Date('2023-12-13'), 3140854),
        new Task('Task B', 'Description B', 'work', new Date(), 8887486),
        new Task('Task C', 'Description C', 'personal', new Date('2023-12-4'), 4133539),
        new Task('Task D', 'Description D', 'work', new Date(), 1448232),
        new Task('Task E', 'Description E', 'work', new Date('2023-12-10'), 1788235),
        new Task('Task F', 'Description F', 'personal', new Date('2023-12-9'), 91406734),
    ]
    getRandomNumber() {
        const number = Math.floor(Math.random()*10000000)
        return number
    }
    setTasks(tasks: Task[]) {
        this.Tasks = tasks
        this.taskChanged.next(this.Tasks.slice())
    }
    getTasks() {
        return this.Tasks
    }
    getTask(id: number): Task | undefined {
        let task: Task | undefined
        task = this.Tasks.find((task) => task.taskId === id)
        return task
    }
    addTask(task: Task) {
        this.Tasks.push(task)
        this.taskChanged.next(this.Tasks.slice())
        console.log(this.Tasks)
    }
    deleteTask(id: number) {
        let task = this.Tasks.find((task) => task.taskId === id)
        for(let i=0; i<this.Tasks.length; i++) {
            if(this.Tasks[i].taskId === task?.taskId) {
                this.Tasks.splice(i, 1)
                this.taskChanged.next(this.Tasks.slice())
            }
        }
    }
    editTask(task: Task) {
        for(let i=0; i<this.Tasks.length; i++) {
            if(this.Tasks[i].taskId === task.taskId) {
                this.Tasks[i] = task
                this.taskChanged.next(this.Tasks.slice())
                break
            }
        }
    }

    closeTaskDetails() {
        this.router.navigate(['tasks', { outlets: { taskDetail: null } }]);
    }
}