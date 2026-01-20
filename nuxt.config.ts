// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-01-14',
  
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  
  tailwindcss: {
    configPath: 'tailwind.config',
    cssPath: '/assets/css/tailwind.css',
  },

  pinia: {
      /**
       * Automatically add stores dirs to the auto imports. This is the same as
       * directly adding the dirs to the `imports.dirs` option. If you want to
       * also import nested stores, you can use the glob pattern `./stores/**`
       * (on Nuxt 3) or `app/stores/**` (on Nuxt 4+)
       *
       * @default `['stores']`
       */
    storesDirs: []
  },
  
  components: true,
  
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:4000'
    }
  }
})