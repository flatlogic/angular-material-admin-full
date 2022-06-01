import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {LineChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';

import {colors} from '../../../../../consts';


@Component({
  selector: 'app-dynamic-updating-chart',
  templateUrl: './dynamic-updating-chart.component.html',
  styleUrls: ['./dynamic-updating-chart.component.scss']
})
export class DynamicUpdatingChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() dynamicUpdatingChartData: LineChartData;
  @Input() currentTheme: string;

  public apexDynamicUpdatingChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;
  public interval: any;

  @ViewChild('chart') chart: ElementRef;
  // @ts-ignore
  public chartObj: ApexCharts;

  public ngOnInit(): void {
    this.initChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentTheme && changes.currentTheme.currentValue && this.chartObj) {
      this.chartObj.updateOptions({
        colors: [
          changes.currentTheme.currentValue === 'blue'
            ? colors.BLUE
            : this.currentTheme === 'green'
            ? colors.GREEN
            : colors.PINK
        ],
      })
    }
  }

  public ngAfterViewInit() {
    // @ts-ignore
    this.chartObj = new ApexCharts(
      this.chart.nativeElement,
      this.apexDynamicUpdatingChartOptions
    )

    this.chartObj.render();

    this.interval = setInterval(() => this.updateChart(), 3000);
  }

  public updateChart(): void {
    this.apexDynamicUpdatingChartOptions = {
      ...this.apexDynamicUpdatingChartOptions,
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
      ]
    }

    this.chartObj.updateSeries(this.apexDynamicUpdatingChartOptions.series);
  }

  public initChart(): void {
    this.apexDynamicUpdatingChartOptions = {
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
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        this.currentTheme === 'blue'
          ? colors.BLUE
          : this.currentTheme === 'green'
          ? colors.GREEN
          : colors.PINK
      ],
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z'
        ]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    };
  }
}
