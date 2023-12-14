import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Note } from "../shared/note.model";

@Injectable({providedIn: 'root'})
export class NotesService{
    noteChanged = new Subject<Note[]>()

    constructor(private router: Router) {}

    Notes: Note[] = [
        new Note('', ''),
        new Note('', ''),
        { noteTitle: "", noteDescription: "" },
        { noteTitle: "", noteDescription: "" },
        { noteTitle: "", noteDescription: "" },
    ]
    getRandomNumber() {
        const number = Math.floor(Math.random()*10000000)
        return number
    }
    setNotes(notes: Note[]) {
        this.Notes = notes
        this.noteChanged.next(this.Notes.slice())
    }
    getNotes() {
        return this.Notes
    }
    setNoteId(id: string) {
        const lastNote= this.Notes.at(-1)
        const note = {...lastNote, notesFireId: id}
        this.Notes[this.Notes.length-1] = note
        this.noteChanged.next(this.Notes)
    }
    addNote(note: Note) {
        this.Notes.push(note)
        this.noteChanged.next(this.Notes.slice())
    }
    deleteNote(id: string) {
        let note = this.Notes.find((note) => note.notesFireId === id)
        for(let i=0; i<this.Notes.length; i++) {
            if(this.Notes[i].notesFireId === note?.notesFireId) {
                this.Notes.splice(i, 1)
                this.noteChanged.next(this.Notes.slice())
                break
            }
        }
    }
    editNote(note: Note) {
        for(let i=0; i<this.Notes.length; i++) {
            if(this.Notes[i].notesFireId === note.notesFireId) {
                this.Notes[i] = note
                this.noteChanged.next(this.Notes.slice())
                break
            }
        }
    }
}