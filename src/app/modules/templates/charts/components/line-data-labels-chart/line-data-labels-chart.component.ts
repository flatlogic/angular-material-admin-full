import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { EChartsOption } from 'echarts';
import {LineChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';

import {colors} from '../../../../../consts';

@Component({
    selector: 'app-line-data-labels-chart',
    templateUrl: './line-data-labels-chart.component.html',
    styleUrls: ['./line-data-labels-chart.component.scss'],
    standalone: false
})
export class LineDataLabelsChartComponent implements OnChanges {
  private static readonly DEFAULT_COLORS = [colors.BLUE, colors.GREEN];
  @Input() lineDataLabelsChartData: LineChartData | null = null;
  @Input() currentTheme: string = '';
  public apexLineDataLabelsChartOptions: Partial<ChartOptions> | null = null;
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexLineDataLabelsChartOptions;
    if (!options) {
      return {};
    }

    const xaxis = options.xaxis as { categories?: Array<string | number> } | undefined;
    const categories = xaxis?.categories ?? [];
    const stroke = options.stroke as { curve?: string } | undefined;
    const markers = options.markers as { size?: number } | undefined;
    const dataLabels = options.dataLabels as { enabled?: boolean } | undefined;
    const sourceSeries = (
      Array.isArray(options.series)
        ? options.series.filter((item) => typeof item === 'object' && item !== null)
        : []
    ) as Array<{ name?: string; data?: number[] }>;
    const series = sourceSeries.map((item) => ({
      type: 'line',
      name: item.name ?? '',
      data: item.data ?? [],
      smooth: stroke?.curve === 'smooth',
      showSymbol: true,
      symbolSize: markers?.size ?? 4,
      label: { show: Boolean(dataLabels?.enabled) }
    }));

    return {
      color: options.colors ?? LineDataLabelsChartComponent.DEFAULT_COLORS,
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
        data: categories
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: { color: colors.LIGHT_BLUE }
        }
      },
      series
    } as EChartsOption;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['lineDataLabelsChartData'] || changes['currentTheme']) {
      if (!this.hasChartData()) {
        this.apexLineDataLabelsChartOptions = null;
        return;
      }
      this.apexLineDataLabelsChartOptions = this.buildChartOptions();
    }
  }

  private buildChartOptions(): Partial<ChartOptions> {
    return {
      series: this.lineDataLabelsChartData?.series ?? [],
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
            this.resolvePrimaryColor(),
            "transparent"
          ],
          opacity: 0.2
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: this.lineDataLabelsChartData?.categories ?? []
      },
      legend: {
        show: false
      }
    };
  }

  private resolvePrimaryColor(): string {
    if (this.currentTheme === 'blue') {
      return colors.BLUE;
    }
    if (this.currentTheme === 'green') {
      return colors.GREEN;
    }
    return colors.PINK;
  }

  private hasChartData(): boolean {
    return !!this.lineDataLabelsChartData?.series?.length && !!this.lineDataLabelsChartData?.categories?.length;
  }
}
