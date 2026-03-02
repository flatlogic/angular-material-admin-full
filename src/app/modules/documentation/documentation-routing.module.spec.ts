import { DOCUMENTATION_ROUTES } from './documentation-routing.module';

describe('DOCUMENTATION_ROUTES', () => {
  it('keeps legacy redirect for quick start URL', () => {
    const containerRoute = DOCUMENTATION_ROUTES.find((route) => route.path === '');
    const childRoutes = containerRoute?.children ?? [];
    const quickStartRedirect = childRoutes.find(
      (route) => route.path === 'quick start',
    );

    expect(quickStartRedirect?.redirectTo).toBe('quick-start');
    expect(quickStartRedirect?.pathMatch).toBe('full');
  });
});
