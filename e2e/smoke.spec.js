const { test, expect } = require('@playwright/test');

async function mockAuthenticatedSession(page) {
  await page.addInitScript(() => {
    window.localStorage.setItem('token', 'e2e-token');
    window.localStorage.setItem(
      'user',
      JSON.stringify({ email: 'admin@flatlogic.com' }),
    );
  });
}

async function openProtectedRoute(page, path) {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });
  await page.evaluate((targetPath) => {
    window.history.pushState({}, '', targetPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, path);
}

test.describe('Core smoke', () => {
  test('login page renders', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });

  test('dashboard page renders', async ({ page }) => {
    await mockAuthenticatedSession(page);
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByText(/overview/i).first()).toBeVisible();
  });

  test('users list route renders', async ({ page }) => {
    await mockAuthenticatedSession(page);
    await openProtectedRoute(page, '/admin/users');
    await expect(page).toHaveURL(/\/admin\/users(\/list)?$/);
    await expect(
      page.locator(
        'button:has-text("New"), button:has-text("Add filter"), button:has-text("Add"), p.table-title:has-text("Users"), table.table, table[mat-table]',
      ).first(),
    ).toBeVisible();
  });

  test('users list -> create -> back to list', async ({ page }) => {
    await mockAuthenticatedSession(page);
    await openProtectedRoute(page, '/admin/users');
    await expect(page).toHaveURL(/\/admin\/users(\/list)?$/);

    await page.getByRole('button', { name: /^\s*new\s*$/i }).first().click();
    await expect(page).toHaveURL(/\/admin\/users\/new$/);
    await expect(
      page.locator('h4:has-text("New Users"), button:has-text("Create")').first(),
    ).toBeVisible();

    await page.getByRole('button', { name: /^\s*cancel\s*$/i }).first().click();
    await expect(page).toHaveURL(/\/admin\/users(\/list)?$/);
  });

  test('profile route renders', async ({ page }) => {
    await mockAuthenticatedSession(page);
    await openProtectedRoute(page, '/user/profile');
    await expect(page).toHaveURL(/\/user\/profile$/);
    await expect(
      page.locator('p:has-text("Views"), p:has-text("Updates")').first(),
    ).toBeVisible();
  });

  test('change-password route renders', async ({ page }) => {
    await mockAuthenticatedSession(page);
    await openProtectedRoute(page, '/app/change-password');
    await expect(page).toHaveURL(/\/app\/change-password$/);
    await expect(page.getByRole('heading', { name: /change password/i })).toBeVisible();
    await expect(
      page.getByRole('button', { name: /change password/i }).first(),
    ).toBeVisible();
  });
});
