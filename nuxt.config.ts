// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-01-14',
  
  modules: ['@nuxtjs/tailwindcss'],
  
  // Configura Tailwind para usar TU archivo CSS (no el default)
  tailwindcss: {
    configPath: 'tailwind.config',
    cssPath: '/assets/css/tailwind.css',
  },
  
  components: true
})