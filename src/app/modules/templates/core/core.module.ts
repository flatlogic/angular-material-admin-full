import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import {
  ButtonColorsComponent,
  ColorsPageComponent,
  EqualWidthComponent,
  GridPageComponent,
  HowItWorkComponent,
  StateColorsComponent,
  TypographyColorsComponent,
  TypographyPageComponent,
  VerticalAlignmentComponent
} from './components';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { GridTableComponent } from './components';
import { BreadcrumbComponent } from '../../../shared/ui-elements';

@NgModule({
  declarations: [
    ButtonColorsComponent,
    ColorsPageComponent,
    EqualWidthComponent,
    GridPageComponent,
    HowItWorkComponent,
    StateColorsComponent,
    TypographyColorsComponent,
    TypographyPageComponent,
    VerticalAlignmentComponent,
    GridTableComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatCardModule,
    MatButtonModule,
    BreadcrumbComponent,
    MatGridListModule,
    MatTableModule
  ]
})
export class CoreModule { }
