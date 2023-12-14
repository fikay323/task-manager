import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { DataStorageService } from './providers/data-storage.service';
import { User } from './shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private dataStorageService: DataStorageService) {}
  prevUser: User
  ngOnInit() {
    this.authService.User.subscribe(user => {
      if(user){
        if(user === this.prevUser){
        } else {
          this.dataStorageService.fetchNoteFromDatabase().subscribe()
          this.prevUser = user
        }
      }
    })
    this.authService.autoLogin()
  }
}
