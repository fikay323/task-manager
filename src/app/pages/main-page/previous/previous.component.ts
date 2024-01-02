import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/providers/Tasks.service';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrl: './previous.component.css'
})
export class PreviousComponent {
  tasks: Task[] = []
  constructor(private taskService: TasksService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.taskService.screenWidth.next(window.innerWidth)
    this.tasks = this.taskService.getTasks()
    this.taskService.taskChanged.subscribe(tasks => {
      this.tasks = tasks
    })
  }

  openTask(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route })
  }

}
