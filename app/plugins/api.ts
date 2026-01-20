// /plugins/api.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  // create instance of fetch with baseURL
  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    async onRequest({ options }) {
      // lee cookie (funciona en client y server)
      const token = useCookie('access_token').value
      if (token) {
        options.headers = { ...(options.headers || {}), Authorization: `Bearer ${token}` }
      }
    },
    async onResponseError(ctx) {
      const { response, request } = ctx
      // Si 401 -> intentar refresh una vez
      if (response?.status === 401) {
        const authStore = useAuthStore()
        try {
          const refreshed = await authStore.refresh()
          if (refreshed) {
            // reintentar la petición original con nuevo token
            const token = useCookie('access_token').value
            const newHeaders = { ...(request.options?.headers || {}), Authorization: `Bearer ${token}` }
            return await $fetch(request.url, { ...request.options, headers: newHeaders })
          }
        } catch (e) {
          // refresh falló, se caerá al logout en authStore.refresh()
        }
      }
      // re-lanzar error
      throw ctx
    }
  })

  // inyectar como $api
  nuxtApp.provide('api', api)
})
