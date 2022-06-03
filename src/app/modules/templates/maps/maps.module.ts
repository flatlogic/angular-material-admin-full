import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AgmCoreModule } from '@agm/core';

import { googleMapKey } from './consts';
import { GoogleMapPageComponent } from './components';
import { SharedModule } from '../../../shared/shared.module';
import { MapsRoutingModule } from './map-routing.module';
import { VectorMapPageComponent } from './components';

@NgModule({
  declarations: [
    GoogleMapPageComponent,
    VectorMapPageComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: googleMapKey
    }),
    MapsRoutingModule,
    SharedModule,
    MatCardModule,
  ]
})
export class MapsModule { }
