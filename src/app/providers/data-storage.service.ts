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
    
    addRecipeToDatabase(task) {
        return this.http.post(`${this.link}/${this.userId}/tasks.json`, task)
    }
    fetchRecipeFromDatabase() {
        return this.http.get<Task[]>(`${this.link}/${this.userId}/tasks.json`)
        .pipe(map(response => {
            const taskArray: Task[] = []
            for(let element of response) {
                const task = new Task(element.taskName, element.taskDescription, element.taskList, element.taskDueDate, element.taskId)
                taskArray.push(task)
            }
            return taskArray
        }), tap(tasksArray => {
            this.taskService.setTasks(tasksArray)
        }))
    }

}