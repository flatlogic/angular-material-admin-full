import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GoogleMapsModule } from '@angular/google-maps';

import { GoogleMapPageComponent } from './components';
import { MapsRoutingModule } from './map-routing.module';
import { VectorMapPageComponent } from './components';
import { BreadcrumbComponent } from '../../../shared/ui-elements';

@NgModule({
  declarations: [
    GoogleMapPageComponent,
    VectorMapPageComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MapsRoutingModule,
    BreadcrumbComponent,
    MatCardModule,
  ]
})
export class MapsModule { }
