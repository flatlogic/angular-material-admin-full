import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProjectStatData, ProjectTimeData } from '../../models';
import { colors } from '../../../../consts';
import { ChartOptions } from '../../../templates/charts/models/chart-options';
import { DateMenuComponent } from '../../../../shared/ui-elements';
import { ChartSizePipe } from '../../../../shared/pipes/chart-size.pipe';
import { NgxEchartsModule } from 'ngx-echarts';

enum ProjectsType {
  lightBlue = 'lightBlue',
  SingApp = 'SingApp',
  RNS = 'RNS'
}

@Component({
    selector: 'app-project-stat-chart',
    templateUrl: './project-stat-chart.component.html',
    styleUrls: ['./project-stat-chart.component.scss'],
    standalone: true,
    imports: [
      MatCardModule,
      MatIconModule,
      DateMenuComponent,
      ChartSizePipe,
      NgxEchartsModule,
    ]
})
export class ProjectStatChartComponent implements OnInit {
  @Input() projectsStatsData: ProjectStatData;
  public selectedStatsLightBlueData: ProjectTimeData;
  public selectedStatsSingAppData: ProjectTimeData;
  public selectedStatsRNSData: ProjectTimeData;
  public chartOptions: Partial<ChartOptions>;
  public projectsType: typeof ProjectsType = ProjectsType;
  public colors: typeof colors = colors;

  public get lightBlueEchartsOptions(): EChartsOption {
    return this.buildEchartsOptions(this.selectedStatsLightBlueData?.series, colors.BLUE);
  }

  public get singAppEchartsOptions(): EChartsOption {
    return this.buildEchartsOptions(this.selectedStatsSingAppData?.series, colors.YELLOW);
  }

  public get rnsEchartsOptions(): EChartsOption {
    return this.buildEchartsOptions(this.selectedStatsRNSData?.series, colors.PINK);
  }

  public ngOnInit(): void {
    this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.daily;
    this.selectedStatsSingAppData = this.projectsStatsData.singApp.daily;
    this.selectedStatsRNSData = this.projectsStatsData.rns.daily;

    this.initChart();
  }

  public initChart(): void {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 100,
        width: 130,
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          borderRadius: 5
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug'
        ],
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      tooltip: {
        y: {
          formatter(val) {
            return '$ ' + val + ' thousands';
          }
        }
      }
    };
  }

  public changeDateType(dateType: string, projectType: string): void {
    switch (projectType) {
      case this.projectsType.lightBlue:
        switch (dateType) {
          case 'Weekly':
            this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.week;
            break;
          case 'Monthly':
            this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.monthly;
            break;
          default:
            this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.daily;
        }
      break;
      case this.projectsType.SingApp:
        switch (dateType) {
          case 'Weekly':
            this.selectedStatsSingAppData = this.projectsStatsData.singApp.week;
            break;
          case 'Monthly':
            this.selectedStatsSingAppData = this.projectsStatsData.singApp.monthly;
            break;
          default:
            this.selectedStatsSingAppData = this.projectsStatsData.singApp.daily;
        }
      break;
      case this.projectsType.RNS:
        switch (dateType) {
          case 'Weekly':
            this.selectedStatsRNSData = this.projectsStatsData.rns.week;
            break;
          case 'Monthly':
            this.selectedStatsRNSData = this.projectsStatsData.rns.monthly;
            break;
          default:
            this.selectedStatsRNSData = this.projectsStatsData.rns.daily;
        }
      break;
    }
  }

  private buildEchartsOptions(series: ProjectTimeData['series'] | undefined, color: string): EChartsOption {
    const xaxis = this.chartOptions?.xaxis as { categories?: Array<string | number> } | undefined;
    const categories = xaxis?.categories ?? [];
    const rawSeries = (series ?? []) as Array<{ name: string; data: number[] }>;
    const mappedSeries = rawSeries.map((item) => ({
      type: 'bar',
      name: item.name ?? '',
      data: item.data ?? [],
      barMaxWidth: 18
    }));

    return {
      color: [color],
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        top: 8,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: false
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: mappedSeries
    } as EChartsOption;
  }
}
