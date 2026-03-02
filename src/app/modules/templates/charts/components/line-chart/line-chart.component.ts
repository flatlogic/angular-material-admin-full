import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';

import { LineChartData } from '../../models';
import { colors } from '../../../../../consts';
import { ChartOptions } from '../../models/chart-options';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
    standalone: false
})
export class LineChartComponent implements OnChanges {
  private static readonly DEFAULT_COLORS = [colors.BLUE, colors.GREEN];
  @Input() lineChartData: LineChartData | null = null;
  public apexLineChartOptions: Partial<ChartOptions> | null = null;
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexLineChartOptions;
    if (!options) {
      return {};
    }

    const xaxis = options.xaxis as { categories?: Array<string | number> } | undefined;
    const categories = xaxis?.categories ?? [];
    const stroke = options.stroke as { curve?: string } | undefined;
    const sourceSeries = (
      Array.isArray(options.series)
        ? options.series.filter((item) => typeof item === 'object' && item !== null)
        : []
    ) as Array<{ name?: string; data?: number[] }>;
    const series = sourceSeries.map((item, index: number) => ({
      type: 'line',
      name: item.name ?? '',
      data: item.data ?? [],
      smooth: stroke?.curve === 'smooth',
      showSymbol: false,
      areaStyle: { opacity: index === 0 ? 0.3 : 0.18 }
    }));

    return {
      color: options.colors ?? LineChartComponent.DEFAULT_COLORS,
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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['lineChartData']) {
      if (!this.hasChartData()) {
        this.apexLineChartOptions = null;
        return;
      }
      this.apexLineChartOptions = this.buildChartOptions();
    }
  }

  private buildChartOptions(): Partial<ChartOptions> {
    return {
      series: this.lineChartData?.series ?? [],
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
      colors: [colors.BLUE, colors.GREEN],
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: this.lineChartData?.categories ?? []
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    };
  }

  private hasChartData(): boolean {
    return !!this.lineChartData?.series?.length && !!this.lineChartData?.categories?.length;
  }
}
