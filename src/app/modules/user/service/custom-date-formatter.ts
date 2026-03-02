import {Injectable} from '@angular/core';
import {CalendarDateFormatter, DateFormatterParams} from 'angular-calendar';
import {DatePipe} from '@angular/common';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // Override methods from the parent formatter as needed.

  public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEEEE', locale) ?? '';
  }

  // public monthViewTitle({ date, locale }: DateFormatterParams): string {
  //   return new DatePipe(locale).transform(date, 'MMM y', locale);
  // }
}
