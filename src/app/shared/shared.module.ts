import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgSelectModule } from '@ng-select/ng-select';

import { HeaderModule } from './header/header.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { BreadcrumbComponent } from './ui-elements/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { SettingsMenuAppComponent } from './settings-menu/settings-menu.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ImageUploaderComponent } from './uploaders/image-uploader/image-uploader.component';
import { FileUploaderComponent } from './uploaders/file-uploader/file-uploader.component';
import { DeletePopupComponent } from './popups/delete-popup/delete-popup.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    BreadcrumbComponent,
    SettingsMenuAppComponent,
    ImageUploaderComponent,
    FileUploaderComponent,
    DeletePopupComponent,
    FilterComponent,
  ],
  imports: [
    HeaderModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,
    MatTreeModule,
    MatBadgeModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    NgSelectModule,
  ],
  exports: [
    HeaderModule,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    BreadcrumbComponent,
    ImageUploaderComponent,
    FileUploaderComponent,
    DeletePopupComponent,
    FilterComponent,
  ],
})
export class SharedModule {}
