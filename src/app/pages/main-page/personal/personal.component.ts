import { Component } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from '../../../providers/Tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {
  tasks: Task[] = []
  constructor(private taskService: TasksService, private router: Router) {}

  ngOnInit() {
    this.taskService.screenWidth.next(window.innerWidth)
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
