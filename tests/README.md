# Tests

Este proyecto usa dos tipos de pruebas:

- Unit: Vitest + Vue Test Utils (`tests/unit`)
- E2E: Playwright (`tests/e2e`)

## Scripts

Unit:

```bash
npm run test:unit
npm run test:unit:watch
npm run test:unit:coverage
```

E2E:

```bash
npm run test:e2e
npm run test:e2e:ui
```

## Estructura

- `tests/setup.ts`: setup global de Vitest (mocks/stubs de Nuxt)
- `tests/unit/`: pruebas unitarias (`*.spec.ts`)
- `tests/e2e/`: pruebas end-to-end (`*.e2e.ts`)
- `tests/fixtures/`: datos estaticos reutilizables
- `tests/mocks/`: mocks/handlers reutilizables (ej: MSW)
- `tests/utils/`: helpers compartidos para tests

## Recomendaciones

- Prioriza selectores por rol/label en E2E (`getByRole`, `getByLabel`).
- Si un flujo es fragil por selectores, agrega `data-testid` en el componente.

