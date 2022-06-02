import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ProductsService } from './services';
import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductEditFormComponent, ProductCardComponent } from './components';
import {
  ManagementPageComponent,
  ProductsPageComponent,
  ProductPageComponent,
  ProductEditPageComponent,
  ProductCreatePageComponent
} from './containers';

@NgModule({
  declarations: [
    ManagementPageComponent,
    ProductsPageComponent,
    ProductPageComponent,
    ProductCardComponent,
    ProductEditPageComponent,
    ProductEditFormComponent,
    ProductCreatePageComponent
  ],
  imports: [
    CommonModule,
    ECommerceRoutingModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    ProductsService
  ]
})
export class ECommerceModule { }
