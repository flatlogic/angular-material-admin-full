import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartOptions} from '../../../templates/charts/models/chart-options';

import {colors} from '../../../../consts';
import {CalendarDateFormatter} from 'angular-calendar';
import {CustomDateFormatter} from '../../service';
import {routes} from '../../../../consts';
import {SharedService} from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class ProfilePageComponent implements OnInit, OnChanges {
  public apexPieChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;
  public viewDate: Date = new Date();
  public routes: typeof routes = routes;
  public chart: Partial<ChartOptions>;
  public currentDate: Date = new Date();
  public d = this.currentDate.getDate();
  public m = this.currentDate.getMonth();
  public y = this.currentDate.getFullYear();
  public NOW: Date = new Date();
  public calendarEvents: any[] = [
    {
      id: 1,
      color: {
        primary: colors.BLUE,
      },
      start: new Date(this.NOW.getFullYear(), this.NOW.getMonth(), 2),
      draggable: false,
      allDay: true
    },
    {
      id: 2,
      color: {
        primary: colors.YELLOW,
      },
      start: new Date(this.NOW.getFullYear(), this.NOW.getMonth(), 5),
      draggable: false,
      allDay: true
    },
    {
      id: 3,
      color: {
        primary: colors.GREEN,
      },
      start: new Date(this.NOW.getFullYear(), this.NOW.getMonth(), 18),
      draggable: false,
      allDay: true
    },
    {
      id: 4,
      color: {
        primary: colors.PINK,
      },
      start: new Date(this.NOW.getFullYear(), this.NOW.getMonth(), 28),
      draggable: false,
      allDay: true,
      actions: [{
        label: 'action',
        onClick: () => {
          if (Boolean(document)) {
            const a: HTMLAnchorElement = document.createElement('a');
            a.href = 'http://www.flatlogic.com';
            a.target = '_blank';
            a.click();
            a.remove();
          }
        }
      }]
    }
  ];
  public isDarkMode = false;

  constructor(private service: SharedService) {
  }

  public ngOnInit(): void {
    this.initChart();

    this.chart = this.initChart2([91200, 95900, 92300, 96200, 93100, 95500, 94750], colors.PINK);

    this.service.currentMode.subscribe((mode: string) => {
      this.isDarkMode = mode === 'dark';
    });
  }

  public initChart2(data: number[], color: string): Partial<ChartOptions> {
    return  {
      series: [
        {
          name: 'STOCK ABC',
          data
        }
      ],
      chart: {
        type: 'area',
        height: 100,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'solid',
        opacity: 0.3
      },
      colors: [color],
      labels:  [
        '13 Nov 2020',
        '14 Nov 2020',
        '15 Nov 2020',
        '16 Nov 2020',
        '17 Nov 2020',
        '18 Nov 2020',
        '19 Nov 2020',
      ],
      xaxis: {
        type: 'datetime',
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        opposite: true,
        show: false
      },
      legend: {
        horizontalAlign: 'left',
        show: false
      },
      grid: {
        show: false,
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        }
      },
    };
  }

  public initChart(): void {
    this.apexPieChartOptions = {
      series: [44, 55, 13, 43],
      chart: {
        type: 'donut',
        height: 110,
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        colors.BLUE,
        colors.YELLOW,
        colors.GREEN,
        colors.PINK
      ],
      legend: {
        position: 'right',
        offsetY: -15,
        itemMargin: {
          horizontal: 5,
          vertical: 2
        },
      },
      labels: ['New', 'In Progress', 'Completed', 'Canceled'],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentMode && changes.currentMode.currentValue) {
      this.isDarkMode = changes.currentMode.currentValue;
    }
  }

}
