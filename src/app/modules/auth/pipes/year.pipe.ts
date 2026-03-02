import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'year',
    standalone: true
})
export class YearPipe implements PipeTransform {
  private readonly datePipe = new DatePipe('en-US');

  transform(value: Date | string | number | null | undefined): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    return this.datePipe.transform(value, 'y');
  }
}
