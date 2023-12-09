import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

@Pipe({
  name: 'stringFilter',
  standalone: true
})
export class StringFilterPipe implements PipeTransform {

  transform(value: Task[], filter: string): Task[] {
    let taskArray: Task[] = []
    taskArray = value.filter((task) => {
      return task.taskList === filter
    })
    taskArray.sort((a, b) => {
      const date1 = a.taskDueDate
      const date2 = b.taskDueDate
      return date1.getTime() - date2.getTime()
    })
    return taskArray;
  }
}
