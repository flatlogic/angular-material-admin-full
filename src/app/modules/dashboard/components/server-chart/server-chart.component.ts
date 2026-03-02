import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ServerChartData } from '../../models';
import {colors} from '../../../../consts';
import { MatCardModule } from '@angular/material/card';
import { SettingsMenuComponent } from '../../../../shared/ui-elements';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
    selector: 'app-server-chart',
    templateUrl: './server-chart.component.html',
    styleUrls: ['./server-chart.component.scss'],
    standalone: true,
    imports: [MatCardModule, SettingsMenuComponent, NgxEchartsModule]
})
export class ServerChartComponent implements OnInit {
  @Input() serverChartData: ServerChartData;
  public charts: EChartsOption[] = [];
  public serverDataTitles: string[];
  public colors: typeof colors = colors;

  public ngOnInit(): void {
    this.charts = [
      this.initChart(this.serverChartData.firstServerChartData, colors.PINK),
      this.initChart(this.serverChartData.secondServerChartData, colors.BLUE),
      this.initChart(this.serverChartData.thirdServerChartData, colors.YELLOW)
    ];

    this.serverDataTitles = [
      this.serverChartData.firstDataTitle,
      this.serverChartData.secondDataTitle,
      this.serverChartData.thirdDataTitle,
    ]
  }

  public initChart(data: number[], color: string): EChartsOption {
    return {
      color: [color],
      tooltip: { show: false },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      xAxis: {
        type: 'category',
        data: this.serverChartData.dates,
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false }
      },
      yAxis: {
        type: 'value',
        show: false,
        max: 50000
      },
      series: [
        {
          type: 'line',
          name: 'STOCK ABC',
          data,
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2 },
          areaStyle: { opacity: 0.3 }
        }
      ]
    } as EChartsOption;
  }
}
