# Jobs Out - Frontend (Nuxt 4)

Frontend web construido con Nuxt 4 para una plataforma de empleos/publicaciones con autenticacion, perfil de usuario y panel de administracion.

## Caracteristicas

- Landing page con secciones informativas
- Autenticacion (login/registro) y middleware de rutas (auth/guest/admin)
- Modulo de empleos: listado, detalle, crear/editar (borrador/publicado) y guardados
- Perfil de usuario: ver/editar perfil y cambiar password
- Administracion: dashboard, gestion de usuarios, envio de comunicado
- Estructuras: gestion de provincias/municipios (admin)

## Tecnologias

- Nuxt 4 + Vue 3
- Pinia (estado global)
- Tailwind CSS (UI)
- Vitest (unit tests)
- Playwright (E2E)

## Estructura del proyecto

Carpetas mas relevantes:

- `app/pages/`: rutas (Nuxt file-based routing)
- `app/components/`: componentes UI/feature
- `app/layouts/`: layouts (auth, jobs, admin, etc.)
- `app/middleware/`: guards de rutas (`auth`, `guest`, `admin`)
- `app/stores/`: stores de Pinia (auth, trabajos, guardados, admin, structures)
- `app/composables/`: helpers (API, perfil, crear publicacion, etc.)
- `shared/types/`: tipos compartidos (publicaciones, user, pagination, structures)
- `tests/`: pruebas unitarias/E2E

## Requisitos

- Node.js 18+ (recomendado para Nuxt moderno)
- Un backend corriendo (por defecto en `http://localhost:4000`)

## Instalacion

Clona e instala dependencias:

```bash
npm install
```

## Variables de entorno

Este proyecto lee `API_BASE_URL` para apuntar al backend.

Ejemplo (archivo `.env`):

```env
API_BASE_URL=http://localhost:4000
```

## Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
npm run dev
```

## Produccion

Build:

```bash
npm run build
```

Preview local del build:

```bash
npm run preview
```

Generar sitio estatico (si aplica a tu despliegue):

```bash
npm run generate
```

## Tests

Unit tests:

```bash
npm run test:unit
```

Modo watch:

```bash
npm run test:unit:watch
```

Coverage:

```bash
npm run test:unit:coverage
```

E2E (Playwright):

```bash
npm run test:e2e
```

UI runner (Playwright):

```bash
npm run test:e2e:ui
```

## Conexion con el backend (API)

La base URL se configura via `API_BASE_URL` (ver `.env`) y `runtimeConfig.public.apiBaseUrl` (ver `nuxt.config.ts`).

Para llamadas al backend se usa principalmente el helper:

- `app/composables/useApi.ts` (wrapper de `$fetch` que adjunta `Authorization: Bearer <token>` y reintenta tras refresh)

Endpoints esperados (referencia rapida, pueden variar segun backend):

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/refresh`
- `GET  /api/auth/me`
- `GET/POST/PUT/DELETE /api/trabajos`
- `GET  /api/publicaciones/:id`
- `GET/POST/DELETE /api/guardados`

## Rutas principales

- `/` landing
- `/auth/login` login
- `/auth/register` registro
- `/auth/forgot-password` recuperar password
- `/jobs` dashboard/listado de empleos (requiere auth)
- `/jobs/[id]` detalle de publicacion/empleo (requiere auth)
- `/jobs/formJob` crear/editar empleo (requiere auth)
- `/jobs/my-jobs` mis publicaciones (requiere auth)
- `/jobs/saved` guardados (requiere auth)
- `/profile` perfil (requiere auth)
- `/profile/edit` editar perfil (requiere auth)
- `/profile/change-password` cambiar password (requiere auth)
- `/admin` dashboard admin (requiere auth + admin)
- `/admin/users` gestion de usuarios (requiere auth + admin)
- `/admin/comunicado` enviar comunicado (requiere auth + admin)
- `/structures/provincias` provincias/municipios (layout admin)

## Troubleshooting

- Si ves errores de CORS, valida que `API_BASE_URL` apunte al host correcto y que el backend permita el origen del frontend.
- Si quedas "deslogueado" al navegar, revisa cookies `access_token`/`refresh_token` y que el backend soporte refresh.

## Licencia

Proyecto interno/academico. 
MIT.
