import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';

import { authGuard } from './auth.guard';
import { AUTH_TOKEN_STORAGE_KEY, routes } from '../../../consts';

describe('authGuard', () => {
  const createGuardArgs = (): Parameters<typeof authGuard> => [
    {} as Parameters<typeof authGuard>[0],
    {} as Parameters<typeof authGuard>[1],
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  afterEach(() => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  });

  it('returns true when token exists in localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'token');
    const [route, state] = createGuardArgs();

    const result = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(result).toBe(true);
  });

  it('redirects to login when token is missing', () => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    const router = TestBed.inject(Router);
    const [route, state] = createGuardArgs();

    const result = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(result instanceof UrlTree).toBe(true);
    if (result instanceof UrlTree) {
      expect(router.serializeUrl(result)).toBe(routes.LOGIN);
    }
  });
});
