import { test, expect } from '@playwright/test'

test('E2E - smoke (landing -> register link)', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /jobs out/i })).toBeVisible()

  await page.getByRole('link', { name: /encontrar empleo/i }).click()
  await page.waitForURL('**/auth/register')
})

