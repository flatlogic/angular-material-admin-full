import {Component, Input, OnInit} from '@angular/core';
import { EChartsOption } from 'echarts';
import {PieChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';

import {colors} from '../../../../../consts';

@Component({
    selector: 'app-simple-pie-chart',
    templateUrl: './simple-pie-chart.component.html',
    styleUrls: ['./simple-pie-chart.component.scss'],
    standalone: false
})
export class SimplePieChartComponent implements OnInit {
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
      color: options?.colors ?? [colors.BLUE, colors.GREEN, colors.YELLOW, colors.VIOLET, colors.PINK],
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: '70%',
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
      series: [44, 55, 13, 43, 22],
      chart: {
        height: 350,
        type: 'pie',
      },
      colors: [colors.BLUE, colors.GREEN, colors.YELLOW, colors.VIOLET, colors.PINK],
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E']
    };
  }
}
