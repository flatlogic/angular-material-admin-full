import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { APP_RUNTIME_CONFIG } from '../../app.config';
import { AUTH_TOKEN_STORAGE_KEY } from '../../consts';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const config = inject(APP_RUNTIME_CONFIG);

  req = req.clone({ url: config.baseURLApi + req.url });

  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(req).pipe(
    tap({
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          authService.logoutUser();
        }
      },
    }),
  );
};
