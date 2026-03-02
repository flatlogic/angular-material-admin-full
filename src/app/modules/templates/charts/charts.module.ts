import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { ChartsRoutingModule } from './charts-routing.module';
import {
  OverviewChartsPageComponent,
  LineChartsPageComponent,
  BarChartsPageComponent,
  PieChartsPageComponent
} from './containers';
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
import { BreadcrumbComponent } from '../../../shared/ui-elements';
import { ChartSizePipe } from '../../../shared/pipes/chart-size.pipe';
import { NgxEchartsModule } from 'ngx-echarts';

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
    BreadcrumbComponent,
    ChartSizePipe,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  providers: [
    ChartsService
  ]
})
export class ChartsModule { }
