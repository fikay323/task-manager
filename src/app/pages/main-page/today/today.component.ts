import { Component } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from '../../../providers/Tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent {
  tasks: Task[] = []
  track: any
  constructor(private taskService: TasksService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.taskService.screenWidth.next(window.innerWidth)
    this.tasks = this.taskService.getTasks()
    this.taskService.taskChanged.subscribe(tasks => {
      this.tasks = tasks
    })
  }

  openTask(id: number) {
    this.router.navigate([id, 'edit'], {relativeTo: this.route})
  }
}
