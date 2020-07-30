import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin, {DayGridView} from '@fullcalendar/daygrid';
import {PluginDef} from '@fullcalendar/core/plugin-system';
import {colors, routes} from '../../../../../consts';
import {Calendar, EventApi, View} from '@fullcalendar/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DayInfoComponent} from '../../components/day-info/day-info.component';
import {NewDayEventComponent} from '../../components/new-day-event/new-day-event.component';
import {FullCalendarComponent} from '@fullcalendar/angular';

import timeGridPlugin from '@fullcalendar/timegrid';


import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import {take} from 'rxjs/operators';

enum CalendarViewsTypes {
  month = 'dayGridMonth',
  weeks = 'timeGridWeek',
  days = 'timeGridDay'
}

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar', { static: false }) public calendarComponent: FullCalendarComponent;
  @ViewChild('externalEvents', { static: false }) public externalEventsRef: ElementRef<HTMLElement>;

  public calendarApi: Calendar;
  public calendarViewTypes: typeof CalendarViewsTypes = CalendarViewsTypes;
  public calendarView: string = this.calendarViewTypes.month;

  private draggable: Draggable;
  public routes: typeof routes = routes;
  public colors: typeof colors = colors;
  public calendarPlugins: PluginDef[] = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  public currentEvent: EventApi;
  public eventForm: FormGroup;
  public currentDate: Date = new Date();
  public d = this.currentDate.getDate();
  public m = this.currentDate.getMonth();
  public y = this.currentDate.getFullYear();

  public events = [{
    title: 'All Day Event',
    start: new Date(this.y, this.m, 1),
    backgroundColor: colors.BLUE,
    textColor: '#fff',
    borderColor: 'transparent',
    description: 'Will be busy throughout the whole day'
  },
    {
      title: 'Long Event',
      start: new Date(this.y, this.m, this.d + 5),
      backgroundColor: colors.YELLOW,
      textColor: '#fff',
      borderColor: 'transparent',
      end: new Date(this.y, this.m, this.d + 7),
      description: 'This conference should be worse visiting'
    },
    {
      id: 999,
      title: 'Blah Blah Car',
      start: new Date(this.y, this.m, this.d - 3, 16, 0),
      backgroundColor: colors.YELLOW,
      textColor: '#fff',
      borderColor: 'transparent',
      allDay: false,
      description: 'Agree with this guy on arrival time'
    },
    {
      id: 1000,
      title: 'Buy this template',
      start: new Date(this.y, this.m, this.d + 3, 12, 0),
      allDay: false,
      backgroundColor: colors.GREEN,
      textColor: '#fff',
      borderColor: 'transparent',
      description: 'Make sure everything is consistent first'
    },
    {
      title: 'Got to school',
      start: new Date(this.y, this.m, this.d + 16, 12, 0),
      end: new Date(this.y, this.m, this.d + 16, 13, 0),
      backgroundColor: colors.GREEN,
      textColor: '#fff',
      borderColor: 'transparent',
      description: 'Time to go back'
    },
    {
      title: 'Study some Node',
      start: new Date(this.y, this.m, this.d + 18, 12, 0),
      end: new Date(this.y, this.m, this.d + 18, 13, 0),
      backgroundColor: colors.BLUE,
      textColor: '#fff',
      borderColor: 'transparent',
      description: 'Node.js is a platform built ' +
        'on Chrome\'s JavaScript runtime for easily' +
        ' building fast, scalable network applications.' +
        ' Node.js uses an event-driven, non-blocking' +
        ' I/O model that makes it lightweight and' +
        ' efficient, perfect for data-intensive real-time' +
        ' applications that run across distributed devices.'
    },
    {
      title: 'Click for Flatlogic',
      start: new Date(this.y, this.m, 28),
      end: new Date(this.y, this.m, 29),
      url: 'http://flatlogic.com/',
      backgroundColor: colors.PINK,
      textColor: '#fff',
      borderColor: 'transparent',
      description: 'Creative solutions'
    }];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: [null],
      start: [null],
      end: [null],
      allDay: [true]
    });
  }

  public ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
    this.draggable = new Draggable(this.externalEventsRef.nativeElement, {
      itemSelector: '.external-event',
      eventData: function (el: HTMLElement) {
        return {
          title: el.innerText,
          className: el.dataset['eventClass']
        };
      }
    });
  }


  public onDrop({ draggedEl }: {
    date: Date;
    dateStr: string;
    allDay: boolean;
    draggedEl: HTMLElement;
    jsEvent: MouseEvent;
    view: View;
  }): void {
    draggedEl.parentNode.removeChild(draggedEl);
  }

  public onSelect({ start, end, allDay }: {
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
    allDay: boolean;
    resource?: any;
    jsEvent: MouseEvent;
    view: View;
  }): void {
    this.eventForm.patchValue({
      start,
      end,
      allDay
    });
    this.openNewEventDialog();
  }

  public onEventClick({ event }: {
    el: HTMLElement;
    event: EventApi;
    jsEvent: MouseEvent;
    view: DayGridView;
  }): void {
    this.currentEvent = event;
    this.openDayInfoDialog(event);
  }

  public openDayInfoDialog(event: EventApi): void {
    this.dialog.open(DayInfoComponent, {
      width: '300px',
      data: {
        start: event.start,
        title: event._def.title,
        description: event._def.extendedProps.description
      }
    });
  }

  public openNewEventDialog(): void {
    const dialogRef = this.dialog.open(NewDayEventComponent, {
      data: {event: ''}
    });

    dialogRef.afterClosed()
      .pipe(
        take(1)
      )
      .subscribe((result: string) => {
        const title: string = result;
        const { start, end, allDay, backgroundColor, textColor } = this.eventForm.value;

        if (result && result.length !== 0) {
          this.calendarApi.addEvent({
            title,
            start,
            end,
            allDay,
            backgroundColor,
            textColor
          });
        }
      });
  }

  public changeCalendarView(view: string): void {
    this.calendarView = view;
    this.calendarApi.changeView(view);
  }

  public today(): void {
    this.calendarApi.today();
  }


  public prev(): void {
    this.calendarApi.prev();
  }

  public next(): void {
    this.calendarApi.next();
  }


}
