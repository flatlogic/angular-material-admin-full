import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { RadarChartData } from '../../models';

import { colors } from '../../../../../consts';
import { ChartOptions } from '../../models/chart-options';

@Component({
    selector: 'app-radar-chart',
    templateUrl: './radar-chart.component.html',
    styleUrls: ['./radar-chart.component.scss'],
    standalone: false
})
export class RadarChartComponent implements OnInit, OnChanges {
  private static readonly DEFAULT_COLORS = [colors.PINK];
  @Input() radarChartData: RadarChartData;
  @Input() currentTheme: string;

  public apexRadarChartOptions: Partial<ChartOptions> = {};
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexRadarChartOptions;
    const xaxis = options?.xaxis as { categories?: Array<string | number> } | undefined;
    const categories = xaxis?.categories ?? [];
    const sourceSeries = (
      Array.isArray(options?.series)
        ? options.series.filter((item) => typeof item === 'object' && item !== null)
        : []
    ) as Array<{ name?: string; data?: number[] }>;
    const maxValue = Math.max(
      ...sourceSeries.flatMap((item) =>
        (item.data ?? []).map((value: number) => Number(value)),
      ),
      100
    );
    const indicator = categories.map((name: string | number) => ({ name: String(name), max: maxValue }));
    const series = sourceSeries.map((item) => ({
      type: 'radar',
      name: item.name ?? '',
      data: [
        {
          value: item.data ?? [],
          name: item.name ?? ''
        }
      ],
      areaStyle: { opacity: 0.25 }
    }));

    return {
      color: options?.colors ?? RadarChartComponent.DEFAULT_COLORS,
      tooltip: { trigger: 'item' },
      legend: { show: false },
      radar: {
        indicator
      },
      series
    } as EChartsOption;
  }

  public ngOnInit(): void {
    this.initChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const currentThemeChange = changes['currentTheme'];
    if (currentThemeChange?.currentValue && this.apexRadarChartOptions) {
      this.apexRadarChartOptions = {
        ...this.apexRadarChartOptions,
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
    this.apexRadarChartOptions = {
      series: this.radarChartData.series,
      chart: {
        height: 350,
        type: "radar",
        toolbar: {
          show: false
        }
      },
      colors: [
        this.currentTheme === 'blue'
          ? colors.BLUE
          : this.currentTheme === 'green'
          ? colors.GREEN
          : colors.PINK
      ],
      xaxis: {
        categories: this.radarChartData.categories
      }
    };
  }
}
