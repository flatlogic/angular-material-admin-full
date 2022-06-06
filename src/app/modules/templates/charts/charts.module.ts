import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatGridListModule } from '@angular/material/grid-list';

import { ChartsRoutingModule } from './charts-routing.module';
import {
  OverviewChartsPageComponent,
  LineChartsPageComponent,
  BarChartsPageComponent,
  PieChartsPageComponent
} from './containers';
import { SharedModule } from '../../../shared/shared.module';
import { ChartsService } from './services';
import {
  DashedLineChartComponent,
  HeatmapChartComponent,
  LineChartComponent,
  PieChartComponent,
  RadarChartComponent,
  BarChartComponent,
  BasicLineChartComponent,
  LineDataLabelsChartComponent,
  ZoomableTimeseriesChartComponent,
  GroupedBarChartComponent,
  StackedBarChartComponent,
  ImageBarChartComponent,
  SimplePieChartComponent,
  UpdatePieChartComponent,
  MonochomePieChartComponent,
  DynamicUpdatingChartComponent
} from './components';

@NgModule({
  declarations: [
    OverviewChartsPageComponent,
    LineChartsPageComponent,
    BarChartsPageComponent,
    PieChartsPageComponent,
    LineChartComponent,
    HeatmapChartComponent,
    DashedLineChartComponent,
    PieChartComponent,
    RadarChartComponent,
    BarChartComponent,
    BasicLineChartComponent,
    LineDataLabelsChartComponent,
    ZoomableTimeseriesChartComponent,
    GroupedBarChartComponent,
    StackedBarChartComponent,
    ImageBarChartComponent,
    SimplePieChartComponent,
    UpdatePieChartComponent,
    MonochomePieChartComponent,
    DynamicUpdatingChartComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    NgApexchartsModule,
    MatGridListModule
  ],
  providers: [
    ChartsService
  ]
})
export class ChartsModule { }
