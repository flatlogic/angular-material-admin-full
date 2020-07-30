import { Injectable } from '@angular/core';
import {Observable, of, timer} from 'rxjs';

import {
  DashedLineChartData,
  HeatmapChartData,
  LineChartData,
  PieChartData, RadarChartData
} from '../models';
import {BarChartData} from '../models/bar-chart-data';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  public loadLineChartData(): Observable<LineChartData>{
    return of({
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z'
      ]
    });
  }

  public loadDynamicUpdatingChartData(): Observable<LineChartData>{
    return of({
      series: [
        {
          name: 'series1',
          data: [
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100)
          ]
        }
      ],
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z'
      ]
    }).pipe(delay(1000));
  }

  public loadBasicLineChartData(): Observable<LineChartData>{
    return of({
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep"
      ]
    });
  }
  public loadLineDataLabelsChartData(): Observable<LineChartData>{
    return of({
      series: [
        {
          name: "High - 2013",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
    });
  }


  public dashedLineChartData(): Observable<DashedLineChartData>{
    return of({
      series: [
        {
          name: 'Session Duration',
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: 'Page Views',
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: 'Total Visits',
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      categories: [
        '01 Jan',
        '02 Jan',
        '03 Jan',
        '04 Jan',
        '05 Jan',
        '06 Jan',
        '07 Jan',
        '08 Jan',
        '09 Jan',
        '10 Jan',
        '11 Jan',
        '12 Jan'
      ]
    });
  }

  public loadPieChartData(): Observable<PieChartData> {
    return of({
      series: [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ],
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E']
    });
  }

  public loadHeatmapChartData(): Observable<HeatmapChartData> {
    return of({
      series: [
        {
          name: 'Metric1',
          data: this.generateApexHeatmapChartData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric2',
          data: this.generateApexHeatmapChartData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric3',
          data: this.generateApexHeatmapChartData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric4',
          data: this.generateApexHeatmapChartData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric5',
          data: this.generateApexHeatmapChartData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric6',
          data: this.generateApexHeatmapChartData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric7',
          data: this.generateApexHeatmapChartData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric8',
          data: this.generateApexHeatmapChartData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Metric9',
          data: this.generateApexHeatmapChartData(18, {
            min: 0,
            max: 90
          })
        }
      ],
    });
  }

  private generateApexHeatmapChartData(count, yrange): number[] {
    let i = 0;
    const series = [];
    while (i < count) {
      const x = 'w' + (i + 1).toString();
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({x, y});
      i++;
    }
    return series;
  }

  public loadRadarChartData(): Observable<RadarChartData> {
    return of({
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20]
        }
      ],
      categories: ["January", "February", "March", "April", "May", "June"]
    });
  }

  public loadBarChartData(): Observable<BarChartData> {
    return of({
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany"
      ]
    });
  }

  public loadGroupedBarChartData(): Observable<BarChartData> {
    return of({
      series: [
        {
          name: '',
          data: [44, 55, 41, 64, 22, 43, 21]
        },
        {
          name: '',
          data: [53, 32, 33, 52, 13, 44, 32]
        }
      ],
      categories: ['2001', '2002', '2003', '2004', '2005', '2006', '2007']
    });
  }
}
