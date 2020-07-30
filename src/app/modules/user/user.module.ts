import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DeleteUserPopupComponent } from './popups';

import {
  ListPageComponent,
  EditPageComponent,
  AddPageComponent,
  ProfilePageComponent
} from './containers';

import {
  AccountEditFormComponent,
  ProfileEditFormComponent,
  PasswordEditFormComponent,
  SettingsEditFormComponent,
  AccountCreateFormComponent,
  UserArticleComponent,
  UserFilesComponent,
  UserInfoComponent,
  UserMediaComponent,
  UserProjectsComponent,
  UserTasksComponent
} from './components';
import {MatMenuModule} from '@angular/material/menu';
import {CalendarModule} from 'angular-calendar';

@NgModule({
  declarations: [
    ListPageComponent,
    AddPageComponent,
    EditPageComponent,
    AccountEditFormComponent,
    ProfileEditFormComponent,
    PasswordEditFormComponent,
    SettingsEditFormComponent,
    DeleteUserPopupComponent,
    AccountCreateFormComponent,
    ProfilePageComponent,
    UserArticleComponent,
    UserFilesComponent,
    UserInfoComponent,
    UserMediaComponent,
    UserProjectsComponent,
    UserTasksComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSelectModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MatMenuModule,
    CalendarModule
  ]
})
export class UserModule { }
