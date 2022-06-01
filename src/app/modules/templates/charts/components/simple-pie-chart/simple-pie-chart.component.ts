import {Component, Input, OnInit} from '@angular/core';
import {PieChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';

import {colors} from '../../../../../consts';

@Component({
  selector: 'app-simple-pie-chart',
  templateUrl: './simple-pie-chart.component.html',
  styleUrls: ['./simple-pie-chart.component.scss']
})
export class SimplePieChartComponent implements OnInit {
  @Input() pieChartData: PieChartData;
  public apexPieChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

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
