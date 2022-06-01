import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {BarChartData} from '../../models';
import {ChartsService} from '../../services';
import {routes} from '../../../../../consts';
import {SharedService} from '../../../../../shared/services/shared.service';

@Component({
  selector: 'app-bar-charts-page',
  templateUrl: './bar-charts-page.component.html',
  styleUrls: ['./bar-charts-page.component.scss']
})
export class BarChartsPageComponent {
  public barChartData$: Observable<BarChartData>
  public groupedBarChartData$: Observable<BarChartData>
  public routes: typeof routes = routes;
  public currentTheme: string = '';

  constructor(
    private service: ChartsService,
    private sharedService: SharedService
  ) {
    this.barChartData$ = this.service.loadBarChartData();
    this.groupedBarChartData$ = this.service.loadGroupedBarChartData();
  }

  public ngOnInit(): void {
    this.sharedService.currentTheme.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
  }
}
