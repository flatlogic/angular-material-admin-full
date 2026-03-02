import { AUTH_ROUTES } from './auth.routes';

describe('AUTH_ROUTES', () => {
  it('contains root auth page route', () => {
    const rootRoute = AUTH_ROUTES.find((route) => route.path === '');

    expect(rootRoute).toBeDefined();
    expect(rootRoute?.component).toBeDefined();
  });

  it('redirects /login alias to root auth route', () => {
    const loginAliasRoute = AUTH_ROUTES.find((route) => route.path === 'login');

    expect(loginAliasRoute?.redirectTo).toBe('');
    expect(loginAliasRoute?.pathMatch).toBe('full');
  });

  it('contains verify-email route', () => {
    const verifyEmailRoute = AUTH_ROUTES.find(
      (route) => route.path === 'verify-email',
    );

    expect(verifyEmailRoute).toBeDefined();
    expect(verifyEmailRoute?.component).toBeDefined();
  });
});
