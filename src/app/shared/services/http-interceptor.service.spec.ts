import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { APP_RUNTIME_CONFIG, AppRuntimeConfig } from '../../app.config';
import { AUTH_TOKEN_STORAGE_KEY } from '../../consts';
import { AuthService } from './auth.service';
import { httpInterceptor } from './http-interceptor.service';

describe('httpInterceptor', () => {
  const config: AppRuntimeConfig = {
    version: '1.2.0',
    remote: 'http://localhost:8080',
    isBackend: true,
    hostApi: 'http://localhost',
    portApi: '8080',
    baseURLApi: 'http://localhost:8080',
    auth: {
      email: 'admin@flatlogic.com',
      password: 'password',
    },
  };

  const authServiceMock = {
    logoutUser: jest.fn(),
  } as unknown as AuthService;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: APP_RUNTIME_CONFIG, useValue: config },
        { provide: AuthService, useValue: authServiceMock },
      ],
    });
  });

  it('prefixes API url and adds Authorization header when token exists', async () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'token-123');
    const request = new HttpRequest('GET', '/api/auth/me');

    let interceptedRequest: HttpRequest<unknown> | null = null;
    const response$ = TestBed.runInInjectionContext(() =>
      httpInterceptor(request, (req) => {
        interceptedRequest = req;
        return of(new HttpResponse({ status: 200, body: { ok: true } }));
      }),
    );

    await firstValueFrom(response$);

    expect(interceptedRequest?.url).toBe('http://localhost:8080/api/auth/me');
    expect(interceptedRequest?.headers.get('Authorization')).toBe(
      'Bearer token-123',
    );
  });

  it('prefixes API url without auth header when token is absent', async () => {
    const request = new HttpRequest('GET', '/api/auth/me');

    let interceptedRequest: HttpRequest<unknown> | null = null;
    const response$ = TestBed.runInInjectionContext(() =>
      httpInterceptor(request, (req) => {
        interceptedRequest = req;
        return of(new HttpResponse({ status: 200, body: { ok: true } }));
      }),
    );

    await firstValueFrom(response$);

    expect(interceptedRequest?.url).toBe('http://localhost:8080/api/auth/me');
    expect(interceptedRequest?.headers.has('Authorization')).toBe(false);
  });

  it('calls logoutUser on 401 errors', async () => {
    const request = new HttpRequest('GET', '/api/auth/me');

    const response$ = TestBed.runInInjectionContext(() =>
      httpInterceptor(
        request,
        () =>
          throwError(
            () =>
              new HttpErrorResponse({
                status: 401,
                statusText: 'Unauthorized',
                url: '/api/auth/me',
              }),
          ),
      ),
    );

    await expect(firstValueFrom(response$)).rejects.toBeInstanceOf(
      HttpErrorResponse,
    );
    expect(authServiceMock.logoutUser).toHaveBeenCalledTimes(1);
  });
});
