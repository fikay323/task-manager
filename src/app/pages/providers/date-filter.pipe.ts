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
        const date = new Date()
        return task.taskDueDate.getDate() === date.getDate() && task.taskDueDate.getMonth() === date.getMonth() && task.taskDueDate.getFullYear() === date.getFullYear()
      })
      return taskArray
    }
    return value;
  }

}
