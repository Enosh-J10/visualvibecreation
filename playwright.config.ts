import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E configuration.
 * Tests run against a production build started via `npm run start`.
 * CI must run `npm run build` before invoking `npm run test:e2e`.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],

  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Full test suite on Chromium desktop
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    // Smoke tests only on Firefox desktop
    {
      name: 'firefox-smoke',
      grep: /@smoke/,
      use: { ...devices['Desktop Firefox'] },
    },
    // Critical & responsive tests on Mobile Chrome (Pixel 7)
    {
      name: 'mobile-chrome',
      grep: /@critical|@responsive/,
      use: { ...devices['Pixel 7'] },
    },
    // Critical & responsive tests on Mobile Safari (iPhone 15, WebKit)
    {
      name: 'mobile-safari',
      grep: /@critical|@responsive/,
      use: { ...devices['iPhone 15'] },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      // Safe CI placeholders — real secrets are never committed
      NEXT_PUBLIC_TURNSTILE_SITE_KEY:
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://127.0.0.1:3000',
      RESEND_API_KEY: process.env.RESEND_API_KEY ?? 're_test_placeholder',
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL ?? 'Website Test <test@example.com>',
      CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL ?? 'test@example.com',
      TURNSTILE_SECRET_KEY:
        process.env.TURNSTILE_SECRET_KEY ?? '1x0000000000000000000000000000000AA',
      // Signal to route handler that this is a CI test run
      E2E_TEST_MODE: process.env.E2E_TEST_MODE ?? 'false',
      CI: process.env.CI ?? 'false',
    },
  },
});
