import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

import {colors} from '../../../../../consts';
import {ChartOptions} from '../../models/chart-options';

@Component({
    selector: 'app-update-pie-chart',
    templateUrl: './update-pie-chart.component.html',
    styleUrls: ['./update-pie-chart.component.scss'],
    standalone: false
})
export class UpdatePieChartComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> = {};
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.chartOptions;
    const values: number[] = this.getNumericSeries();
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const data = values.map((value: number, index: number) => ({
      value,
      name: labels[index] ?? `Item ${index + 1}`
    }));

    return {
      color: options?.colors ?? [colors.BLUE, colors.PINK, colors.YELLOW, colors.GREEN],
      tooltip: { trigger: 'item' },
      legend: {
        show: true,
        orient: 'vertical',
        right: 0,
        top: 'middle'
      },
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
    this.chartOptions = {
      series: [44, 55, 13, 33],
      chart: {
        height: 350,
        type: 'donut',
      },
      colors: [this.colors.BLUE, this.colors.PINK, this.colors.YELLOW, this.colors.GREEN],
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      }
    };
  }

  public appendData(): void {
    const series = this.getNumericSeries();
    series.push(Math.floor(Math.random() * 100) + 1);
    this.chartOptions = {
      ...this.chartOptions,
      series
    };
  }

  public removeData(): void {
    const series = this.getNumericSeries();
    series.pop();
    this.chartOptions = {
      ...this.chartOptions,
      series
    };
  }

  public randomize(): void {
    const current = this.getNumericSeries();
    this.chartOptions = {
      ...this.chartOptions,
      series: current.map(() => Math.floor(Math.random() * 100) + 1)
    };
  }

  public reset(): void {
    this.chartOptions = {
      ...this.chartOptions,
      series: [44, 55, 13, 33]
    };
  }

  private getNumericSeries(): number[] {
    if (!Array.isArray(this.chartOptions.series)) {
      return [];
    }

    const series = this.chartOptions.series as unknown[];
    return series.filter((item): item is number => typeof item === 'number');
  }
}
