import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Subscription, map, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Task } from "../shared/task.model";
import { TasksService } from "./Tasks.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    userId: string
    userSubscription: Subscription
    link = 'https://task-manager-c8110-default-rtdb.firebaseio.com'

    constructor(private authService: AuthService, private http: HttpClient, private taskService: TasksService) {
        this.init()
    }

    private init() {
        this.authService.User.subscribe(user => {
            this.userId = user.id
        })
    }
    
    addTaskToDatabase(task) {
        return this.http.post(`${this.link}/${this.userId}/tasks.json`, task).subscribe(resData => {
            console.log(resData)
            this.taskService.addTask(task)
        })
    }
    fetchTaskFromDatabase() {
        if(typeof(this.userId) !== 'string') return []
        return this.http.get<Task[]>(`${this.link}/${this.userId}/tasks.json`)
        .pipe(map(response => {
            const taskArray: Task[] = []
            for(let element in response) {
                if(response.hasOwnProperty(element)) {
                    const task: Task = {
                        ...response[element],
                        taskDueDate: new Date(response[element].taskDueDate)
                    }
                    taskArray.push(task)
                }
            }
            console.log(taskArray)
            return taskArray
        }), tap(tasksArray => {
            this.taskService.setTasks(tasksArray)
        }))
    }
    updateTsk(){
        const tasks = this.taskService.getTasks()
        return this.http.put(`${this.link}/${this.userId}/tasks.json`, tasks)
    }

}