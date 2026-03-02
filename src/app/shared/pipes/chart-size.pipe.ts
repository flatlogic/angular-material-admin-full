import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chartSize',
  standalone: true
})
export class ChartSizePipe implements PipeTransform {
  transform(value: unknown, fallback = '100%'): string {
    if (typeof value === 'number') {
      return `${value}px`;
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }

    return fallback;
  }
}
