import {Component, Input, OnInit} from '@angular/core';
import {PieChartData} from '../../models';

import { colors } from '../../../../../consts';
import {ChartOptions} from '../../models/chart-options';

@Component({
  selector: 'app-monochome-pie-chart',
  templateUrl: './monochome-pie-chart.component.html',
  styleUrls: ['./monochome-pie-chart.component.scss']
})
export class MonochomePieChartComponent implements OnInit {
  @Input() pieChartData: PieChartData;
  public apexPieChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

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
