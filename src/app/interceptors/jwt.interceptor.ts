import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../common-services';
import { AppConfig } from '../app.config';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    config: any;
    private readonly _defaultTokenValue = '';

    constructor(appConfig: AppConfig, private _localStorageService: LocalStorageService) {
        this.config = appConfig.getConfig();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._defaultTokenValue;

        // add authorization header with jwt token if available
        if (this._localStorageService.checkLocalStorageExistence()) {
            token = window.localStorage[this._localStorageService.tokenFieldName];
        }

        request = request.clone({
            url: this.config.baseURLApi + request.url,
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(request);
    }
}