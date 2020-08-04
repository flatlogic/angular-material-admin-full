import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationPageComponent } from './pages/documentation-page/documentation-page.component';
import { DocumentationRoutingModule } from './documentation-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import { LibsPageComponent } from './pages/libs-page/libs-page.component';
import {SharedModule} from '../../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { LicencesPageComponent } from './pages/licences-page/licences-page.component';
import { QuickStartPageComponent } from './pages/quick-start-page/quick-start-page.component';
import { StructurePageComponent } from './pages/structure-page/structure-page.component';
import { ChartsPageComponent } from './pages/charts-page/charts-page.component';
import { FormsPageComponent } from './pages/forms-page/forms-page.component';
import { UiPageComponent } from './pages/ui-page/ui-page.component';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { TablesPageComponent } from './pages/tables-page/tables-page.component';



@NgModule({
  declarations: [DocumentationPageComponent, LibsPageComponent, OverviewPageComponent, LicencesPageComponent, QuickStartPageComponent, StructurePageComponent, ChartsPageComponent, FormsPageComponent, UiPageComponent, MapsPageComponent, TablesPageComponent],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    SharedModule,
    MatCardModule
  ]
})
export class DocumentationModule { }
