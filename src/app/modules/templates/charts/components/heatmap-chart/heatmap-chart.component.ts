import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels, ApexFill, ApexGrid,
  ApexLegend, ApexMarkers,
  ApexNonAxisChartSeries, ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ApexXAxis
} from 'ng-apexcharts';

import { HeatmapChartData } from '../../models';
import { colors } from '../../../../../consts';

type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  labels: string[];
  responsive: ApexResponsive[];
  fill: ApexFill;
};

@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.scss']
})
export class HeatmapChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() heatmapChartData: HeatmapChartData;
  @Input() currentTheme: string;
  @ViewChild('chart') chart: ElementRef;

  public apexHeatmapChartOptions: Partial<ChartOptions>;
  // @ts-ignore
  public chartObj: ApexCharts;

  public ngOnInit(): void {
    this.initChart()
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
      this.apexHeatmapChartOptions
    )

    this.chartObj.render();
  }

  public initChart(): void {
    this.apexHeatmapChartOptions = {
      series: this.heatmapChartData.series,
      chart: {
        height: 350,
        type: 'heatmap',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        this.currentTheme === 'blue'
          ? colors.BLUE
          : this.currentTheme === 'green'
          ? colors.GREEN
          : colors.PINK
      ],
      xaxis: {
        labels: {
          rotate: 0
        }
      }
    };
  }
}
