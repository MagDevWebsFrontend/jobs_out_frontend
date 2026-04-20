import { defineConfig } from '@playwright/test'
import { getBaseUrl } from './tests/e2e/utils/env'

export default defineConfig({
  testDir: './tests/e2e',

  testMatch: ['**/*.e2e.ts'],

  use: {
    baseURL: getBaseUrl(),
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
})
