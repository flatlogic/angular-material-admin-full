import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ChartOptions } from '../../../templates/charts/models/chart-options';

import { colors } from '../../../../consts/colors';

@Component({
    selector: 'app-user-projects',
    templateUrl: './user-projects.component.html',
    styleUrls: ['./user-projects.component.scss'],
    standalone: false
})
export class UserProjectsComponent {
  public apexPieChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexPieChartOptions;
    const labels = Array.isArray(options?.labels) ? options.labels : [];
    const values = Array.isArray(options?.series)
      ? options.series.filter((item): item is number => typeof item === 'number')
      : [];
    const data = values.map((value: number, index: number) => ({
      value,
      name: labels[index] ?? `Item ${index + 1}`
    }));

    return {
      color: options?.colors ?? [colors.BLUE, colors.YELLOW, colors.GREEN, colors.PINK],
      tooltip: { trigger: 'item' },
      legend: { show: false },
      series: [
        {
          type: 'pie',
          radius: ['50%', '72%'],
          data,
          label: { show: false }
        }
      ]
    } as EChartsOption;
  }

  public ngOnInit(): void {
    this.initChart();
  }

  public initChart(): void {
    this.apexPieChartOptions = {
      series: [44, 55, 13, 43],
      chart: {
        type: 'donut',
        height: 130
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        colors.BLUE,
        colors.YELLOW,
        colors.GREEN,
        colors.PINK
      ],
      legend: {
        show: false
      },
      responsive: [{
        breakpoint: 576,
        options: {
          legend: {
            position: 'right',
          },
        },
      }],
      labels: ['New', 'Progress', 'Completed', 'Canceled'],
    };
  }
}
