import {Component, Input, OnInit} from '@angular/core';
import {BarChartData} from '../../models';
import {ChartOptions} from '../../models/chart-options';

import {colors} from '../../../../../consts';

@Component({
  selector: 'app-image-bar-chart',
  templateUrl: './image-bar-chart.component.html',
  styleUrls: ['./image-bar-chart.component.scss']
})
export class ImageBarChartComponent implements OnInit {
  @Input() imageBarChartData: BarChartData;
  public apexImageBarChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

  public ngOnInit(): void {
    this.initChart();
  }

  public initChart(): void {
    this.apexImageBarChartOptions = {
      series: [{
        name: 'coins',
        data: [
          2, 4, 3, 4, 3, 5, 5, 6.5, 6, 5, 4, 5, 8, 7, 7, 8, 8, 10, 9, 9, 12, 12,
          11, 12, 13, 14, 16, 14, 15, 17, 19, 21
        ]
      }],
      chart: {
        type: 'bar',
        height: 350,
        animations: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '100%',

        },
      },
      colors: [colors.BLUE],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        colors: ["#fff"],
        width: 0.2
      },
      labels: Array.apply(null, {length: 39}).map(function(el, index){
        return index + 1;
      }),
      grid: {
        position: 'back'
      },
      yaxis: {
        show: false
      },
      fill: {
        type: 'image',
        image: {
          src: ['./assets/charts/12.jpg'],
          width: 400,
          height: 282
        }
      }
    };
  }
}
