// Smoke config with built-in web server bootstrap for local and CI runs.
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.js/,
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://127.0.0.1:3001',
    headless: true,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start:nobackend -- --host 127.0.0.1 --port 3001',
    url: process.env.E2E_BASE_URL || 'http://127.0.0.1:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
  reporter: [['list']],
});
