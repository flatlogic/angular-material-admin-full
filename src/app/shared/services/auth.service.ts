import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { routes } from '../../consts';

const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  config: any;
  api = '/api/auth';
  ROUTES: typeof routes = routes;

  constructor(
    appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) {
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
    this.requestLogin();
    if (creds.social) {
      // tslint:disable-next-line
      window.location.href =
        this.config.baseURLApi + `${this.api}/signin/` + creds.social;
    } else if (creds.email.length > 0 && creds.password.length > 0) {
      this.http
        .post(`${this.api}/signin/local`, creds, { responseType: 'text' })
        .subscribe(
          (token: string) => {
            this.receiveToken(token);
          },
          (err) => {
            this.toastr.error('Something was wrong. Try again');
          },
        );
    } else {
      this.toastr.error('Something was wrong. Try again');
    }
  }

  registerUser(payload) {
    this.requestRegister();
    const creds = payload;
    if (creds.email.length > 0 && creds.password.length > 0) {
      this.http
        .post(`${this.api}/signup`, creds, { responseType: 'text' })
        .subscribe(
          (token: string) => {
            this.toastr.success("You've been registered successfully");
            this.router.navigate([this.ROUTES.LOGIN]);
          },
          (err) => {
            this.registerError(err.response.data);
          },
        );
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
    user = jwt.decodeToken(token).user;

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
    this.router.navigate([this.ROUTES.DASHBOARD]);
  }

  requestLogin() {
    this.isFetching = true;
  }

  getCurrentUserInfo(): Observable<any> {
    return this.http.get(`${this.api}/me`);
  }

  changePassword(data): Observable<any> {
    return this.http.put(`${this.api}/password-update`, data);
  }

  verifyEmail(token: string): void {
    this.http.put(`${this.api}/verify-email`, { token }).subscribe(
      () => {
        this.toastr.success("You've been verified your email");
      },
      (err) => {
        this.registerError(err.response.data);
      },
      () => {
        this.router.navigate([this.ROUTES.LOGIN]);
      },
    );
  }
}
