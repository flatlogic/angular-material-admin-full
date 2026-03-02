import { APP_ROUTES } from './app.routes';
import { routes } from './consts';

describe('APP_ROUTES', () => {
  it('redirects root path to dashboard with full match', () => {
    const rootRedirect = APP_ROUTES.find(
      (route) => route.path === '' && route.redirectTo,
    );

    expect(rootRedirect?.redirectTo).toBe(routes.DASHBOARD);
    expect(rootRedirect?.pathMatch).toBe('full');
  });

  it('contains required top-level feature paths under layout', () => {
    const layoutRoute = APP_ROUTES.find(
      (route) => route.path === '' && Array.isArray(route.children),
    );
    const childPaths = (layoutRoute?.children ?? []).map((route) => route.path);

    expect(childPaths).toEqual(
      expect.arrayContaining([
        'dashboard',
        'admin',
        'app',
        'user',
        'e-commerce',
        'charts',
        'maps',
        'extra',
      ]),
    );
  });

  it('redirects unknown paths to 404', () => {
    const wildcardRoute = APP_ROUTES.find((route) => route.path === '**');
    expect(wildcardRoute?.redirectTo).toBe('404');
  });
});
