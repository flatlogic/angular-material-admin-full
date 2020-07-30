import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TablesBasicPageComponent, TablesDynamicPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'basic'
  },
  {
    path: 'basic',
    component: TablesBasicPageComponent,
  },
  {
    path: 'dynamic',
    component: TablesDynamicPageComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class TablesRoutingModule {
}
