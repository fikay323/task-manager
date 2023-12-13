import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Subscription, map, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Task } from "../shared/task.model";
import { TasksService } from "./Tasks.service";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Note } from "../shared/note.model";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    userId: string
    userSubscription: Subscription
    link = 'https://task-manager-c8110-default-rtdb.firebaseio.com'

    constructor(private authService: AuthService, private db: AngularFireDatabase, private http: HttpClient, private taskService: TasksService) {
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
    stickyNotes: { noteTitle: string; noteDescription: string }[] = [
        { noteTitle: "Effortlessly organize your thoughts", noteDescription: "with our intuitive sticky notes app, allowing you to jot down quick reminders on the go." },
        { noteTitle: "Stay productive with our user-friendly interface", noteDescription: "that lets you easily create, edit, and organize your virtual sticky notes for seamless task management." },
        { noteTitle: "Customize your digital notes with various colors and styles", noteDescription: "adding a personal touch to your reminders and making them visually distinct." },
        { noteTitle: "Enjoy the convenience of syncing your sticky notes across devices", noteDescription: "ensuring you have access to your important thoughts whenever and wherever you need them." },
        { noteTitle: "With our app's responsive design and easy sharing options", noteDescription: "collaboration becomes a breeze, allowing you to effortlessly collaborate and share ideas with colleagues and friends." },
      ];
      
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
                        fireId: element,
                        notes: this.stickyNotes
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
        return this.db.database.ref(`${this.userId}/tasks/${fireId}`).remove()
    }

    addNotes(notes) {
        const path = `${this.userId}/notes`
        const dataRef = this.db.list(path)
        return dataRef.push(notes)
    }

}