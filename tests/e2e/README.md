# E2E (Playwright) - Jobs Out Frontend

Este directorio contiene pruebas End-to-End (E2E) con Playwright. La idea es simular flujos reales
de usuario sobre la app ya corriendo (frontend + backend).

## Requisitos

- Node.js instalado
- Dependencias instaladas: `npm install`
- Browsers instalados (1ra vez): `npx playwright install`
- Frontend corriendo en `http://localhost:3000` (por defecto)
- Backend/API corriendo (por defecto el frontend apunta a `API_BASE_URL=http://localhost:4000`)

## Variables de entorno (recomendado)

Estas pruebas necesitan credenciales reales (un usuario existente en tu base de datos).

En PowerShell puedes definirlas asi:

```powershell
$env:E2E_BASE_URL = "http://localhost:3000"
$env:E2E_USERNAME = "juanperez"
$env:E2E_PASSWORD = "juan123"
```

Si no defines `E2E_BASE_URL`, se usara `http://localhost:3000`.
Si no defines `E2E_USERNAME`/`E2E_PASSWORD`, los tests que requieren login se van a saltar.

## Ejecutar pruebas

Headless:

```bash
npm run test:e2e
```

UI runner (para depurar):

```bash
npm run test:e2e:ui
```

Opciones utiles (sin scripts):

```bash
npx playwright test --headed
npx playwright test --project=chromium
npx playwright show-report
```

## Convenciones del proyecto

- Archivos: `*.e2e.ts`
- Estilo: AAA (Arrange / Act / Assert) + "user journey"
- Selectores:
  - Preferir `getByRole` y `getByLabel` (accesibilidad)
  - Evitar selectores fragiles (clases Tailwind o estructuras profundas)
  - Si un flujo es dificil de seleccionar, agregar `data-testid` en componentes (proximo paso)

## Estructura sugerida (cuando crezca)

- `tests/e2e/flows/`: journeys largos (login -> jobs -> guardar, etc.)
- `tests/e2e/pages/`: Page Objects (LoginPage, JobsPage, ProfilePage...)
- `tests/e2e/utils/`: helpers (login, env, seed, etc.)

## Backend/API (lo minimo que esperamos)

Estas pruebas (y el frontend) asumen endpoints tipo:

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/refresh` (si se usa refresh token)

Y que exista al menos 1 usuario de prueba con permisos adecuados (usuario normal y, opcionalmente,
un admin para pruebas del panel).

## Troubleshooting

- 401/403 en flujos autenticados:
  - Verifica que `E2E_USERNAME`/`E2E_PASSWORD` existan en la base de datos.
  - Revisa `API_BASE_URL` en `.env` y que el backend este levantado.
- Timeouts:
  - Aumenta `timeout` en Playwright o revisa latencia del backend.
- Selectores rotos:
  - Cambios en textos/labels pueden romper `getByRole/getByLabel`. Considera `data-testid`.
