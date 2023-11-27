import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userId'
})
export class UserIdPipe implements PipeTransform {

  transform(value: number): string {
    let result: string = '';

    if (value === 1) {
      result = 'admin';
    } else if (value === 2) {
      result = 'tester';
    } else {
      result = 'neznýmý uživatel';
    }

    return result;
  }

}
