import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {ChartOptions} from '../../models/chart-options';
import { colors } from '../../../../../consts';
import {BarChartData} from '../../models/bar-chart-data';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() barChartData: BarChartData;
  @Input() currentTheme: string;
  @ViewChild('chart') chart: ElementRef;

  // @ts-ignore
  public chartObj: ApexCharts;
  public apexBarChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

  public ngOnInit(): void {
    this.initChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentTheme.currentValue && this.chartObj) {
      this.chartObj.updateOptions({
        colors: [
          changes.currentTheme.currentValue === 'blue'
            ? colors.BLUE
            : this.currentTheme === 'green'
            ? colors.GREEN
            : colors.PINK
        ]
      })
    }
  }

  public ngAfterViewInit() {
    // @ts-ignore
    this.chartObj = new ApexCharts(
      this.chart.nativeElement,
      this.apexBarChartOptions
    )

    this.chartObj.render();
  }

  public initChart(): void {
    this.apexBarChartOptions = {
      series: this.barChartData.series,
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: [
        this.currentTheme === 'blue'
          ? colors.BLUE
          : this.currentTheme === 'green'
          ? colors.GREEN
          : colors.PINK
      ],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.barChartData.categories
      }
    };
  }
}
