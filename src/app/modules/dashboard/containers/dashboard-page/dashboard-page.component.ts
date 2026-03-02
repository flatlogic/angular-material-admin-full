import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { DashboardService } from '../../services';
import {
  DailyLineChartData,
  PerformanceChartData,
  ProjectStatData,
  RevenueChartData,
  ServerChartData,
  SupportRequestData,
  VisitsChartData,
} from '../../models';
import {SharedService} from '../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VisitsChartComponent } from '../../components/visits-chart/visits-chart.component';
import { PerformanceChartComponent } from '../../components/performance-chart/performance-chart.component';
import { ServerChartComponent } from '../../components/server-chart/server-chart.component';
import { RevenueChartComponent } from '../../components/revenue-chart/revenue-chart.component';
import { DailyLineChartComponent } from '../../components/daily-line-chart/daily-line-chart.component';
import { ProjectStatChartComponent } from '../../components/project-stat-chart/project-stat-chart.component';
import { SupportRequestsComponent } from '../../components/support-requests/support-requests.component';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      MatToolbarModule,
      MatTabsModule,
      MatIconModule,
      MatButtonModule,
      VisitsChartComponent,
      PerformanceChartComponent,
      ServerChartComponent,
      RevenueChartComponent,
      DailyLineChartComponent,
      ProjectStatChartComponent,
      SupportRequestsComponent,
    ]
})
export class DashboardPageComponent implements OnInit {
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
  private readonly destroyRef = inject(DestroyRef);

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

  public ngOnInit(): void {
    this.sharedService.currentTheme
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme: string) => {
        this.currentTheme = theme;
      });

    this.sharedService.currentMode
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((mode: string) => {
        this.currentMode = mode;
      });
  }
}
