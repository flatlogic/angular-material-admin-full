import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { EChartsOption } from 'echarts';
import {BarChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';
import {colors} from '../../../../../consts';

@Component({
    selector: 'app-grouped-bar-chart',
    templateUrl: './grouped-bar-chart.component.html',
    styleUrls: ['./grouped-bar-chart.component.scss'],
    standalone: false
})
export class GroupedBarChartComponent implements OnChanges {
  private static readonly DEFAULT_COLORS = [colors.BLUE, colors.GREEN];
  @Input() groupedBarChartData: BarChartData | null = null;
  public apexGroupedBarChartOptions: Partial<ChartOptions> | null = null;
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexGroupedBarChartOptions;
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
      label: {
        show: true,
        position: 'insideLeft',
        color: '#fff'
      },
      barMaxWidth: 24
    }));

    return {
      color: options.colors ?? GroupedBarChartComponent.DEFAULT_COLORS,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: { show: false },
      grid: {
        top: 12,
        left: 8,
        right: 8,
        bottom: 8,
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: categories
      },
      series
    } as EChartsOption;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupedBarChartData']) {
      if (!this.hasChartData()) {
        this.apexGroupedBarChartOptions = null;
        return;
      }
      this.apexGroupedBarChartOptions = this.buildChartOptions();
    }
  }

  private buildChartOptions(): Partial<ChartOptions> {
    return {
      series: this.groupedBarChartData?.series ?? [],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      colors: [colors.BLUE,colors.GREEN],
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: this.groupedBarChartData?.categories ?? []
      },
      legend: {
        show: false
      }
    };
  }

  private hasChartData(): boolean {
    return !!this.groupedBarChartData?.series?.length && !!this.groupedBarChartData?.categories?.length;
  }
}
