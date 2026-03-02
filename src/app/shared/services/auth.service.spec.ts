import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { APP_RUNTIME_CONFIG, AppRuntimeConfig } from '../../app.config';
import { AUTH_TOKEN_STORAGE_KEY, AUTH_USER_STORAGE_KEY, routes } from '../../consts';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const createConfig = (isBackend: boolean): AppRuntimeConfig => ({
    version: '1.2.0',
    remote: 'http://localhost:8080',
    isBackend,
    hostApi: 'http://localhost',
    portApi: '8080',
    baseURLApi: 'http://localhost:8080',
    auth: {
      email: 'admin@flatlogic.com',
      password: 'password',
    },
  });

  const setup = (isBackend: boolean) => {
    const router = { navigate: jest.fn() };
    const toastr = { error: jest.fn(), success: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        { provide: APP_RUNTIME_CONFIG, useValue: createConfig(isBackend) },
        { provide: Router, useValue: router },
        { provide: ToastrService, useValue: toastr },
      ],
    });

    return {
      service: TestBed.inject(AuthService),
      router,
      toastr,
    };
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('stores token and default user for non-backend mode', async () => {
    const { service, router } = setup(false);

    service.receiveToken('token-value');

    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBe('token-value');
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBe(
      JSON.stringify({ email: 'admin@flatlogic.com' }),
    );
    expect(router.navigate).toHaveBeenCalledWith([routes.DASHBOARD]);

    const currentUser = await firstValueFrom(service.getCurrentUserInfo());
    expect(currentUser.email).toBe('admin@flatlogic.com');
  });

  it('clears auth storage and redirects to login on logout', () => {
    const { service, router } = setup(false);
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'token');
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify({ email: 'a@b.c' }));

    service.logoutUser();

    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith([routes.LOGIN]);
  });

  it('returns false and redirects to login for malformed backend token', () => {
    const { service, router } = setup(true);
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'not-a-jwt');

    const result = service.isAuthenticated();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
