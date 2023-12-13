import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/providers/data-storage.service';
import { NotesService } from 'src/app/providers/notes.service';
import { Note } from 'src/app/shared/note.model';

@Component({
  selector: 'app-sticky-wall',
  templateUrl: './sticky-wall.component.html',
  styleUrls: ['./sticky-wall.component.css']
})
export class StickyWallComponent {
  showOverlay = false
  notes: Note[] = []
  constructor(private notesService: NotesService, private dataStorageService: DataStorageService) {
  }
  
  ngOnInit() {
    this.notesService.noteChanged.subscribe(notes => {
      this.notes = notes
    })
    this.notes = this.notesService.Notes
    this.dataStorageService.fetchNoteFromDatabase().subscribe()
  }

  addNewTask() {
    this.showOverlay = true
  }
  closeOverlay() {
    this.showOverlay = false
  }

  submitForm(note) {
    this.notesService.addNote(note.value)
    this.dataStorageService.addNoteToDatabase(note.value).then(response => {
      console.log(response)
    })
    console.log(note.value)
    this.showOverlay = false
  }
}
