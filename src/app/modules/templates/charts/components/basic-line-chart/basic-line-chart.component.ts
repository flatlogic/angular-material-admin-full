import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {LineChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';

import { colors } from '../../../../../consts';

@Component({
  selector: 'app-basic-line-chart',
  templateUrl: './basic-line-chart.component.html',
  styleUrls: ['./basic-line-chart.component.scss']
})
export class BasicLineChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() basicLineChartData: LineChartData;
  @Input() currentTheme: string;
  @ViewChild('chart') chart: ElementRef;

  // @ts-ignore
  public chartObj: ApexCharts;
  public apexBasicLineChartOptions: Partial<ChartOptions>;
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
        ],
        grid: {
          row: {
            colors: [
              this.currentTheme === 'blue'
                ? colors.BLUE
                : this.currentTheme === 'green'
                ? colors.GREEN
                : colors.PINK,
              "transparent"
            ],
            opacity: 0.2
          }
        }
      })
    }
  }

  public ngAfterViewInit() {
    // @ts-ignore
    this.chartObj = new ApexCharts(
      this.chart.nativeElement,
      this.apexBasicLineChartOptions
    )

    this.chartObj.render();
  }

  public initChart(): void {
    this.apexBasicLineChartOptions = {
      series: this.basicLineChartData.series,
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
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
        curve: "straight"
      },
      grid: {
        row: {
          colors: [
            this.currentTheme === 'blue'
              ? colors.BLUE
              : this.currentTheme === 'green'
              ? colors.GREEN
              : colors.PINK,
            "transparent"
          ],
          opacity: 0.2
        }
      },
      xaxis: {
        categories: this.basicLineChartData.categories
      }
    };
  }
}
