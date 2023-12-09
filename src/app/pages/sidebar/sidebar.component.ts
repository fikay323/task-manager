import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../../providers/Tasks.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router, private taskService: TasksService) {}
  createNewTask() {
    this.taskService.closeTaskDetails()
    setTimeout(() => {
      this.router.navigate(['tasks', 'new'])
    }, 50);
  }
}