import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { AppConfig } from '../../app.config';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  config;

  constructor(appConfig: AppConfig, private authService: AuthService) {
    this.config = appConfig.getConfig();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    req = req.clone({ url: this.config.baseURLApi + req.url });

    const token: string = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    return next.handle(req).pipe(
      tap(
        (event) => {},
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.authService.logoutUser();
            }
          }
        },
      ),
    );
  }
}
