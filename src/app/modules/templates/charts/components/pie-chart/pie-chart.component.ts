import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

import { PieChartData } from '../../models';
import { colors } from '../../../../../consts';
import { ChartOptions } from '../../models/chart-options';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
    standalone: false
})
export class PieChartComponent implements OnInit {
  @Input() pieChartData: PieChartData;
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
      color: options?.colors ?? [colors.BLUE, colors.YELLOW, colors.PINK, colors.GREEN, colors.VIOLET],
      tooltip: { trigger: 'item' },
      legend: {
        show: true,
        bottom: 0
      },
      series: [
        {
          type: 'pie',
          radius: ['52%', '72%'],
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
      series: this.pieChartData.series,
      chart: {
        type: 'donut',
        height: 387
      },
      colors: [
        colors.BLUE,
        colors.YELLOW,
        colors.PINK,
        colors.GREEN,
        colors.VIOLET
      ],
      legend: {
        position: 'bottom',
        itemMargin: {
          horizontal: 5,
          vertical: 30
        },
      },
      labels: this.pieChartData.labels
    };
  }
}
