import { Routes } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authGuard } from './modules/auth/guards';
import { LayoutComponent } from './shared/layout/layout.component';
import { routes } from './consts';

const ROUTES: typeof routes = routes;

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: ROUTES.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
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
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES,
          ),
      },
      {
        path: 'documentation',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/documentation/documentation.module').then(
            (m) => m.DocumentationModule,
          ),
      },
      {
        path: 'e-commerce',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/e-commerce/e-commerce.module').then(
            (m) => m.ECommerceModule,
          ),
      },
      {
        path: 'core',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/templates/core/core.module').then((m) => m.CoreModule),
      },
      {
        path: 'tables',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/templates/tables/tables.module').then(
            (m) => m.TablesModule,
          ),
      },
      {
        path: 'ui',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/templates/ui-elements/ui-elements.module').then(
            (m) => m.UiElementsModule,
          ),
      },
      {
        path: 'forms',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/templates/forms/forms.module').then(
            (m) => m.FormsModule,
          ),
      },
      {
        path: 'charts',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/templates/charts/charts.module').then(
            (m) => m.ChartsModule,
          ),
      },
      {
        path: 'maps',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/templates/maps/maps.module').then((m) => m.MapsModule),
      },
      {
        path: 'extra',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/templates/extra/extra.module').then(
            (m) => m.ExtraModule,
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./modules/CRUD/crud.module').then((m) => m.CrudModule),
      },
      {
        path: 'user',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'app',
        loadChildren: () =>
          import('./modules/pages/pages.routes').then((m) => m.PAGES_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
