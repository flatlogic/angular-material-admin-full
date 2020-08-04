import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DocumentationPageComponent} from './pages/documentation-page/documentation-page.component';
import {LibsPageComponent} from './pages/libs-page/libs-page.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {LicencesPageComponent} from './pages/licences-page/licences-page.component';
import {QuickStartPageComponent} from './pages/quick-start-page/quick-start-page.component';
import {StructurePageComponent} from './pages/structure-page/structure-page.component';
import {ChartsPageComponent} from './pages/charts-page/charts-page.component';
import {FormsPageComponent} from './pages/forms-page/forms-page.component';
import {TablesPageComponent} from './pages/tables-page/tables-page.component';
import {MapsPageComponent} from './pages/maps-page/maps-page.component';
import {UiPageComponent} from './pages/ui-page/ui-page.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentationPageComponent,
    children: [
      {
        path: 'libs',
        component: LibsPageComponent
      },
      {
        path: 'structure',
        component: StructurePageComponent
      },
      {
        path: 'overview',
        component: OverviewPageComponent
      },
      {
        path: 'licences',
        component: LicencesPageComponent
      },
      {
        path: 'quick start',
        component: QuickStartPageComponent
      },
      {
        path: 'charts',
        component: ChartsPageComponent
      },
      {
        path: 'forms',
        component: FormsPageComponent
      },
      {
        path: 'ui',
        component: UiPageComponent
      },
      {
        path: 'maps',
        component: MapsPageComponent
      },
      {
        path: 'tables',
        component: TablesPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class DocumentationRoutingModule {
}
