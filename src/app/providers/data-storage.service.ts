import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Subscription, map, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as CryptoJS from 'crypto-js';

import { Task } from "../shared/task.model";
import { TasksService } from "./Tasks.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    userId: string
    hashedUserId: string
    userSubscription: Subscription
    link = 'https://task-manager-c8110-default-rtdb.firebaseio.com'

    constructor(private authService: AuthService, private http: HttpClient, private taskService: TasksService) {
        this.init()
    }

    private init() {
        console.log('hyello')
        this.authService.User.subscribe(user => {
            console.log(user,2)
            this.userId = user.id
        })
    }
    
    private shortenUserId(firebaseUserId: string): string {
        const hash = CryptoJS.SHA256(firebaseUserId).toString(CryptoJS.enc.Hex);
        const shortenedId = hash.slice(0, 16);
        this.hashedUserId = shortenedId
        return shortenedId;
    }
    
    addTaskToDatabase(task) {
        return this.http.post(`${this.link}/${this.shortenUserId(this.userId)}/tasks.json`, task).subscribe(resData => {
            console.log(this.hashedUserId)
            console.log(resData)
            this.taskService.addTask(task)
        })
    }
    fetchTaskFromDatabase() {
        if(typeof(this.userId) !== 'string') return []
        return this.http.get<Task[]>(`${this.link}/${this.shortenUserId(this.userId)}/tasks.json`)
        .pipe(map(response => {
            console.log(this.hashedUserId)
            const taskArray: Task[] = []
            if(Array.isArray(response)) {
                for(let element of response) {
                    const task = new Task(element.taskName, element.taskDescription, element.taskList, element.taskDueDate, element.taskId)
                    taskArray.push(task)
                }
            }
            console.log(taskArray)
            return taskArray
        }), tap(tasksArray => {
            console.log(tasksArray)
            this.taskService.setTasks(tasksArray)
        }))
    }
    updateTsk(){
        const tasks = this.taskService.getTasks()
        return this.http.put(`${this.link}/${this.userId}/tasks.json`, tasks)
    }

}