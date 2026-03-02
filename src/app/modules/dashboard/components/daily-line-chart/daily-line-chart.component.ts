import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { DailyLineChartData, TimeData } from '../../models';
import { colors } from '../../../../consts';
import { customTooltip } from '../../consts';
import { ChartOptions } from '../../../templates/charts/models/chart-options';
import { ChartSizePipe } from '../../../../shared/pipes/chart-size.pipe';
import { NgxEchartsModule } from 'ngx-echarts';

enum matSelectedFields {
  daily = 'Daily',
  weekly = 'Weekly',
  monthly = 'Monthly'
}

type LineSeriesItem = {
  type?: string;
  name?: string;
  data?: unknown[];
};

@Component({
    selector: 'app-daily-line-chart',
    templateUrl: './daily-line-chart.component.html',
    styleUrls: ['./daily-line-chart.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MatCardModule,
      MatSelectModule,
      ChartSizePipe,
      NgxEchartsModule,
    ]
})
export class DailyLineChartComponent implements OnInit, OnChanges {
  @Input() dailyLineChartData: DailyLineChartData;
  @Input() currentTheme: string;
  @Input() currentMode: string;
  public chartOptions: Partial<ChartOptions> = {};
  public matSelectFields: typeof matSelectedFields = matSelectedFields;
  public selectedMatSelectValue = matSelectedFields.monthly;
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.chartOptions;
    const labels = Array.isArray(options?.labels) ? options.labels : [];
    const strokeWidth = this.getNumberArray((options?.stroke as { width?: unknown } | undefined)?.width);
    const strokeCurve = this.getStringArray((options?.stroke as { curve?: unknown } | undefined)?.curve);
    const markerSizes = this.getNumberArray((options?.markers as { size?: unknown } | undefined)?.size);
    const sourceSeries = this.getSeriesArray(options?.series);
    const isStacked = (options?.chart as { stacked?: boolean } | undefined)?.['stacked'] ?? false;

    const series = sourceSeries.map((item: LineSeriesItem, index: number) => {
      const isArea = item.type === 'area';
      return {
        type: 'line',
        name: item.name ?? '',
        data: item.data ?? [],
        smooth: (strokeCurve[index] ?? strokeCurve[0]) === 'smooth',
        showSymbol: (markerSizes[index] ?? markerSizes[0] ?? 0) > 0,
        symbolSize: markerSizes[index] ?? markerSizes[0] ?? 0,
        lineStyle: { width: strokeWidth[index] ?? strokeWidth[0] ?? 2 },
        areaStyle: isArea ? { opacity: 0.35 } : undefined,
        stack: isStacked ? 'total' : undefined
      };
    });

    return {
      color: options?.colors ?? [colors.PINK, colors.LIGHT_BLUE, colors.YELLOW],
      tooltip: { trigger: 'axis' },
      legend: { show: false },
      grid: {
        top: 8,
        left: 12,
        right: 12,
        bottom: 16,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: labels,
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false }
      },
      series
    } as EChartsOption;
  }

  public ngOnInit(): void {
    this.initChart(this.dailyLineChartData.monthlyData, this.dailyLineChartData.labels);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTheme']?.currentValue && this.chartOptions?.series) {
      this.updateChartOptions();
    }
    if (changes['currentMode']?.currentValue && this.chartOptions?.series) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions(): void {
    this.chartOptions = {
      ...this.chartOptions,
      colors: [
        this.currentTheme === 'blue'
          ? colors.BLUE
          : this.currentTheme === 'green'
          ? colors.GREEN
          : colors.PINK,
        this.currentMode === 'dark'
          ? colors.DARK_BLUE
          : colors.LIGHT_BLUE,
        colors.YELLOW
      ]
    };
  }

  public initChart(data: TimeData, labels: string[]): void {
    this.chartOptions = {
      legend: {
        show: false
      },
      markers: {
        size: [0, 0, 5]
      },
      series: [
        {
          name: 'Mobile',
          type: 'line',
          data: data.mobile,
        },
        {
          name: 'Desktop',
          type: 'area',
          data: data.desktop
        },
        {
          name: 'Tablet',
          type: 'line',
          data: data.tablet
        }
      ],
      colors: [
        this.currentTheme === 'blue'
          ? colors.BLUE
          : this.currentTheme === 'green'
          ? colors.GREEN
          : colors.PINK,
        colors.LIGHT_BLUE,
        colors.YELLOW
      ],
      chart: {
        toolbar: {
          show: false
        },
        height: 350,
        width: '100%',
        type: 'line',
        stacked: true
      },
      stroke: {
        width: [2, 0, 2],
        curve: ['smooth', 'smooth', 'straight']
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          }
        },
      },
      fill: {
        opacity: 1,
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels,
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#4A4A4A',
            fontSize: '0.875rem',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            colors: '#4A4A4A',
            fontSize: '0.875rem',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
        },
      },
      tooltip: {
        custom: () => customTooltip
      }
    };
  };

  public changedMatSelectionValue() {
    switch (this.selectedMatSelectValue) {
      case matSelectedFields.daily:
        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: 'Mobile',
              type: 'line',
              data: this.dailyLineChartData.dailyData.mobile,
            },
            {
              name: 'Desktop',
              type: 'area',
              data: this.dailyLineChartData.dailyData.desktop,
            },
            {
              name: 'Tablet',
              type: 'line',
              data: this.dailyLineChartData.dailyData.tablet,
            }
          ]
        };
        break;
      case matSelectedFields.weekly:
        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: 'Mobile',
              type: 'line',
              data: this.dailyLineChartData.weeklyData.mobile,
            },
            {
              name: 'Desktop',
              type: 'area',
              data: this.dailyLineChartData.weeklyData.desktop,
            },
            {
              name: 'Tablet',
              type: 'line',
              data: this.dailyLineChartData.weeklyData.tablet,
            }
          ]
        };
        break;
      default:
        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: 'Mobile',
              type: 'line',
              data: this.dailyLineChartData.monthlyData.mobile,
            },
            {
              name: 'Desktop',
              type: 'area',
              data: this.dailyLineChartData.monthlyData.desktop,
            },
            {
              name: 'Tablet',
              type: 'line',
              data: this.dailyLineChartData.monthlyData.tablet,
            }
          ]
        };
    }
  }

  private getNumberArray(value: unknown): number[] {
    if (!Array.isArray(value)) {
      return [];
    }
    return value.filter((item): item is number => typeof item === 'number');
  }

  private getStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) {
      return [];
    }
    return value.filter((item): item is string => typeof item === 'string');
  }

  private getSeriesArray(value: unknown): LineSeriesItem[] {
    if (!Array.isArray(value)) {
      return [];
    }
    return value.filter(
      (item): item is LineSeriesItem =>
        typeof item === 'object' && item !== null,
    );
  }
}
