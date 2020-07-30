import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraRoutingModule } from './extra-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {FullCalendarModule} from '@fullcalendar/angular';
import {MatCardModule} from '@angular/material/card';
import { DayInfoComponent } from './components/day-info/day-info.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NewDayEventComponent } from './components/new-day-event/new-day-event.component';
import {CalendarPageComponent, GalleryPageComponent, InvoicePageComponent, TimeLinePageComponent} from './containers';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import {GalleryService, SearchResultService, TimeLineService} from './services';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SearchResultPageComponent } from './containers/search-result-page/search-result-page.component';
import { SearchResultItemComponent } from './components/search-result-item/search-result-item.component';
import {MatSelectModule} from '@angular/material/select';
import { TimePeriodSelectComponent } from './components/time-period-select/time-period-select.component';
import {FormsModule} from '@angular/forms';
import { TypeItemSelectComponent } from './components/type-item-select/type-item-select.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ResultFilteringComponent } from './components/result-filtering/result-filtering.component';
import {MatListModule} from '@angular/material/list';
import { InvoiceCardComponent } from './components/invoice-card/invoice-card.component';
import {InvoiceService} from './services/invoice.service';
import {MatTableModule} from '@angular/material/table';
import { TimeLineCardComponent } from './components/time-line-card/time-line-card.component';
import {AgmCoreModule} from '@agm/core';
import {googleMapKey} from '../maps/consts';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [
    CalendarPageComponent,
    InvoicePageComponent,
    GalleryPageComponent,
    TimeLinePageComponent,
    DayInfoComponent,
    NewDayEventComponent,
    GalleryItemComponent,
    SearchResultPageComponent,
    SearchResultItemComponent,
    TimePeriodSelectComponent,
    TypeItemSelectComponent,
    ResultFilteringComponent,
    InvoiceCardComponent,
    TimeLineCardComponent
  ],
  entryComponents: [
    DayInfoComponent,
    NewDayEventComponent
  ],
    imports: [
        CommonModule,
        ExtraRoutingModule,
        SharedModule,
        FullCalendarModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        FormsModule,
        MatButtonToggleModule,
        MatListModule,
        MatTableModule,
        AgmCoreModule,
        AgmCoreModule.forRoot({
            apiKey: googleMapKey
        }),
        MatInputModule,
        MatChipsModule,
    ],
  providers: [
    GalleryService,
    SearchResultService,
    InvoiceService,
    TimeLineService
  ]
})
export class ExtraModule { }
