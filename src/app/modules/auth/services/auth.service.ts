import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models';
import { routes } from '../../../consts';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConfig } from '../../../app.config';

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  config: any;
  ROUTES: typeof routes = routes;

  constructor(appConfig: AppConfig,
              private http: HttpClient,
              private router: Router,
              private toastr: ToastrService) {
    this.config = appConfig.getConfig();
  }

  _isFetching: boolean = false;

  get isFetching() {
    return this._isFetching;
  }

  set isFetching(val: boolean) {
    this._isFetching = val;
  }

  _errorMessage: string = '';

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(val: string) {
    this._errorMessage = val;
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    let data = null;

    // We check if app runs with backend mode
    if (!this.config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    try {
      data = jwt.decodeToken(token);
    } catch (e) {
      this.router.navigate(['/login']);
    }
    if (!data) return;
    return date < data.exp;
  }

  loginUser(creds) {
    // We check if app runs with backend mode
    if (!this.config.isBackend) {
      this.receiveToken('token');
    } else {
      this.requestLogin();
      if (creds.social) {
        // tslint:disable-next-line
        window.location.href = this.config.baseURLApi + '/user/signin/' + creds.social;
      } else if (creds.email.length > 0 && creds.password.length > 0) {
        this.http.post('/user/signin/local', creds).subscribe((res: any) => {
          this.receiveToken(res.token);
        }, err => {
          this.toastr.error(err.error);
        });

      } else {
        this.toastr.error('Something was wrong. Try again');
      }
    }
  }

  registerUser(payload) {
    this.requestRegister();
    const creds = payload;
    if (creds.email.length > 0 && creds.password.length > 0) {
      this.http.post('/user/signup', creds).subscribe(() => {
        this.toastr.success('You\'ve been registered successfully');
        setTimeout(() => {
          window.location.href = this.router.url;
        }, 1500)
      }, err => {
        this.registerError(err.error);
      });
    } else {
      this.registerError('Something was wrong. Try again');
    }
  }

  requestRegister() {
    this.isFetching = true;
  }

  receiveRegister() {
    this.isFetching = false;
    this.errorMessage = '';
  }

  registerError(payload) {
    this.isFetching = false;
    this.errorMessage = payload;
  }

  receiveToken(token) {
    let user: any = {};
    // We check if app runs with backend mode
    if (this.config.isBackend) {
      user = jwt.decodeToken(token).user;
      delete user.id;
    } else {
      user = {email: this.config.auth.email};
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.receiveLogin();
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.router.navigate([this.ROUTES.LOGIN]);
  }

  loginError(payload) {
    this.isFetching = false;
    this.errorMessage = payload;
  }

  receiveLogin() {
    this.isFetching = false;
    this.errorMessage = '';
    this.router.navigate([this.ROUTES.PROFILE]);
  }

  requestLogin() {
    this.isFetching = true;
  }

  public getUser(): Observable<User> {
    return of({
      name: 'John',
      lastName: 'Smith'
    });
  }
}
