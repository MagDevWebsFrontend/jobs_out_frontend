// stores/admin/publicaciones.ts
import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#imports'
import { useAuthStore } from '~/stores/auth'

export const usePublicacionesAdminStore = defineStore('adminPublicaciones', () => {
  const estadisticas = ref<{ users?: number; trabajos?: number; publicaciones?: number }>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchEstadisticas = async () => {
    loading.value = true
    error.value = null
    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBaseUrl.replace(/\/$/, '') // quitar slash final si existe

      // Preferir token del store auth si existe
      const authStore = useAuthStore()
      const token = authStore?.accessToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null)

      // Llamada al endpoint /api/publicaciones/estadisticas
      const url = `${apiBase}/api/publicaciones/estadisticas`

      const res = await $fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        timeout: 30000
      })

      // Normalizar respuesta esperada
      // Asumimos: { success: true, data: { users: number, trabajos: number, publicaciones: number } }
      if (res?.success) {
        estadisticas.value = res.data ?? {}
      } else {
        throw new Error(res?.message || 'Respuesta no válida de estadísticas')
      }
    } catch (err: any) {
      error.value = err.message || 'Error al obtener estadísticas'
      estadisticas.value = {}
    } finally {
      loading.value = false
    }
  }

  return {
    estadisticas,
    loading,
    error,
    fetchEstadisticas
  }
})
