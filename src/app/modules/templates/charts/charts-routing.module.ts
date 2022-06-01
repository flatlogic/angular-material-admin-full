import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  BarChartsPageComponent,
  LineChartsPageComponent,
  OverviewChartsPageComponent,
  PieChartsPageComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview'
  },
  {
    path: 'overview',
    component: OverviewChartsPageComponent
  },
  {
    path: 'line',
    component: LineChartsPageComponent
  },
  {
    path: 'bar',
    component: BarChartsPageComponent
  },
  {
    path: 'pie',
    component: PieChartsPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ChartsRoutingModule {
}
