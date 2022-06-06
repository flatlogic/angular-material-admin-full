import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesBasicPageComponent } from './containers';
import { EmployeeTableComponent, MaterialTableComponent } from './components';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TablesDynamicPageComponent } from './containers';
import { NutritionTableComponent } from './components';
import { MatChipsModule } from '@angular/material/chips';
import { CustomTableComponent } from './components/custom-table/custom-table.component';

@NgModule({
  declarations: [
    TablesBasicPageComponent,
    EmployeeTableComponent,
    MaterialTableComponent,
    TablesDynamicPageComponent,
    NutritionTableComponent,
    CustomTableComponent
  ],
    imports: [
        CommonModule,
        TablesRoutingModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatPaginatorModule,
        SharedModule,
        MatToolbarModule,
        MatChipsModule
    ]
})
export class TablesModule { }
