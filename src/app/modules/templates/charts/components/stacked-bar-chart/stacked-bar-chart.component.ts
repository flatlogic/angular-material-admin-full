import {Component} from '@angular/core';
import { EChartsOption } from 'echarts';
import {ChartOptions} from '../../models/chart-options';

import {colors} from '../../../../../consts';

@Component({
    selector: 'app-stacked-bar-chart',
    templateUrl: './stacked-bar-chart.component.html',
    styleUrls: ['./stacked-bar-chart.component.scss'],
    standalone: false
})
export class StackedBarChartComponent {
  private static readonly DEFAULT_COLORS = [
    colors.GREEN,
    colors.BLUE,
    colors.PINK,
    colors.VIOLET,
    colors.YELLOW,
  ];
  public apexStackedBarChartOptions: Partial<ChartOptions> = this.buildChartOptions();
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexStackedBarChartOptions;
    const xaxis = options?.xaxis as { categories?: Array<string | number> } | undefined;
    const categories = xaxis?.categories ?? [];
    const sourceSeries = (
      Array.isArray(options?.series)
        ? options.series.filter((item) => typeof item === 'object' && item !== null)
        : []
    ) as Array<{ name?: string; data?: number[] }>;
    const series = sourceSeries.map((item) => ({
      type: 'bar',
      name: item.name ?? '',
      stack: 'total',
      data: item.data ?? [],
      barMaxWidth: 24
    }));

    return {
      color: options?.colors ?? StackedBarChartComponent.DEFAULT_COLORS,
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
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `${value}K`
        }
      },
      yAxis: {
        type: 'category',
        data: categories
      },
      series
    } as EChartsOption;
  }

  private buildChartOptions(): Partial<ChartOptions> {
    return {
      series: [{
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21]
      }, {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32]
      }, {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20]
      }, {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4]
      }, {
        name: 'Reborn Kid',
        data: [25, 12, 19, 32, 25, 24, 10]
      }],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: [colors.GREEN, colors.BLUE, colors.PINK, colors.VIOLET, colors.YELLOW],
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val) {
            return val + "K"
          }
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K"
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        show: false
      }
    };
  }
}
