import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Note } from "../shared/note.model";

@Injectable({providedIn: 'root'})
export class NotesService{
    noteChanged = new Subject<Note[]>()

    constructor(private router: Router) {}

    Notes: Note[] = []
    getRandomNumber() {
        const number = Math.floor(Math.random()*10000000)
        return number
    }
    // setTasks(notes: Note[]) {
    //     this.Notes = notes
    //     this.noteChanged.next(this.Notes.slice())
    // }
    // getNotes() {
    //     return this.Notes
    // }
    // getTask(id: number): Note | undefined {
    //     let task: Task | undefined
    //     task = this.Notes.find((note) => note.taskId === id)
    //     return task
    // }
    addNote(note: Note) {
        this.Notes.push(note)
        this.noteChanged.next(this.Notes.slice())
        console.log(this.Notes)
    }
    // deleteTask(id: number) {
    //     let task = this.Notes.find((task) => task.taskId === id)
    //     for(let i=0; i<this.Notes.length; i++) {
    //         if(this.Notes[i].taskId === task?.taskId) {
    //             this.Notes.splice(i, 1)
    //             this.noteChanged.next(this.Notes.slice())
    //             break
    //         }
    //     }
    // }
    // editTask(task: Note) {
    //     for(let i=0; i<this.Notes.length; i++) {
    //         if(this.Notes[i].taskId === task.taskId) {
    //             this.Notes[i] = task
    //             this.noteChanged.next(this.Notes.slice())
    //             break
    //         }
    //     }
    // }

    // closeTaskDetails() {
    //     this.router.navigate(['tasks', { outlets: { taskDetail: null } }]);
    // }
}