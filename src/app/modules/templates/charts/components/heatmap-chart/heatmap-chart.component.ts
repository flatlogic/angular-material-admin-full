import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';

import { HeatmapChartData } from '../../models';
import { colors } from '../../../../../consts';
import { ChartOptions } from '../../models/chart-options';

@Component({
    selector: 'app-heatmap-chart',
    templateUrl: './heatmap-chart.component.html',
    styleUrls: ['./heatmap-chart.component.scss'],
    standalone: false
})
export class HeatmapChartComponent implements OnInit, OnChanges {
  private static readonly DEFAULT_COLORS = [colors.PINK];
  @Input() heatmapChartData: HeatmapChartData;
  @Input() currentTheme: string;

  public apexHeatmapChartOptions: Partial<ChartOptions> = {};

  public get echartsOptions(): EChartsOption {
    const options = this.apexHeatmapChartOptions;
    const rawSeries = (
      Array.isArray(options?.series)
        ? options.series.filter((item) => typeof item === 'object' && item !== null)
        : []
    ) as Array<{ name?: string; data?: Array<{ x?: string | number; y?: number; value?: number }> }>;
    const firstSeriesData = Array.isArray(rawSeries[0]?.data) ? rawSeries[0].data : [];
    const xLabels = firstSeriesData.map((item) => item.x ?? '');
    const yLabels = rawSeries.map((item) => item.name ?? '');
    const data: [number, number, number][] = [];

    rawSeries.forEach((seriesItem, yIndex: number) => {
      (seriesItem.data ?? []).forEach((point, xIndex: number) => {
        data.push([xIndex, yIndex, Number(point.y ?? point.value ?? 0)]);
      });
    });

    return {
      color: options?.colors ?? HeatmapChartComponent.DEFAULT_COLORS,
      tooltip: {
        position: 'top',
        formatter: (params: unknown) => {
          const dataPoint =
            typeof params === 'object' &&
            params !== null &&
            Array.isArray((params as { data?: unknown }).data)
              ? ((params as { data: unknown[] }).data as [number, number, number])
              : [0, 0, 0];
          return `${yLabels[dataPoint[1]]}: ${dataPoint[2]}`;
        }
      },
      grid: {
        top: 20,
        right: 8,
        bottom: 20,
        left: 48
      },
      xAxis: {
        type: 'category',
        data: xLabels,
        splitArea: { show: true }
      },
      yAxis: {
        type: 'category',
        data: yLabels,
        splitArea: { show: true }
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: false,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        inRange: {
          color: ['rgba(255,255,255,0.08)', (options?.colors ?? HeatmapChartComponent.DEFAULT_COLORS)[0]]
        }
      },
      series: [
        {
          type: 'heatmap',
          data,
          label: { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: 8,
              shadowColor: 'rgba(0, 0, 0, 0.35)'
            }
          }
        }
      ]
    } as EChartsOption;
  }

  public ngOnInit(): void {
    this.initChart()
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const currentThemeChange = changes['currentTheme'];
    if (currentThemeChange?.currentValue && this.apexHeatmapChartOptions) {
      this.apexHeatmapChartOptions = {
        ...this.apexHeatmapChartOptions,
        colors: [
          currentThemeChange.currentValue === 'blue'
            ? colors.BLUE
            : this.currentTheme === 'green'
            ? colors.GREEN
            : colors.PINK
        ],
      };
    }
  }

  public initChart(): void {
    this.apexHeatmapChartOptions = {
      series: this.heatmapChartData.series,
      chart: {
        height: 350,
        type: 'heatmap',
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
      xaxis: {
        labels: {
          rotate: 0
        }
      }
    };
  }
}
