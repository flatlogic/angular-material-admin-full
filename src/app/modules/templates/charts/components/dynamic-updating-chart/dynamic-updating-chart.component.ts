import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import {LineChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';

import {colors} from '../../../../../consts';


@Component({
    selector: 'app-dynamic-updating-chart',
    templateUrl: './dynamic-updating-chart.component.html',
    styleUrls: ['./dynamic-updating-chart.component.scss'],
    standalone: false
})
export class DynamicUpdatingChartComponent implements OnInit, OnChanges, OnDestroy {
  private static readonly DEFAULT_COLORS = [colors.PINK];
  @Input() dynamicUpdatingChartData: LineChartData;
  @Input() currentTheme: string;

  public apexDynamicUpdatingChartOptions: Partial<ChartOptions> = {};
  public colors: typeof colors = colors;
  public interval?: ReturnType<typeof setInterval>;

  public get echartsOptions(): EChartsOption {
    const options = this.apexDynamicUpdatingChartOptions;
    const xaxis = options?.xaxis as { categories?: Array<string | number> } | undefined;
    const categories = xaxis?.categories ?? [];
    const stroke = options?.stroke as { curve?: string } | undefined;
    const sourceSeries = (
      Array.isArray(options?.series)
        ? options.series.filter((item) => typeof item === 'object' && item !== null)
        : []
    ) as Array<{ name?: string; data?: number[] }>;
    const series = sourceSeries.map((item) => ({
      type: 'line',
      name: item.name ?? '',
      data: item.data ?? [],
      smooth: stroke?.curve === 'smooth',
      showSymbol: false,
      areaStyle: { opacity: 0.3 }
    }));

    return {
      color: options?.colors ?? DynamicUpdatingChartComponent.DEFAULT_COLORS,
      tooltip: { trigger: 'axis' },
      legend: { show: false },
      grid: {
        top: 16,
        left: 12,
        right: 12,
        bottom: 16,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: categories,
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series
    } as EChartsOption;
  }

  public ngOnInit(): void {
    this.initChart();
    this.interval = setInterval(() => this.updateChart(), 3000);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const currentThemeChange = changes['currentTheme'];
    if (currentThemeChange?.currentValue && this.apexDynamicUpdatingChartOptions) {
      this.apexDynamicUpdatingChartOptions = {
        ...this.apexDynamicUpdatingChartOptions,
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

  public ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
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
    };
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
