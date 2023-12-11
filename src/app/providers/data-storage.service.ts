import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Subscription, map, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Task } from "../shared/task.model";
import { TasksService } from "./Tasks.service";
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    userId: string
    userSubscription: Subscription
    link = 'https://task-manager-c8110-default-rtdb.firebaseio.com'

    constructor(private authService: AuthService, private afd: AngularFireDatabase, private http: HttpClient, private taskService: TasksService) {
        this.init()
    }

    private init() {
        this.authService.User.subscribe(user => {
            this.userId = user.id
        })
    }
    
    addTaskToDatabase(taskName, description, list, date, randomNumber) {
        const task = new Task(taskName, description, list, date, randomNumber)
        return this.http.post(`${this.link}/${this.userId}/tasks.json`, task).subscribe(resData => {
            console.log(resData)
            const addedTask = new Task(taskName, description, list, date, randomNumber, resData['name'])
            this.taskService.addTask(addedTask)
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
                        taskDueDate: new Date(response[element].taskDueDate),
                        fireId: element
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
    updateTask(task: Task){
        const edittedTask = new Task(task.taskName, task.taskDescription, task.taskList, task.taskDueDate, task.taskId)
        return this.http.put(`${this.link}/${this.userId}/tasks/${task.fireId}.json`, edittedTask)
    }
    deleteTask(fireId: string){
        return this.afd.database.ref(`${this.userId}/tasks/${fireId}`).remove()
    }

}