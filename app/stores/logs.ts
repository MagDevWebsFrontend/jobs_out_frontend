import { defineStore } from 'pinia'
import type { Log } from '#shared/types/logs'
import { useAuthStore } from '~/stores/auth'

export const useLogsStore = defineStore('logs', () => {
  const logs = ref<Log[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchLogs = async (page = 1, limit = 50) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBaseUrl

      const authStore = useAuthStore()
      const token =
        authStore.accessToken ||
        (typeof localStorage !== 'undefined'
          ? localStorage.getItem('token')
          : null)

      const url = `${apiBase}/api/admin/logs`

      const res = await $fetch<{ success: boolean; data: Log[] }>(url, {
        headers: {
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        timeout: 30000
      })

      if (res.success) {
        logs.value = res.data
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (err: any) {
      error.value = err.message || 'Error al cargar logs'
      logs.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    logs,
    loading,
    error,
    fetchLogs
  }
})
