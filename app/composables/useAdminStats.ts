import { useAuthStore } from "~/stores/auth"

export const useAdminStats = () => {
  const stats = ref({
    usuarios: 0,
    publicaciones: 0
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStats = async () => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBaseUrl.replace(/\/$/, '')

      const auth = useAuthStore()
      const token = auth.accessToken

      const res = await $fetch<{
        success: boolean
        data: { usuarios: number; publicaciones: number }
      }>(`${apiBase}/api/publicaciones/estadisticas`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.success) {
        stats.value = res.data
      }
    } catch (e: any) {
      error.value = e.message || 'Error cargando estadísticas'
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    loading,
    error,
    fetchStats
  }
}
