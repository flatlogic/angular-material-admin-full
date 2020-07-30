import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {LineChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';

import {colors} from '../../../../../consts';

@Component({
  selector: 'app-line-data-labels-chart',
  templateUrl: './line-data-labels-chart.component.html',
  styleUrls: ['./line-data-labels-chart.component.scss']
})
export class LineDataLabelsChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() lineDataLabelsChartData: LineChartData;
  @Input() currentTheme: string;
  @ViewChild('chart') chart: ElementRef;

  // @ts-ignore
  public chartObj: ApexCharts;
  public apexLineDataLabelsChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

  public ngOnInit(): void {
    this.initChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentTheme.currentValue && this.chartObj) {
      this.chartObj.updateOptions({
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
      this.apexLineDataLabelsChartOptions
    )

    this.chartObj.render();
  }

  public initChart(): void {
    this.apexLineDataLabelsChartOptions = {
      series: this.lineDataLabelsChartData.series,
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: [
        colors.BLUE,
        colors.GREEN
      ],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      grid: {
        borderColor: colors.LIGHT_BLUE,
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
      markers: {
        size: 1
      },
      xaxis: {
        categories: this.lineDataLabelsChartData.categories
      },
      legend: {
        show: false
      }
    };
  }
}
