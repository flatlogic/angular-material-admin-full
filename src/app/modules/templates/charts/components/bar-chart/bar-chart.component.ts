import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { EChartsOption } from 'echarts';

import {ChartOptions} from '../../models/chart-options';
import { colors } from '../../../../../consts';
import {BarChartData} from '../../models/bar-chart-data';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    standalone: false
})
export class BarChartComponent implements OnChanges {
  private static readonly DEFAULT_COLORS = [colors.PINK];
  @Input() barChartData: BarChartData | null = null;
  @Input() currentTheme: string = '';
  public apexBarChartOptions: Partial<ChartOptions> | null = null;
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexBarChartOptions;
    if (!options) {
      return {};
    }

    const xaxis = options.xaxis as { categories?: Array<string | number> } | undefined;
    const categories = xaxis?.categories ?? [];
    const sourceSeries = (
      Array.isArray(options.series)
        ? options.series.filter((item) => typeof item === 'object' && item !== null)
        : []
    ) as Array<{ name?: string; data?: number[] }>;
    const series = sourceSeries.map((item) => ({
      type: 'bar',
      name: item.name ?? '',
      data: item.data ?? [],
      barMaxWidth: 28
    }));

    return {
      color: options.colors ?? BarChartComponent.DEFAULT_COLORS,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        top: 8,
        left: 8,
        right: 8,
        bottom: 8,
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: { show: false }
      },
      yAxis: {
        type: 'category',
        data: categories,
        axisTick: { show: false }
      },
      series
    } as EChartsOption;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['barChartData'] || changes['currentTheme']) {
      if (!this.hasChartData()) {
        this.apexBarChartOptions = null;
        return;
      }
      this.apexBarChartOptions = this.buildChartOptions();
    }
  }

  private buildChartOptions(): Partial<ChartOptions> {
    return {
      series: this.barChartData?.series ?? [],
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
        this.resolvePrimaryColor()
      ],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.barChartData?.categories ?? []
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
    return !!this.barChartData?.series?.length && !!this.barChartData?.categories?.length;
  }
}
