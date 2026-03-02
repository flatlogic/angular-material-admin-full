import {Component, DestroyRef, OnInit, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {LineChartData} from '../../models';
import {ChartsService} from '../../services';
import {routes} from '../../../../../consts';
import {SharedService} from '../../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-line-charts-page',
    templateUrl: './line-charts-page.component.html',
    styleUrls: ['./line-charts-page.component.scss'],
    standalone: false
})
export class LineChartsPageComponent implements OnInit {
  public basicLineChartData$: Observable<LineChartData>
  public lineDataLabelsChartData$: Observable<LineChartData>
  public dynamicUpdatingChartData$: Observable<LineChartData>
  public routes: typeof routes = routes;
  public currentTheme: string = '';
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private service: ChartsService,
    private sharedService: SharedService
  ) {
    this.basicLineChartData$ = this.service.loadBasicLineChartData();
    this.lineDataLabelsChartData$ = this.service.loadLineDataLabelsChartData();
    this.dynamicUpdatingChartData$ = this.service.loadDynamicUpdatingChartData();
  }

  public ngOnInit(): void {
    this.sharedService.currentTheme
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme: string) => {
        this.currentTheme = theme;
      });
  }
}
