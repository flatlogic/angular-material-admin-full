import { Routes } from '@angular/router';

import { AuthPageComponent } from './containers';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
  {
    path: 'login',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
  },
];
