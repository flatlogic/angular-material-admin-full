import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {colors, routes} from '../../../../../consts';
import {Calendar, CalendarOptions, DateSelectArg, EventApi, EventClickArg} from '@fullcalendar/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DayInfoComponent} from '../../components/day-info/day-info.component';
import {NewDayEventComponent} from '../../components/new-day-event/new-day-event.component';
import {FullCalendarComponent} from '@fullcalendar/angular';

import timeGridPlugin from '@fullcalendar/timegrid';


import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import {take} from 'rxjs';

enum CalendarViewsTypes {
  month = 'dayGridMonth',
  weeks = 'timeGridWeek',
  days = 'timeGridDay'
}

type CalendarEventFormControls = {
  title: FormControl<string | null>;
  start: FormControl<Date | null>;
  end: FormControl<Date | null>;
  allDay: FormControl<boolean>;
  backgroundColor: FormControl<string | null>;
  textColor: FormControl<string | null>;
};

@Component({
    selector: 'app-calendar-page',
    templateUrl: './calendar-page.component.html',
    styleUrls: ['./calendar-page.component.scss'],
    standalone: false
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
  public calendarOptions: CalendarOptions = {};
  public currentEvent: EventApi;
  public eventForm!: FormGroup<CalendarEventFormControls>;
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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.eventForm = new FormGroup<CalendarEventFormControls>({
      title: new FormControl<string | null>(null),
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
      allDay: new FormControl<boolean>(true, { nonNullable: true }),
      backgroundColor: new FormControl<string | null>(null),
      textColor: new FormControl<string | null>(null),
    });

    this.calendarOptions = {
      initialView: this.calendarViewTypes.month,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      droppable: true,
      selectable: true,
      editable: true,
      headerToolbar: false,
      drop: this.onDrop.bind(this),
      select: this.onSelect.bind(this),
      eventClick: this.onEventClick.bind(this),
    };
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


  public onDrop({ draggedEl }: { draggedEl: HTMLElement }): void {
    if (draggedEl.parentNode) {
      draggedEl.parentNode.removeChild(draggedEl);
    }
  }

  public onSelect({ start, end, allDay }: DateSelectArg): void {
    this.eventForm.patchValue({
      start,
      end,
      allDay
    });
    this.openNewEventDialog();
  }

  public onEventClick({ event }: EventClickArg): void {
    this.currentEvent = event;
    this.openDayInfoDialog(event);
  }

  public openDayInfoDialog(event: EventApi): void {
    this.dialog.open(DayInfoComponent, {
      width: '300px',
      data: {
        start: event.start,
        title: event.title,
        description: event.extendedProps['description']
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
        const { start, end, allDay, backgroundColor, textColor } = this.eventForm.getRawValue();

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
