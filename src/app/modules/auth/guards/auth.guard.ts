import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AUTH_TOKEN_STORAGE_KEY, routes } from '../../../consts';

const ROUTES: typeof routes = routes;

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if (token) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl(ROUTES.LOGIN);
};
