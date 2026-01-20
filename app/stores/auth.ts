// /stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const runtime = useRuntimeConfig()
  // Persistimos tokens en cookies (fallback). Si tu backend puede setear HttpOnly cookie,
  // entonces cookie refresh_token debería venir del servidor (más seguro).
  const accessToken = useCookie('access_token', { path: '/', sameSite: 'lax' })
  const refreshToken = useCookie('refresh_token', { path: '/', sameSite: 'lax' })
  const user = ref<Record<string, any> | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!accessToken.value)

  async function login(identifier: string, password: string) {
    loading.value = true
    try {
      const url = `${runtime.public.apiBaseUrl}/api/auth/login`
      const res = await $fetch(url, {
        method: 'POST',
        body: { identifier, password },
      })
      // Según el ejemplo que diste el backend devuelve data.{user, token, refreshToken}
      accessToken.value = res.data.token
      refreshToken.value = res.data.refreshToken
      user.value = res.data.user
      return { success: true }
    } catch (err) {
      // Normaliza errores según tu backend
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    // ideal: llamar endpoint de logout en backend para invalidar refresh token
    return navigateTo('/auth/login')
  }

  async function refresh() {
    // Llamar endpoint /api/auth/refresh con refreshToken
    if (!refreshToken.value) throw new Error('No refresh token')
    try {
      const url = `${runtime.public.apiBaseUrl}/api/auth/refresh`
      const res = await $fetch(url, {
        method: 'POST',
        body: { refreshToken: refreshToken.value },
      })
      accessToken.value = res.data.token
      if (res.data.refreshToken) refreshToken.value = res.data.refreshToken
      return true
    } catch (err) {
      // refresh falló -> forzar logout
      await logout()
      return false
    }
  }

  return {
    accessToken,
    refreshToken,
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    refresh,
  }
})
