import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardService } from '../../services';
import {
  DailyLineChartData,
  PerformanceChartData,
  ProjectStatData,
  RevenueChartData,
  ServerChartData,
  SupportRequestData,
  VisitsChartData
} from '../../models';
import {SharedService} from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  public dailyLineChartData$: Observable<DailyLineChartData>;
  public performanceChartData$: Observable<PerformanceChartData>;
  public revenueChartData$: Observable<RevenueChartData>;
  public serverChartData$: Observable<ServerChartData>;
  public supportRequestData$: Observable<SupportRequestData[]>;
  public visitsChartData$: Observable<VisitsChartData>;
  public projectsStatsData$: Observable<ProjectStatData>;
  public todayDate: Date = new Date();
  public currentTheme = '';
  public currentMode = '';

  constructor(
    private service: DashboardService,
    private sharedService: SharedService
  ) {
    this.dailyLineChartData$ = this.service.loadDailyLineChartData();
    this.performanceChartData$ = this.service.loadPerformanceChartData();
    this.revenueChartData$ = this.service.loadRevenueChartData();
    this.serverChartData$ = this.service.loadServerChartData();
    this.supportRequestData$ = this.service.loadSupportRequestData();
    this.visitsChartData$ = this.service.loadVisitsChartData();
    this.projectsStatsData$ = this.service.loadProjectsStatsData();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  public ngOnInit(): void {
    this.sharedService.currentTheme.subscribe((theme: string) => {
      this.currentTheme = theme;
    });

    this.sharedService.currentMode.subscribe((mode: string) => {
      this.currentMode = mode;
    });
  }
}
