import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { RadarChartData } from '../../models';

import { colors } from '../../../../../consts';
import { ChartOptions } from '../../models/chart-options';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() radarChartData: RadarChartData;
  @Input() currentTheme: string;
  @ViewChild('chart') chart: ElementRef;

  // @ts-ignore
  public chartObj: ApexCharts;
  public apexRadarChartOptions: Partial<ChartOptions>;
  public colors: typeof colors = colors;

  public ngOnInit(): void {
    this.initChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentTheme.currentValue && this.chartObj) {
      this.chartObj.updateOptions({
        colors: [
          changes.currentTheme.currentValue === 'blue'
            ? colors.BLUE
            : this.currentTheme === 'green'
            ? colors.GREEN
            : colors.PINK
        ],
      })
    }
  }

  public ngAfterViewInit() {
    // @ts-ignore
    this.chartObj = new ApexCharts(
      this.chart.nativeElement,
      this.apexRadarChartOptions
    )

    this.chartObj.render();
  }

  public initChart(): void {
    this.apexRadarChartOptions = {
      series: this.radarChartData.series,
      chart: {
        height: 350,
        type: "radar",
        toolbar: {
          show: false
        }
      },
      colors: [
        this.currentTheme === 'blue'
          ? colors.BLUE
          : this.currentTheme === 'green'
          ? colors.GREEN
          : colors.PINK
      ],
      xaxis: {
        categories: this.radarChartData.categories
      }
    };
  }
}
