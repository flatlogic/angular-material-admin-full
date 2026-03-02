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

export const EXTRA_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
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
    path: 'errorpage',
    redirectTo: 'error',
    pathMatch: 'full'
  },
  {
    path: 'gallery',
    component: GalleryPageComponent
  },
  {
    path: 'search-result',
    component: SearchResultPageComponent
  },
  {
    path: 'search result',
    redirectTo: 'search-result',
    pathMatch: 'full'
  },
  {
    path: 'time-line',
    component: TimeLinePageComponent
  },
  {
    path: 'time line',
    redirectTo: 'time-line',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(EXTRA_ROUTES)
  ],
  exports: [RouterModule]
})

export class ExtraRoutingModule {
}
