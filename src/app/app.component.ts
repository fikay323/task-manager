import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { DataStorageService } from './providers/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.authService.autoLogin()
    this.dataStorageService.fetchNoteFromDatabase().subscribe()
  }
}
