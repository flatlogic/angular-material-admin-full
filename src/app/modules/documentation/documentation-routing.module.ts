import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DocumentationPageComponent} from './pages/documentation-page/documentation-page.component';
import {LibsPageComponent} from './pages/libs-page/libs-page.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {LicencesPageComponent} from './pages/licences-page/licences-page.component';
import {QuickStartPageComponent} from './pages/quick-start-page/quick-start-page.component';

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
