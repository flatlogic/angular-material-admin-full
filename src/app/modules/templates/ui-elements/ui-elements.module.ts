import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { SharedModule } from '../../../shared/shared.module';

import { UiElementsRoutingModule } from './ui-elements-routing.module';

import { NotificationPageComponent } from './containers';
import { SuccessToastComponent } from './components/success-toast/success-toast.component';
import { ErrorToastrComponent } from './components/error-toastr/error-toastr.component';
import { InfoToastrComponent } from './components/info-toastr/info-toastr.component';

import {
  IconsPageComponent,
  BadgePageComponent,
  CarouselPageComponent,
  CardsPageComponent,
  ModalPageComponent,
  TooltipsPageComponent,
  TabsPageComponent,
  WidgetPageComponent
} from './components';
import { NavbarPageComponent } from './components/navbar-page/navbar-page.component';

import {
  LocationComponent,
  LongContentComponent,
  FormComponent,
  SubscribedComponent,
  GridComponent
} from './popups';


import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

import { MatExpansionModule } from '@angular/material/expansion';
import { ProgressPageComponent } from './components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { PopoverModule } from 'ngx-smart-popover';

@NgModule({
  declarations: [
    IconsPageComponent,
    BadgePageComponent,
    CardsPageComponent,
    ModalPageComponent,
    LocationComponent,
    LongContentComponent,
    FormComponent,
    SubscribedComponent,
    GridComponent,
    NotificationPageComponent,
    SuccessToastComponent,
    ErrorToastrComponent,
    InfoToastrComponent,
    CarouselPageComponent,
    NavbarPageComponent,
    TooltipsPageComponent,
    TabsPageComponent,
    ProgressPageComponent,
    WidgetPageComponent
  ],
    imports: [
      CarouselModule,
      CommonModule,
      UiElementsRoutingModule,
      MatToolbarModule,
      SharedModule,
      MatButtonModule,
      MatCardModule,
      MatTabsModule,
      MatIconModule,
      MatBadgeModule,
      MatChipsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatGridListModule,
      MatTooltipModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatMenuModule,
      PopoverModule
    ]
})
export class UiElementsModule { }
