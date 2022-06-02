import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import { VisitsChartData } from '../../models';
import { colors } from '../../../../consts';
import { ChartOptions } from '../../../templates/charts/models/chart-options';

@Component({
  selector: 'app-visits-chart',
  templateUrl: './visits-chart.component.html',
  styleUrls: ['./visits-chart.component.scss']
})
export class VisitsChartComponent implements OnChanges, AfterViewInit {
  @Input() visitsChartData: VisitsChartData;
  @Input() currentTheme: string;
  @ViewChild('chart') chart: ElementRef;

  // @ts-ignore
  public chartObj: ApexCharts;
  public colors: typeof colors = colors;
  public chartOptions: Partial<ChartOptions>;

  // tslint:disable-next-line:use-lifecycle-interface
  public ngOnInit(): void {
    this.initChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentTheme.currentValue && this.chartObj) {
      this.chartObj.updateOptions({
        fill: {
          colors: [
            this.currentTheme === 'blue'
              ? colors.BLUE
              : this.currentTheme === 'green'
              ? colors.GREEN
              : colors.PINK
          ]
        }
      });
    }
  }

  public ngAfterViewInit() {
    this.chartObj = new ApexCharts(
      this.chart.nativeElement,
      this.chartOptions
    );

    this.chartObj.render();
  }

  public initChart(): void {
    this.chartOptions = {
      series: [77],
      chart: {
        height: 130,
        width: 130,
        type: 'radialBar',
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -180,
          endAngle: 180,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
              formatter(val) {
                return val + '%';
              }
            },
            show: false
          }
        }
      },
      fill: {
        colors: [
          this.currentTheme === 'blue'
            ? colors.BLUE
            : this.currentTheme === 'green'
            ? colors.GREEN
            : colors.PINK
        ]
      },
      stroke: {
        dashArray: 3
      }
    };
  }
}
