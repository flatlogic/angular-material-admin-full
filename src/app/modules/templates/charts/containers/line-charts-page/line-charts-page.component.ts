import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {LineChartData} from '../../models';
import {ChartsService} from '../../services';
import {routes} from '../../../../../consts';
import {SharedService} from '../../../../../shared/services/shared.service';

@Component({
  selector: 'app-line-charts-page',
  templateUrl: './line-charts-page.component.html',
  styleUrls: ['./line-charts-page.component.scss']
})
export class LineChartsPageComponent {
  public basicLineChartData$: Observable<LineChartData>
  public lineDataLabelsChartData$: Observable<LineChartData>
  public dynamicUpdatingChartData$: Observable<LineChartData>
  public routes: typeof routes = routes;
  public currentTheme: string = '';

  constructor(
    private service: ChartsService,
    private sharedService: SharedService
  ) {
    this.basicLineChartData$ = this.service.loadBasicLineChartData();
    this.lineDataLabelsChartData$ = this.service.loadLineDataLabelsChartData();
    this.dynamicUpdatingChartData$ = this.service.loadDynamicUpdatingChartData();
  }

  public ngOnInit(): void {
    this.sharedService.currentTheme.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
  }
}
