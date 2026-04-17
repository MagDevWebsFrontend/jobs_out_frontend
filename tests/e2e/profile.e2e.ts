import { test, expect } from '@playwright/test'

test('E2E - editar perfil', async ({ page }) => {
  // 1️⃣ Login
  await page.goto('http://localhost:3000/auth/login')

  await page.getByPlaceholder('tu_usuario').waitFor()
  await page.getByPlaceholder('••••••••').waitFor()

  await page.getByPlaceholder('tu_usuario').fill('juanperez')
  await page.getByPlaceholder('••••••••').fill('juan123')

  await page.getByRole('button', { name: 'Iniciar sesión' }).click()

  // 2️⃣ Esperar redirección REAL
  await page.waitForURL('**/jobs', { timeout: 15000 })

  // 3️⃣ Ir a editar perfil
  await page.goto('http://localhost:3000/profile/edit')

  await expect(
    page.getByRole('heading', { level: 1 })
  ).toContainText(/editar/i)

  // 4️⃣ Editar nombre
  await page.getByPlaceholder(/nombre/i).fill('Playwright User Updated')

  // 5️⃣ LocationSelector
  await page.selectOption('#provincia', { index: 1 })
  await page.waitForSelector('#municipio option:not([value=""])')
  await page.selectOption('#municipio', { index: 1 })

  // 6️⃣ Guardar
  await page.getByRole('button', { name: /guardar/i }).click()

  // 7️⃣ Verificar redirección
  await page.waitForURL('**/profile')

  await expect(page.locator('header')).toContainText(
    'Playwright User Updated'
  )
})
