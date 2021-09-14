import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AppConfig } from './app.config';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  config;

  constructor(appConfig: AppConfig) {
    this.config = appConfig.getConfig();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({url: this.config.baseURLApi + req.url});

    const token: string = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }

    return next.handle(req);
  }
}
