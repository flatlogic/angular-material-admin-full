import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {BarChartData} from '../../models';
import {ChartsService} from '../../services';
import {routes} from '../../../../../consts';
import {SharedService} from '../../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-bar-charts-page',
    templateUrl: './bar-charts-page.component.html',
    styleUrls: ['./bar-charts-page.component.scss'],
    standalone: false
})
export class BarChartsPageComponent implements OnInit {
  public barChartData$: Observable<BarChartData>
  public groupedBarChartData$: Observable<BarChartData>
  public routes: typeof routes = routes;
  public currentTheme: string = '';
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private service: ChartsService,
    private sharedService: SharedService
  ) {
    this.barChartData$ = this.service.loadBarChartData();
    this.groupedBarChartData$ = this.service.loadGroupedBarChartData();
  }

  public ngOnInit(): void {
    this.sharedService.currentTheme
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme: string) => {
        this.currentTheme = theme;
      });
  }
}
