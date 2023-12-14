import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { TasksService } from '../../../providers/Tasks.service';
import { Task } from 'src/app/shared/task.model';
import { DataStorageService } from 'src/app/providers/data-storage.service';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.css']
})
export class TasksEditComponent implements OnInit {
  @ViewChild('taskForm') taskForm: any
  id: number
  editMode: boolean = false
  task: Task | undefined
  fireId: string

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TasksService, private location: Location, private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.taskService.screenWidth.next(window.innerWidth)
    this.route.params.subscribe((params: Params)=> {
      this.id = +params['id']
      this.editMode = params['name'] === 'edit' ? true : false
      if(this.editMode){
        const task = this.taskService.getTask(this.id)
        const date = new Date(task?.taskDueDate)
        this.fireId = task.fireId
        const formattedDate = `${date?.getFullYear()}-${(date?.getMonth() ?? 0) + 1}-${this.padTo2Digits(date?.getDate())}`;
        setTimeout(() => {
          this.taskForm.setValue({
            taskName: task?.taskName,
            description: task?.taskDescription,
            list: task?.taskList,
            date: formattedDate,
          })
        });
      }
    })
  }

  padTo2Digits(num: any) {
    return num?.toString().padStart(2, '0');
  }

  submitForm() {
    const formValue = this.taskForm.value
    if(this.editMode){
      const task = new Task(formValue.taskName, formValue.description, formValue.list, new Date(formValue.date), this.id, this.fireId)
      this.taskService.editTask(task)
      this.dataStorageService.updateTask(task).subscribe()
    } else {
      this.dataStorageService.addTaskToDatabase(formValue.taskName, formValue.description, formValue.list, new Date(formValue.date), this.taskService.getRandomNumber())
      this.router.navigate(['tasks', formValue.list])
    }
  }

  closeTask() {
   this.location.back()
  }

  deleteTask() {
    if(!this.editMode) return
    this.taskService.deleteTask(this.id)
    this.dataStorageService.deleteTask(this.fireId).then(() => {
      this.closeTask()
    })
  }
}