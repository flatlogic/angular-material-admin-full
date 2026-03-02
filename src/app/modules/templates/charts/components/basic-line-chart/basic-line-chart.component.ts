import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { EChartsOption } from 'echarts';
import {LineChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';

import { colors } from '../../../../../consts';

@Component({
    selector: 'app-basic-line-chart',
    templateUrl: './basic-line-chart.component.html',
    styleUrls: ['./basic-line-chart.component.scss'],
    standalone: false
})
export class BasicLineChartComponent implements OnChanges {
  private static readonly DEFAULT_COLORS = [colors.PINK];
  @Input() basicLineChartData: LineChartData | null = null;
  @Input() currentTheme: string = '';
  public apexBasicLineChartOptions: Partial<ChartOptions> | null = null;
  public colors: typeof colors = colors;

  public get echartsOptions(): EChartsOption {
    const options = this.apexBasicLineChartOptions;
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
    const series = sourceSeries.map((item) => ({
      type: 'line',
      name: item.name ?? '',
      data: item.data ?? [],
      smooth: stroke?.curve === 'smooth',
      showSymbol: false
    }));

    return {
      color: options.colors ?? BasicLineChartComponent.DEFAULT_COLORS,
      tooltip: { trigger: 'axis' },
      grid: {
        top: 16,
        left: 12,
        right: 12,
        bottom: 12,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: categories,
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false }
      },
      series
    } as EChartsOption;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['basicLineChartData'] || changes['currentTheme']) {
      if (!this.hasChartData()) {
        this.apexBasicLineChartOptions = null;
        return;
      }
      this.apexBasicLineChartOptions = this.buildChartOptions();
    }
  }

  private buildChartOptions(): Partial<ChartOptions> {
    return {
      series: this.basicLineChartData?.series ?? [],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        this.resolvePrimaryColor()
      ],
      stroke: {
        curve: "straight"
      },
      grid: {
        row: {
          colors: [
            this.resolvePrimaryColor(),
            "transparent"
          ],
          opacity: 0.2
        }
      },
      xaxis: {
        categories: this.basicLineChartData?.categories ?? []
      }
    };
  }

  private resolvePrimaryColor(): string {
    if (this.currentTheme === 'blue') {
      return colors.BLUE;
    }
    if (this.currentTheme === 'green') {
      return colors.GREEN;
    }
    return colors.PINK;
  }

  private hasChartData(): boolean {
    return !!this.basicLineChartData?.series?.length && !!this.basicLineChartData?.categories?.length;
  }
}
