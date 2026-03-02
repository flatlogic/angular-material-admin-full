import {Component, DestroyRef, OnInit, inject} from '@angular/core';
import {Observable} from 'rxjs';

import {BarChartData, DashedLineChartData, HeatmapChartData, LineChartData, PieChartData, RadarChartData} from '../../models';
import {ChartsService} from '../../services';
import {routes} from '../../../../../consts';
import {SharedService} from '../../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-overview-charts-page',
    templateUrl: './overview-charts-page.component.html',
    styleUrls: ['./overview-charts-page.component.scss'],
    standalone: false
})
export class OverviewChartsPageComponent implements OnInit {
  public lineChartData$: Observable<LineChartData>;
  public dashedLineChartData$: Observable<DashedLineChartData>;
  public pieChartData$: Observable<PieChartData>;
  public heatmapChartData$: Observable<HeatmapChartData>;
  public radarChartData$: Observable<RadarChartData>;
  public barChartData$: Observable<BarChartData>;
  public routes: typeof routes = routes;
  public currentTheme = '';
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private service: ChartsService,
    private sharedService: SharedService
  ) {
    this.lineChartData$ = this.service.loadLineChartData();
    this.dashedLineChartData$ = this.service.dashedLineChartData();
    this.pieChartData$ = this.service.loadPieChartData();
    this.heatmapChartData$ = this.service.loadHeatmapChartData();
    this.radarChartData$ = this.service.loadRadarChartData();
    this.barChartData$ = this.service.loadBarChartData();

  }

  public ngOnInit(): void {
    this.sharedService.currentTheme
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((elem: string) => {
        this.currentTheme = elem;
      });
  }
}
