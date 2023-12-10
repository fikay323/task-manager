import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../../providers/Tasks.service';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(private router: Router, private taskService: TasksService, private authService: AuthService) {}

  createNewTask() {
    this.taskService.closeTaskDetails()
    setTimeout(() => {
      this.router.navigate(['tasks', 'new'])
    }, 50);
  }

  onLogout() {
    this.authService.logout()
  }
}