import { vi } from 'vitest'

// Mock global de useRuntimeConfig (Nuxt)
vi.mock('#imports', () => ({
  useRuntimeConfig: () => ({
    public: {
      apiBaseUrl: 'http://localhost:4000',
      siteUrl: 'http://localhost:3000'
    }
  })
}))

vi.stubGlobal('definePageMeta', () => {})
vi.stubGlobal('useHead', () => {})


