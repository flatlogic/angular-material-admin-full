import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';

import { DashedLineChartData } from '../../models';
import {colors} from '../../../../../consts';
import { ChartOptions } from '../../models/chart-options';

@Component({
    selector: 'app-dashed-line-chart',
    templateUrl: './dashed-line-chart.component.html',
    styleUrls: ['./dashed-line-chart.component.scss'],
    standalone: false
})
export class DashedLineChartComponent implements OnChanges {
  private static readonly DEFAULT_COLORS = [colors.BLUE, colors.YELLOW, colors.PINK];
  @Input() dashedLineChartData: DashedLineChartData | null = null;
  public apexDashedLineChartOptions: Partial<ChartOptions> | null = null;
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexDashedLineChartOptions;
    if (!options) {
      return {};
    }

    const xaxis = options.xaxis as { categories?: Array<string | number> } | undefined;
    const categories = xaxis?.categories ?? [];
    const stroke = options.stroke as {
      dashArray?: number[];
      curve?: string;
      width?: number;
    } | undefined;
    const dashArray = Array.isArray(stroke?.dashArray) ? stroke.dashArray : [];
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
      lineStyle: {
        width: stroke?.width ?? 2,
        type: dashArray[index] ? 'dashed' : 'solid'
      }
    }));

    return {
      color: options.colors ?? DashedLineChartComponent.DEFAULT_COLORS,
      tooltip: { trigger: 'axis' },
      legend: { show: false },
      grid: {
        top: 16,
        left: 12,
        right: 12,
        bottom: 24,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: categories
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: colors.LIGHT_BLUE
          }
        }
      },
      series
    } as EChartsOption;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashedLineChartData']) {
      if (!this.hasChartData()) {
        this.apexDashedLineChartOptions = null;
        return;
      }
      this.apexDashedLineChartOptions = this.buildChartOptions();
    }
  }

  private buildChartOptions(): Partial<ChartOptions> {
    return {
      series: this.dashedLineChartData?.series ?? [],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      colors: [colors.BLUE, colors.YELLOW, colors.PINK],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: 'smooth',
        dashArray: [0, 8, 5]
      },
      legend: {
        show: false
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false,
          rotate: -45
        },
        categories: this.dashedLineChartData?.categories ?? [],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter(val) {
                return val + ' (mins)';
              }
            }
          },
          {
            title: {
              formatter(val) {
                return val + ' per session';
              }
            }
          },
          {
            title: {
              formatter(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: colors.LIGHT_BLUE
      }
    };
  }

  private hasChartData(): boolean {
    return !!this.dashedLineChartData?.series?.length && !!this.dashedLineChartData?.categories?.length;
  }
}
