import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

function resolveURL(): string {

  if (process.env.BASE_URL_QA) return process.env.BASE_URL_QA;
  const env = (process.env.ENVIORNMENT || 'qa').toLowerCase();
  switch (env) {
    case 'api':
      return process.env.BASE_URL_API || "<url for api>";
      break;
    case 'qa':
      return process.env.BASE_URL_QA || "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
      break;
    case 'stage':
    case 'staging':
      return process.env.BASE_URL_STAGE || "<url for stage>";
      break;
    case 'dev':
      return process.env.BASE_URL_DEV || "<url for dev>";
      break;
    default:
      return process.env.BASE_URL_QA || "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  }

}

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['line'], ['./src/utils/CustomReporter.ts'], ['html'], ['allure-playwright']],
  use: {
    baseURL: resolveURL(),
    headless: false, // !!process.env.CI
    viewport: { width: 1920, height: 1080 },
    screenshot: 'on',
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },/*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});
