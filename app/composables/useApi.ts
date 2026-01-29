//composables/useApi.ts
import { useAuthStore } from "~/stores/auth"

export function useApi() {
  const runtime = useRuntimeConfig()
  const auth = useAuthStore()

  const api = $fetch.create({
    baseURL: runtime.public.apiBaseUrl,
    credentials: 'include',

    async onRequest({ options }) {
      if (auth.accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.accessToken}`
        }
      }
    },

    async onResponseError({ response, options }) {
      if (response.status === 401) {
        const refreshed = await auth.refresh()
        if (refreshed) {
          // Reintento automático
          return await $fetch(response.url!, options)
        }
      }
    }
  })

  return api
}
