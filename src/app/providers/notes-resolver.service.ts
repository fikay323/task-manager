import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Note } from '../shared/note.model';
import { Observable } from 'rxjs';
import { NotesService } from './notes.service';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotesResolverService implements Resolve<Note[]> {
  fetched = false

  constructor(private notesService: NotesService, private dataStorageService: DataStorageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Note[] | Observable<Note[]> | Promise<Note[]> {
    if(this.fetched) {
        const array = this.notesService.getNotes()
        return array
    } else {
        this.fetched = true
        return this.dataStorageService.fetchNoteFromDatabase()
    }
}

}
