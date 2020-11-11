import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { routes } from 'src/app/consts';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/common-services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public routes: typeof routes = routes;

  _isFetching: boolean = false;
  _errorMessage: string = '';

  get isFetching() {
    return this._isFetching;
  }

  set isFetching(val: boolean) {
    this._isFetching = val;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(val: string) {
    this._errorMessage = val;
  }

  config: any;

  constructor(
    private _localStorageService: LocalStorageService,
    private _appConfig: AppConfig,
    private _jwtService: JwtHelperService,
    private _httpClient: HttpClient,
    private _router: Router
  ) {
    this.config = this._appConfig.getConfig();
  }

  public sign(): void {
    localStorage.setItem(this._localStorageService.tokenFieldName, 'token');
  }

  public getUser(): Observable<User> {
    return of({
      name: 'John',
      lastName: 'Smith'
    });
  }

  isAuthenticated() {
    const token = localStorage.getItem(this._localStorageService.tokenFieldName);
    let data = null;

    if (!token) return false;
    const date = new Date().getTime() / 1000;
    try {
      data = this._jwtService.decodeToken(token);
    } catch (e) {
      return false;
    }
    if (!data) return false;
    return date < data.exp;
  }

  login(creds) {
    // We check if app runs with backend mode
    this.requestLogin();

    if (creds.email.length > 0 && creds.password.length > 0) {
      this._httpClient.post(`/account/login`, creds).subscribe((res: any) => {
        const token = res.accessToken;
        if (!token) {
          throw new Error("There is no token!");
        }

        this.receiveToken(token);
      }, err => {
        this.loginError('Something was wrong. Try again');
      });
    }
  }

  receiveToken(token) {
    let decodedToken = null;
    let user: any = {};
    
    decodedToken = this._jwtService.decodeToken(token);
    if (decodedToken) {
      user = {
        email: decodedToken[this.config.tokenEmailField]
      };
    }

    localStorage.setItem(this._localStorageService.tokenFieldName, token);
    localStorage.setItem(this._localStorageService.userFieldName, JSON.stringify(user));
    this.receiveLogin();
  }

  logout() {
    localStorage.removeItem(this._localStorageService.tokenFieldName);
    localStorage.removeItem(this._localStorageService.userFieldName);
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this._router.navigate([this.routes.LOGIN]);
  }

  loginError(payload) {
    this.isFetching = false;
    this.errorMessage = payload;
  }

  receiveLogin() {
    this.isFetching = false;
    this.errorMessage = '';
    this._router.navigate([this.routes.DASHBOARD]);
  }

  requestLogin() {
    this.isFetching = true;
  }
}