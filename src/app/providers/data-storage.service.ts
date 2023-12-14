import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Subscription, map, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "@angular/fire/compat/database";

import { Task } from "../shared/task.model";
import { TasksService } from "./Tasks.service";
import { Note } from "../shared/note.model";
import { NotesService } from "./notes.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    userId: string
    link = 'https://task-manager-c8110-default-rtdb.firebaseio.com'

    constructor(private authService: AuthService, private db: AngularFireDatabase, private http: HttpClient, private taskService: TasksService, private notesService: NotesService) {
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
                        fireId: element,
                    }
                    taskArray.push(task)
                }
            }
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
    
    addNoteToDatabase(notes) {
        const path = `${this.userId}/notes`
        const dataRef = this.db.list(path)
        return dataRef.push(notes)
    }
    
    fetchNoteFromDatabase() {
        const path = `${this.link}/${this.userId}/notes.json`
        return this.http.get<Note[]>(path).pipe(map((notesArray: Note[]) => {
            const notes: Note[] = []
            for(let note in notesArray) {
                if(notesArray.hasOwnProperty(note)) {
                    const fetchedNote = new Note(notesArray[note].noteTitle, notesArray[note].noteDescription, note)
                    notes.push(fetchedNote)
                }
            }
            return notes
        }), tap(response => {
            this.notesService.setNotes(response)
        }))
    }

    updateNote(note: Note){
        const edittedNote = new Note(note.noteTitle, note.noteDescription)
        console.log(note.notesFireId)
        return this.http.patch(`${this.link}/${this.userId}/notes/${note.notesFireId}.json`, edittedNote)
    }
    
    deleteNote(fireId: string){
        return this.db.database.ref(`${this.userId}/notes/${fireId}`).remove()
    }
}