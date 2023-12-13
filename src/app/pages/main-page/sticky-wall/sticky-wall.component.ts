import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/providers/data-storage.service';
import { NotesService } from 'src/app/providers/notes.service';
import { Note } from 'src/app/shared/note.model';

@Component({
  selector: 'app-sticky-wall',
  templateUrl: './sticky-wall.component.html',
  styleUrls: ['./sticky-wall.component.css']
})
export class StickyWallComponent {
  @ViewChild('noteForm') noteForm: any
  showOverlay = false
  notes: Note[] = []
  editMode = false
  previousNote: Note

  constructor(private notesService: NotesService, private dataStorageService: DataStorageService) {
  }
  
  ngOnInit() {
    this.notesService.noteChanged.subscribe(notes => {
      this.notes = notes
    })
    this.notes = this.notesService.Notes
    this.dataStorageService.fetchNoteFromDatabase().subscribe()
  }
  openNote(note: Note) {
    this.showOverlay = true
    this.editMode = true
    this.previousNote = note
    setTimeout(() => {
      this.noteForm.form.patchValue({
        noteTitle: note.noteTitle,
        noteDescription: note.noteDescription
      })
    })
  }
      
  addNewNote() {
    this.editMode = false
    this.showOverlay = true
  }
  closeOverlay() {
    this.showOverlay = false
  }
  
  submitForm(note) {
    if(!this.noteForm.valid) return
    if(this.editMode){
      if(this.previousNote.noteTitle === note.value.noteTitle && this.previousNote.noteDescription === note.value.noteDescription){
      } else {
        console.log('wahala e por')
        const newNote = new Note(note.value.noteTitle, note.value.noteDescription, this.previousNote.notesFireId)
        this.notesService.editNote(newNote)
        this.dataStorageService.updateNote(note.value).subscribe()
      }
    } else {
      this.notesService.addNote(note.value)
      this.dataStorageService.addNoteToDatabase(note.value).then(response => {
        this.notesService.setNoteId(response.ref.key)
      })
    }
    this.showOverlay = false
    this.editMode = false
  }
}
