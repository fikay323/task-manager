import { Component } from '@angular/core';
import { TasksService } from 'src/app/providers/Tasks.service';
import { NotesService } from 'src/app/providers/notes.service';
import { Note } from 'src/app/shared/note.model';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-sticky-wall',
  templateUrl: './sticky-wall.component.html',
  styleUrls: ['./sticky-wall.component.css']
})
export class StickyWallComponent {
  showOverlay = false
  notes: Note[] = []
  constructor(private notesService: NotesService, private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.taskChanged.subscribe(tasks => {
      tasks.forEach(task => {
        this.notes.push(task.notes)
      })
    })
    this.tasksService.Tasks.forEach(task => {
      console.log(task.notes)
      console.log()
      // this.notes = task.notes
    })
  }

  submitForm(note) {
    this.notesService.addNote(note.value)
    console.log(note.value)
  }
}
