import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthPageComponent } from '../../auth/containers';
import { NotFoundComponent } from '../../../shared/not-found/not-found.component';
import {
  CalendarPageComponent,
  GalleryPageComponent,
  InvoicePageComponent,
  SearchResultPageComponent,
  TimeLinePageComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendar'
  },
  {
    path: 'calendar',
    component: CalendarPageComponent
  },
  {
    path: 'invoice',
    component: InvoicePageComponent
  },
  {
    path: 'login',
    component: AuthPageComponent
  },
  {
    path: 'error',
    component: NotFoundComponent
  },
  {
    path: 'gallery',
    component: GalleryPageComponent
  },
  {
    path: 'search result',
    component: SearchResultPageComponent
  },
  {
    path: 'time line',
    component: TimeLinePageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ExtraRoutingModule {
}
