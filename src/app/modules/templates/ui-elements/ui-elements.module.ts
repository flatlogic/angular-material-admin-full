import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsPageComponent } from './components/icons-page/icons-page.component';
import {UiElementsRoutingModule} from './ui-elements-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SharedModule} from '../../../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { BadgePageComponent } from './components/badge-page/badge-page.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import { CardsPageComponent } from './components/cards-page/cards-page.component';
import { ModalPageComponent } from './components/modal-page/modal-page.component';
import { LocationComponent } from './popups/location/location.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LongContentComponent } from './popups/long-content/long-content.component';
import { FormComponent } from './popups/form/form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { SubscribedComponent } from './popups/subscribed/subscribed.component';
import { GridComponent } from './popups/grid/grid.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {NotificationPageComponent} from './containers';
import {SuccessToastComponent} from './components/success-toast/success-toast.component';
import {ErrorToastrComponent} from './components/error-toastr/error-toastr.component';
import {InfoToastrComponent} from './components/info-toastr/info-toastr.component';
import { CarouselPageComponent } from './components/carousel-page/carousel-page.component';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import { NavbarPageComponent } from './components/navbar-page/navbar-page.component';
import { TooltipsPageComponent } from './components/tooltips-page/tooltips-page.component';
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';
import { TabsPageComponent } from './components/tabs-page/tabs-page.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProgressPageComponent } from './components/progress-page/progress-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { WidgetPageComponent } from './components/widget-page/widget-page.component';
import {MatMenuModule} from '@angular/material/menu';
import {PopoverModule} from 'ngx-smart-popover';



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
        MatCarouselModule.forRoot(),
        MatTooltipModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatMenuModule,
        PopoverModule
    ]
})
export class UiElementsModule { }
