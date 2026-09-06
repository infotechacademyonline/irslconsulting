import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  /*
   * CI runs chromium only. WebKit / mobile-safari on this codebase surfaces
   * touch-event and form-submission quirks that need dedicated work — see
   * README → Testing. Add mobile-safari back once the tap-timing on the
   * SolutionsGrid link and iOS form-action round-trip are stabilised.
   */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ...(process.env.PLAYWRIGHT_ALL_BROWSERS
      ? [
          { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
          { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        ]
      : []),
  ],
  // Only spin up a dev server when no external base URL is supplied
  ...(process.env.PLAYWRIGHT_BASE_URL
    ? {}
    : {
        webServer: {
          command: 'npm run build && npm run start',
          url: BASE_URL,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
      }),
});
