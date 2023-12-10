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

    constructor(private authService: AuthService, private http: HttpClient, private taskService: TasksService) {}

    ngOnInit() {
        this.userSubscription = this.authService.User.subscribe(user => {
            this.userId = user.id
        })
    }
    
    addTaskToDatabase(task) {
        return this.http.post(`${this.link}/${this.userId}/tasks.json`, task).subscribe(resData => {
            console.log(resData)
        })
    }
    fetchTaskFromDatabase() {
        return this.http.get<Task[]>(`${this.link}/${this.userId}/tasks.json`)
        .pipe(map(response => {
            const taskArray: Task[] = []
            console.log(response)
            // if(response.length > 0) {
            //     for(let element of response) {
            //         const task = new Task(element.taskName, element.taskDescription, element.taskList, element.taskDueDate, element.taskId)
            //         taskArray.push(task)
            //     }
            // }
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