import type { Page } from '@playwright/test'
import { getCredentials } from './env'

export async function login(page: Page) {
  const { username, password } = getCredentials()

  await page.goto('/auth/login')

  // Labels come from `app/components/ui/Input.vue`, so `getByLabel` is stable.
  await page.getByLabel(/nombre de usuario/i).fill(username)
  await page.getByLabel(/contra/i).fill(password)

  await page.getByRole('button', { name: /iniciar/i }).click()

  // App redirects to /jobs on successful login.
  await page.waitForURL('**/jobs', { timeout: 15000 })
}

