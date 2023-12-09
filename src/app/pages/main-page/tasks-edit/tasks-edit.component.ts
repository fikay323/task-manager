import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

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
  editMode: boolean = false
  task: Task | undefined
  taskSubscription: Subscription

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TasksService, private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params)=> {
      this.id = +params['id']
      this.editMode = params['name'] === 'edit' ? true : false
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
    console.log(this.taskform.touched)
    const formValue = this.taskform.value
    if(this.editMode){
      const task = new Task(formValue.taskName, formValue.description, formValue.list, new Date(formValue.date), this.id)
      this.taskService.editTask(task)
    } else {
      const task = new Task(formValue.taskName, formValue.description, formValue.list, new Date(formValue.date), this.taskService.getRandomNumber())
      this.taskService.addTask(task)
    }
  }

  closeTask() {
    if(this.editMode){
      this.taskService.taskSelected.next(null)
      this.taskService.closeTaskDetails()
    } else {
      this.location.back()
    }
  }

  deleteTask() {
    if(!this.editMode) return
    this.taskService.deleteTask(this.id)
    this.closeTask()
  }
}