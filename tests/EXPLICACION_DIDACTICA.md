# Explicacion didactica (tests)

Esta guia explica como esta pensado el sistema de pruebas y como ampliarlo sin que se vuelva dificil de mantener.

## 1) Filosofia

- Unit tests (Vitest): validan logica y componentes en aislamiento. Deben correr rapido.
- E2E (Playwright): validan flujos reales (UI + backend). Son mas lentos, pero dan confianza real.

La idea es tener pocos E2E pero muy representativos, y reforzar el resto con unit.

## 2) Como correr todo local

1. Instalar deps:

```bash
npm install
```

2. Instalar browsers de Playwright (solo la primera vez):

```bash
npx playwright install
```

3. Levantar el backend (API) y el frontend:

- Backend: por defecto el frontend apunta a `API_BASE_URL=http://localhost:4000`
- Frontend:

```bash
npm run dev
```

4. (E2E) Definir credenciales para login:

En PowerShell:

```powershell
$env:E2E_USERNAME = "tu_usuario"
$env:E2E_PASSWORD = "tu_password"
```

Luego:

```bash
npm run test:e2e
```

Nota: los tests que requieren login hacen `test.skip()` si faltan estas variables.

## 3) Como escribir un buen E2E aqui

Reglas practicas:

- Haz un "journey" por test: login -> accion -> verificacion.
- Evita asserts de estilos o clases de Tailwind.
- Prefiere:
  - `page.getByRole(...)`
  - `page.getByLabel(...)` (nuestro `UiInput` renderiza `<label>`)
- Si algo es dificil de seleccionar, agrega `data-testid` en la UI (mejor que usar selectores fragiles).

## 4) Donde poner que

- Helpers de login/credenciales: `tests/e2e/utils/`
- Page Objects (si hace falta): `tests/e2e/pages/`
- Journeys largos: `tests/e2e/flows/`

## 5) CI (idea para despues)

En CI normalmente:

- se levanta backend + frontend (o se apunta a un entorno staging)
- se exportan env vars E2E_*
- se corre `npx playwright test`
- se guardan traces/videos solo en fallo (ya configurado)

