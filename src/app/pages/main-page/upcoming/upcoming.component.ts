import { Component } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from '../../../providers/Tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent {
  tasks: Task[] = []
  track: any
  constructor(private taskService: TasksService, private router: Router) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks()
    this.taskService.taskChanged.subscribe(tasks => {
      this.tasks = tasks
    })
  }

  openTask(id: number) {
    const task = this.tasks.find((task) => task.taskId === id)
    this.router.navigate(['tasks', {outlets: {taskDetail: ['edit', id]}}])
  }
}
