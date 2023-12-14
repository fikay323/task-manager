import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Task } from "src/app/shared/task.model";

@Injectable({providedIn: 'root'})
export class TasksService{
    taskChanged = new Subject<Task[]>()
    screenWidth = new Subject<number>()
    // taskSelected = new Subject<Task| undefined | null>()

    constructor(private router: Router) {}

    Tasks: Task[] = []
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
                break
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

}