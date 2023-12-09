import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFilter',
  standalone: true
})
export class StringFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
