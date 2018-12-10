import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'notDisclosed'})
export class NotDisclosedPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
        return value;
    } else {
        return 'Non communiqué';
    }
  }
}
