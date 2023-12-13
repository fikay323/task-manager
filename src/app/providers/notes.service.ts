import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Note } from "../shared/note.model";

@Injectable({providedIn: 'root'})
export class NotesService{
    noteChanged = new Subject<Note[]>()

    constructor(private router: Router) {}

    Notes: Note[] = [
        new Note('Effortlessly organize your thoughts', 'with our intuitive sticky notes app, allowing you to jot down quick reminders on the go.'),
        new Note('Stay productive with our user-friendly interface', 'that lets you easily create, edit, and organize your virtual sticky notes for seamless task management.'),
        { noteTitle: "Customize your digital notes with various colors and styles", noteDescription: "adding a personal touch to your reminders and making them visually distinct." },
        { noteTitle: "Enjoy the convenience of syncing your sticky notes across devices", noteDescription: "ensuring you have access to your important thoughts whenever and wherever you need them." },
        { noteTitle: "With our app's responsive design and easy sharing options", noteDescription: "collaboration becomes a breeze, allowing you to effortlessly collaborate and share ideas with colleagues and friends." },
    ]
    getRandomNumber() {
        const number = Math.floor(Math.random()*10000000)
        return number
    }
    setNotes(notes: Note[]) {
        this.Notes = notes
        this.noteChanged.next(this.Notes.slice())
        console.log(this.Notes)
    }
    getNotes() {
        return this.Notes
    }
    // getTask(id: number): Note | undefined {
    //     let task: Task | undefined
    //     task = this.Notes.find((note) => note.taskId === id)
    //     return task
    // }
    setNoteId(id: string) {
        const lastNote= this.Notes.at(-1)
        const note = {...lastNote, notesFireId: id}
        this.Notes[this.Notes.length-1] = note
        console.log(this.Notes)
        this.noteChanged.next(this.Notes)
    }
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