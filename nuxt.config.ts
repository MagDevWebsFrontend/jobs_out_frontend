// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-01-14',
  
  modules: ['@nuxtjs/tailwindcss'],
  
  tailwindcss: {
    configPath: 'tailwind.config',
    cssPath: '/assets/css/tailwind.css',
  },
  
  components: true,
  
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:4000'
    }
  }
})