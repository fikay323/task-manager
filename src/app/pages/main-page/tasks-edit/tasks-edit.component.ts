import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Route, Router } from '@angular/router';
import { TasksService } from '../../providers/Tasks.service';
import { Task } from 'src/app/shared/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.css']
})
export class TasksEditComponent implements OnInit {
  @ViewChild('taskForm') taskform: any
  id: number
  name: string
  task: Task | undefined | null
  taskSubscription: Subscription

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TasksService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params)=> {
      this.id = +params['id']
      this.name = params['name']
    })
    this.taskSubscription = this.taskService.taskSelected.subscribe(task => {
      if(task) {
        this.task = task
        const date = task?.taskDueDate;
        const formattedDate = `${date?.getFullYear()}-${(date?.getMonth() ?? 0) + 1}-${this.padTo2Digits(date?.getDate())}`;
        this.taskform.setValue({
          taskName: task?.taskName,
          description: task?.taskDescription,
          list: task?.taskList,
          date: formattedDate,
        })
        console.log(this.taskform.value)
      }
    })
  }
  ngOnDestroy() {
    this.taskSubscription.unsubscribe()
  }

  padTo2Digits(num: any) {
    return num?.toString().padStart(2, '0');
  }

  submitForm() {
    console.log(this.taskform.value.date)
  }

  closeTask() {
    this.taskService.taskSelected.next(null)
    this.router.navigate(['tasks', { outlets: { taskDetail: null } }]);
  }

}
