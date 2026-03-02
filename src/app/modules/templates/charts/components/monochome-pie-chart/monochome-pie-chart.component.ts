import {Component, Input, OnInit} from '@angular/core';
import { EChartsOption } from 'echarts';
import {PieChartData} from '../../models';

import { colors } from '../../../../../consts';
import {ChartOptions} from '../../models/chart-options';

@Component({
    selector: 'app-monochome-pie-chart',
    templateUrl: './monochome-pie-chart.component.html',
    styleUrls: ['./monochome-pie-chart.component.scss'],
    standalone: false
})
export class MonochomePieChartComponent implements OnInit {
  @Input() pieChartData: PieChartData;
  public apexPieChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexPieChartOptions;
    const labels = Array.isArray(options?.labels) ? options.labels : [];
    const values = Array.isArray(options?.series)
      ? options.series.filter((item): item is number => typeof item === 'number')
      : [];
    const theme = options?.theme as { monochrome?: { color?: string } } | undefined;
    const baseColor = theme?.monochrome?.color ?? colors.BLUE;
    const data = values.map((value: number, index: number) => ({
      value,
      name: labels[index] ?? `Item ${index + 1}`
    }));

    return {
      color: [baseColor],
      tooltip: { trigger: 'item' },
      legend: { show: false },
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
      series: [25, 15, 44, 55, 41, 17],
      chart: {
        height: '350',
        type: 'pie',
      },
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      theme: {
        monochrome: {
          enabled: true,
          color: this.colors.BLUE
        }
      },
      legend: {
        show: false
      },
      responsive: [
        {
          breakpoint: 576,
          options: {
            chart: {
              height: '150',
            },
          }
        }
      ]
    };
  }
}
