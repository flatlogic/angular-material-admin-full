import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { VisitsChartData } from '../../models';
import { colors } from '../../../../consts';
import { ChartOptions } from '../../../templates/charts/models/chart-options';
import { SettingsMenuComponent } from '../../../../shared/ui-elements';
import { ChartSizePipe } from '../../../../shared/pipes/chart-size.pipe';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
    selector: 'app-visits-chart',
    templateUrl: './visits-chart.component.html',
    styleUrls: ['./visits-chart.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      SettingsMenuComponent,
      ChartSizePipe,
      NgxEchartsModule,
    ]
})
export class VisitsChartComponent implements OnInit, OnChanges {
  @Input() visitsChartData: VisitsChartData;
  @Input() currentTheme: string;
  public colors: typeof colors = colors;
  public chartOptions: Partial<ChartOptions> = {};

  public get echartsOptions(): EChartsOption {
    const value = Array.isArray(this.chartOptions.series)
      ? Number((this.chartOptions.series as unknown[])[0] ?? 0)
      : 0;
    const fill = this.chartOptions.fill as { colors?: string[] } | undefined;
    const color = fill?.colors?.[0] ?? colors.PINK;

    return {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '65%'],
          min: 0,
          max: 100,
          radius: '100%',
          progress: {
            show: true,
            width: 8,
            roundCap: true,
            itemStyle: { color }
          },
          axisLine: {
            lineStyle: {
              width: 8,
              color: [[1, 'rgba(74, 74, 74, 0.14)']]
            }
          },
          pointer: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          detail: { show: false },
          data: [{ value }]
        }
      ]
    } as EChartsOption;
  }

  public ngOnInit(): void {
    this.initChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTheme']?.currentValue) {
      this.chartOptions = {
        ...this.chartOptions,
        fill: {
          colors: [
            this.currentTheme === 'blue'
              ? colors.BLUE
              : this.currentTheme === 'green'
              ? colors.GREEN
              : colors.PINK
          ]
        }
      };
    }
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
