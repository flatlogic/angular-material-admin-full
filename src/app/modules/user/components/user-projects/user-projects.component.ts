import { Component } from '@angular/core';
import { ChartOptions } from '../../../templates/charts/models/chart-options';

import { colors } from '../../../../consts/colors';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent {
  public apexPieChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

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
