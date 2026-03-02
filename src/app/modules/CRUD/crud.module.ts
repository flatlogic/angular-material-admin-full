import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { CrudRoutingModule } from './crud-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { BreadcrumbComponent } from '../../shared/ui-elements';
import { ImageUploaderComponent } from '../../shared/uploaders/image-uploader/image-uploader.component';
import { FilterComponent } from '../../shared/filter/filter.component';
import { DeletePopupComponent } from '../../shared/popups/delete-popup/delete-popup.component';

import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [UsersCreateComponent, UsersEditComponent, UsersListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CrudRoutingModule,
    NgSelectModule,
    BreadcrumbComponent,
    ImageUploaderComponent,
    FilterComponent,
    DeletePopupComponent,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    MatDialogModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
})
export class CrudModule {}
