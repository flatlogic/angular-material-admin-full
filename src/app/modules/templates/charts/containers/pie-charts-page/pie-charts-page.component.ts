import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { PieChartData} from '../../models';
import {ChartsService} from '../../services';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-pie-charts-page',
  templateUrl: './pie-charts-page.component.html',
  styleUrls: ['./pie-charts-page.component.scss']
})
export class PieChartsPageComponent {
  public pieChartData$: Observable<PieChartData>;
  public routes: typeof routes = routes;

  constructor(private service: ChartsService) {
    this.pieChartData$ = this.service.loadPieChartData();
  }
}
