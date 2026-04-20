import { test, expect } from '@playwright/test'
import { login } from './utils/auth'
import { hasCredentials } from './utils/env'

test('E2E - editar perfil', async ({ page }) => {
  test.skip(!hasCredentials(), 'Missing E2E_USERNAME / E2E_PASSWORD env vars')

  // Login (usa credenciales via env: E2E_USERNAME / E2E_PASSWORD)
  await login(page)

  // Ir a editar perfil
  await page.goto('/profile/edit')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(/editar/i)

  // Editar nombre
  await page.getByPlaceholder(/nombre/i).fill('Playwright User Updated')

  // LocationSelector
  await page.selectOption('#provincia', { index: 1 })
  await page.waitForSelector('#municipio option:not([value=""])')
  await page.selectOption('#municipio', { index: 1 })

  // Guardar
  await page.getByRole('button', { name: /guardar/i }).click()

  // Verificar redireccion
  await page.waitForURL('**/profile')
  await expect(page.locator('header')).toContainText('Playwright User Updated')
})
