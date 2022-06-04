import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './modules/auth/guards';
import { LayoutComponent } from './shared/layout/layout.component';
import { routes } from './consts';
import { DashboardPageComponent } from './modules/dashboard/containers';

const ROUTES: typeof routes = routes;

const route: Routes = [
  {
    path: '',
    redirectTo: ROUTES.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '404',
    component: NotFoundComponent,
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
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./modules/CRUD/crud.module').then((m) => m.CrudModule),
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'app',
        loadChildren: () =>
          import('./modules/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(route, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
