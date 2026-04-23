import { test, expect } from '@playwright/test'
import { login } from './utils/auth'
import { hasCredentials } from './utils/env'

test('E2E - login -> jobs dashboard', async ({ page }) => {
  test.skip(!hasCredentials(), 'Missing E2E_USERNAME / E2E_PASSWORD env vars')

  await login(page)

  await expect(page.getByRole('heading', { name: /oportunidades laborales/i })).toBeVisible()
})

