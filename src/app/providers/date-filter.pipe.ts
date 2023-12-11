import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

@Pipe({
  name: 'dateFilter',
  standalone: true
})
export class DateFilterPipe implements PipeTransform {

  transform(value: Task[], propertyToBeFiltered: string): Task[] {
    if(propertyToBeFiltered === 'currentDate') {
      let taskArray: Task[] = []
      taskArray = value.filter((task) => {
        const taskDate = new Date(task.taskDueDate)
        const date = new Date()
        return taskDate.getDate() === date.getDate() && taskDate.getMonth() === date.getMonth() && taskDate.getFullYear() === date.getFullYear()
      })
      return taskArray
    }
    if(propertyToBeFiltered === 'upcoming') {
      let taskArray: Task[] = []
      const date = new Date()
      taskArray = value.filter((task) => {
        return new Date(task.taskDueDate) > date
      })
      taskArray.sort((a, b) => {
        const date1 = new Date(a.taskDueDate)
        const date2 = new Date(b.taskDueDate)
        return date1.getTime() - date2.getTime()
      })
      return taskArray
    }
    return value;
  }

}
