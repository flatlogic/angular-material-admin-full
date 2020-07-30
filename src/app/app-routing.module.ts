import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardPageComponent } from './modules/dashboard/containers';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './modules/auth/guards';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'documentation',
    loadChildren: () => import('./modules/documentation/documentation.module').then(m => m.DocumentationModule)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: DashboardPageComponent
          }
        ]
      },
      {
        path: 'e-commerce',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/e-commerce/e-commerce.module').then(m => m.ECommerceModule)
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'core',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/templates/core/core.module').then(m => m.CoreModule)
      },
      {
        path: 'tables',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/templates/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'ui',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/templates/ui-elements/ui-elements.module').then(m => m.UiElementsModule)
      },
      {
        path: 'forms',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/templates/forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'charts',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/templates/charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: 'maps',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/templates/maps/maps.module').then(m => m.MapsModule)
      },
      {
        path: 'extra',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/templates/extra/extra.module').then(m => m.ExtraModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
