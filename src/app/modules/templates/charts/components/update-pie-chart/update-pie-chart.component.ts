import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {colors} from '../../../../../consts';
import {ChartOptions} from '../../models/chart-options';

@Component({
  selector: 'app-update-pie-chart',
  templateUrl: './update-pie-chart.component.html',
  styleUrls: ['./update-pie-chart.component.scss']
})
export class UpdatePieChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart: ElementRef;
  // @ts-ignore
  public chartObj: ApexCharts;
  public chartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

  ngOnInit(): void {
    this.initChart();
  }

  public ngAfterViewInit() {
    // @ts-ignore
    this.chartObj = new ApexCharts(
      this.chart.nativeElement,
      this.chartOptions
    )

    this.chartObj.render();
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
    let newSeries = this.chartOptions.series;
    // @ts-ignore
    newSeries.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);

    this.chartObj.updateSeries(newSeries);
  }

  public removeData(): void {
    let newSeries = this.chartOptions.series;
    newSeries.pop();

    this.chartObj.updateSeries(newSeries);
  }

  public randomize(): void {
    let newSeries = this.chartOptions.series;

    // @ts-ignore
    this.chartObj.updateSeries(newSeries.map(() => Math.floor(Math.random() * (100 - 1 + 1)) + 1));
  }

  public reset(): void {
    this.chartObj.updateSeries([44, 55, 13, 33]);
  }
}
