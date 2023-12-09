import { Component } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from '../../providers/Tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-tasks',
  templateUrl: './work-tasks.component.html',
  styleUrls: ['./work-tasks.component.css']
})
export class WorkTasksComponent {
  tasks: Task[] = []
  constructor(private taskService: TasksService, private router: Router) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks()
    this.taskService.taskChanged.subscribe(tasks => {
      this.tasks = tasks
    })
  }

  openTask(id: number) {
    const task = this.tasks.find((task) => task.taskId === id)
    this.taskService.taskSelected.next(task)
    this.router.navigate(['tasks', {outlets: {taskDetail: ['edit', id]}}])
  }
}
