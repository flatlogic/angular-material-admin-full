import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  BadgePageComponent,
  IconsPageComponent,
  ModalPageComponent,
  ProgressPageComponent,
  TabsPageComponent,
  TooltipsPageComponent,
  WidgetPageComponent,
  CardsPageComponent
} from './components';

import { CarouselPageComponent } from './components';
import { NotificationPageComponent } from './containers';
import { NavbarPageComponent } from './components/navbar-page/navbar-page.component';
import { TablesDynamicPageComponent } from '../tables/containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'icons'
  },
  {
    path: 'icons',
    component: IconsPageComponent
  },
  {
    path: 'badge',
    component: BadgePageComponent
  },
  {
    path: 'cards',
    component: CardsPageComponent
  },
  {
    path: 'modal',
    component: ModalPageComponent
  },
  {
    path: 'carousel',
    component: CarouselPageComponent
  },
  {
    path: 'notification',
    component: NotificationPageComponent
  },
  {
    path: 'navbar',
    component: NavbarPageComponent
  },
  {
    path: 'tooltips',
    component: TooltipsPageComponent
  },
  {
    path: 'tabs',
    component: TabsPageComponent
  },
  {
    path: 'progress',
    component: ProgressPageComponent
  },
  {
    path: 'pagination',
    component: TablesDynamicPageComponent
  },
  {
    path: 'widget',
    component: WidgetPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class UiElementsRoutingModule {
}
