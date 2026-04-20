// composables/useApi.ts
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

    async onResponseError({ response, options }): Promise<any> {
      if (response.status === 401) {
        // 🚫 Evita loops infinitos
        if ((options as any)._retry) return

        ;(options as any)._retry = true

        try {
          const refreshed = await auth.refresh()

          if (refreshed) {
            // 🔁 Reintento usando el mismo instance (IMPORTANTE)
            return await api(response.url!, options)
          }
        } catch (e) {
          await auth.logout()
        }
      }
    }
  })

  return api
}