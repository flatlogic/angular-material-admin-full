import {Component, Input, OnInit} from '@angular/core';
import {BarChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';
import {colors} from '../../../../../consts';

@Component({
  selector: 'app-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.scss']
})
export class GroupedBarChartComponent implements OnInit {
  @Input() groupedBarChartData: BarChartData;
  public apexGroupedBarChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

  public ngOnInit(): void {
    this.initChart();
  }

  public initChart(): void {
    this.apexGroupedBarChartOptions = {
      series: this.groupedBarChartData.series,
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      colors: [colors.BLUE,colors.GREEN],
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: this.groupedBarChartData.categories
      },
      legend: {
        show: false
      }
    };
  }
}
