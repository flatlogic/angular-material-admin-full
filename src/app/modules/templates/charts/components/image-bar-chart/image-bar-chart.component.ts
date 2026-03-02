import {Component} from '@angular/core';
import { EChartsOption } from 'echarts';
import {ChartOptions} from '../../models/chart-options';

import {colors} from '../../../../../consts';

@Component({
    selector: 'app-image-bar-chart',
    templateUrl: './image-bar-chart.component.html',
    styleUrls: ['./image-bar-chart.component.scss'],
    standalone: false
})
export class ImageBarChartComponent {
  private static readonly DEFAULT_COLORS = [colors.BLUE];
  public apexImageBarChartOptions: Partial<ChartOptions> = this.buildChartOptions();
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexImageBarChartOptions;
    const xaxis = options?.xaxis as { categories?: Array<string | number> } | undefined;
    const categories = xaxis?.categories ?? [];
    const sourceSeries = (
      Array.isArray(options?.series)
        ? options.series.filter((item) => typeof item === 'object' && item !== null)
        : []
    ) as Array<{ name?: string; data?: number[] }>;
    const firstSeries = sourceSeries[0];

    return {
      color: options?.colors ?? ImageBarChartComponent.DEFAULT_COLORS,
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
        axisLabel: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          type: 'bar',
          name: firstSeries?.name ?? '',
          data: firstSeries?.data ?? [],
          barWidth: '85%'
        }
      ]
    } as EChartsOption;
  }

  private buildChartOptions(): Partial<ChartOptions> {
    const data = [
      2, 4, 3, 4, 3, 5, 5, 6.5, 6, 5, 4, 5, 8, 7, 7, 8, 8, 10, 9, 9, 12, 12,
      11, 12, 13, 14, 16, 14, 15, 17, 19, 21
    ];
    const categories = data.map((_, index) => `${index + 1}`);

    return {
      series: [
        {
          name: 'coins',
          data
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        animations: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '85%'
        },
      },
      colors: [colors.BLUE],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        colors: ["#fff"],
        width: 0.2
      },
      xaxis: {
        categories,
        labels: {
          show: false
        }
      },
      grid: {
        position: 'back'
      },
      yaxis: {
        show: false
      },
      fill: {
        type: 'image',
        image: {
          src: ['./assets/charts/12.jpg'],
          width: 400,
          height: 282
        }
      }
    };
  }
}
