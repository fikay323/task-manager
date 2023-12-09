import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFilter',
  standalone: true
})
export class StringFilterPipe implements PipeTransform {

  transform(value: string, filter: string) {
    return null;
  }

}
