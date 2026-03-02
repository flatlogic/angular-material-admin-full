import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, of, take } from 'rxjs';
import { APP_RUNTIME_CONFIG, AppRuntimeConfig } from '../../app.config';
import { AUTH_TOKEN_STORAGE_KEY, AUTH_USER_STORAGE_KEY, routes } from '../../consts';
import { Users } from '../models/users.model';

type JwtPayload = {
  exp?: number;
  user?: Record<string, unknown>;
  [key: string]: unknown;
};

export type LoginCredentials = {
  email?: string;
  password?: string;
  social?: string;
};

export type RegisterCredentials = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type ChangePasswordPayload = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public config: AppRuntimeConfig;
  public api = '/api/auth';
  public ROUTES: typeof routes = routes;

  constructor(
    @Inject(APP_RUNTIME_CONFIG) appConfig: AppRuntimeConfig,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.config = appConfig;
  }

  private _isFetching = false;
  private _errorMessage = '';

  get isFetching(): boolean {
    return this._isFetching;
  }

  set isFetching(val: boolean) {
    this._isFetching = val;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  set errorMessage(val: string) {
    this._errorMessage = val;
  }

  private decodeJwtPayload(token: string): JwtPayload | null {
    try {
      const payload = token.split('.')[1];
      if (!payload) {
        return null;
      }

      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padding = normalized.length % 4;
      const base64 =
        padding === 0 ? normalized : normalized + '='.repeat(4 - padding);
      const decoded = atob(base64);

      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }

  private extractErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      if (typeof error.error === 'string' && error.error.length > 0) {
        return error.error;
      }

      if (error.error && typeof error.error === 'object') {
        const errObj = error.error as Record<string, unknown>;
        const message = errObj['message'];
        if (typeof message === 'string' && message.length > 0) {
          return message;
        }
      }

      if (typeof error.message === 'string' && error.message.length > 0) {
        return error.message;
      }
    }

    if (error && typeof error === 'object') {
      const maybeAxiosError = error as {
        response?: { data?: unknown };
        message?: unknown;
      };

      if (typeof maybeAxiosError.response?.data === 'string') {
        return maybeAxiosError.response.data;
      }

      if (
        maybeAxiosError.response?.data &&
        typeof maybeAxiosError.response.data === 'object'
      ) {
        const data = maybeAxiosError.response.data as Record<string, unknown>;
        const message = data['message'];
        if (typeof message === 'string' && message.length > 0) {
          return message;
        }
      }

      if (
        typeof maybeAxiosError.message === 'string' &&
        maybeAxiosError.message.length > 0
      ) {
        return maybeAxiosError.message;
      }
    }

    return fallback;
  }

  private toUser(data: unknown): Users {
    const source =
      data && typeof data === 'object'
        ? (data as Record<string, unknown>)
        : {};

    return {
      id: typeof source['id'] === 'string' ? source['id'] : '',
      firstName: typeof source['firstName'] === 'string' ? source['firstName'] : '',
      lastName: typeof source['lastName'] === 'string' ? source['lastName'] : '',
      phoneNumber: typeof source['phoneNumber'] === 'string' ? source['phoneNumber'] : '',
      email: typeof source['email'] === 'string' ? source['email'] : '',
      role: typeof source['role'] === 'string' ? source['role'] : 'user',
      disabled: Boolean(source['disabled']),
      password: typeof source['password'] === 'string' ? source['password'] : '',
      emailVerified: Boolean(source['emailVerified']),
      emailVerificationToken:
        typeof source['emailVerificationToken'] === 'string'
          ? source['emailVerificationToken']
          : '',
      emailVerificationTokenExpiresAt: null,
      passwordResetToken:
        typeof source['passwordResetToken'] === 'string'
          ? source['passwordResetToken']
          : '',
      passwordResetTokenExpiresAt: null,
      provider: typeof source['provider'] === 'string' ? source['provider'] : 'local',
      avatar: Array.isArray(source['avatar']) ? (source['avatar'] as Users['avatar']) : [],
      createdBy: null,
      updatedBy: null,
    };
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

    if (!token) {
      return false;
    }

    // We check if app runs with backend mode
    if (!this.config.isBackend) {
      return true;
    }

    const data = this.decodeJwtPayload(token);
    if (!data) {
      this.router.navigate(['/login']);
      return false;
    }

    const exp = data.exp;
    if (typeof exp !== 'number') {
      return false;
    }

    const date = new Date().getTime() / 1000;
    return date < exp;
  }

  public loginUser(creds: LoginCredentials): void {
    this.requestLogin();
    if (!this.config.isBackend) {
      this.receiveToken('token');
      return;
    }

    if (creds.social) {
      window.location.href = `${this.config.baseURLApi}${this.api}/signin/${creds.social}`;
      return;
    }

    const email = creds.email || '';
    const password = creds.password || '';
    if (email.length > 0 && password.length > 0) {
      this.http
        .post(`${this.api}/signin/local`, creds, { responseType: 'text' })
        .pipe(take(1))
        .subscribe({
          next: (token: string) => {
            this.receiveToken(token);
          },
          error: () => {
            this.toastr.error('Something was wrong. Try again');
          },
        });
      return;
    }

    this.toastr.error('Something was wrong. Try again');
  }

  public registerUser(payload: RegisterCredentials): void {
    this.requestRegister();
    const creds = payload;

    if (!this.config.isBackend) {
      this.receiveRegister();
      this.toastr.success("You've been registered successfully");
      this.router.navigate([this.ROUTES.LOGIN]);
      return;
    }

    const email = creds.email || '';
    const password = creds.password || '';
    if (email.length > 0 && password.length > 0) {
      this.http
        .post(`${this.api}/signup`, creds, { responseType: 'text' })
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.toastr.success("You've been registered successfully");
            this.router.navigate([this.ROUTES.LOGIN]);
          },
          error: (err: unknown) => {
            this.registerError(
              this.extractErrorMessage(err, 'Something was wrong. Try again'),
            );
          },
        });
      return;
    }

    this.registerError('Something was wrong. Try again');
  }

  public requestRegister(): void {
    this.isFetching = true;
  }

  public receiveRegister(): void {
    this.isFetching = false;
    this.errorMessage = '';
  }

  public registerError(payload: string): void {
    this.isFetching = false;
    this.errorMessage = payload;
  }

  public receiveToken(token: string): void {
    let user: Record<string, unknown>;
    if (this.config.isBackend) {
      const payload = this.decodeJwtPayload(token);
      user = (payload?.user as Record<string, unknown>) || {};
    } else {
      user = { email: this.config.auth.email };
    }

    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
    this.receiveLogin();
  }

  public logoutUser(): void {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.router.navigate([this.ROUTES.LOGIN]);
  }

  public loginError(payload: string): void {
    this.isFetching = false;
    this.errorMessage = payload;
  }

  public receiveLogin(): void {
    this.isFetching = false;
    this.errorMessage = '';
    this.router.navigate([this.ROUTES.DASHBOARD]);
  }

  public requestLogin(): void {
    this.isFetching = true;
  }

  public getCurrentUserInfo(): Observable<Users> {
    if (!this.config.isBackend) {
      return of(this.toUser(JSON.parse(localStorage.getItem(AUTH_USER_STORAGE_KEY) || '{}')));
    }

    return this.http
      .get<unknown>(`${this.api}/me`)
      .pipe(map((user: unknown) => this.toUser(user)));
  }

  public changePassword(
    data: ChangePasswordPayload,
  ): Observable<Record<string, unknown>> {
    if (!this.config.isBackend) {
      return of({ success: true });
    }

    return this.http.put<Record<string, unknown>>(
      `${this.api}/password-update`,
      data,
    );
  }

  public verifyEmail(token: string): void {
    if (!this.config.isBackend) {
      this.toastr.success("You've been verified your email");
      this.router.navigate([this.ROUTES.LOGIN]);
      return;
    }

    this.http.put(`${this.api}/verify-email`, { token }).pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success("You've been verified your email");
        this.router.navigate([this.ROUTES.LOGIN]);
      },
      error: (err: unknown) => {
        this.registerError(
          this.extractErrorMessage(err, 'Something was wrong. Try again'),
        );
      },
    });
  }
}
