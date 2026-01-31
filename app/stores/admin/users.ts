// stores/admin/users.ts
import { defineStore } from 'pinia'
import type { User } from '#shared/types/user'
import { useAuthStore } from '../auth'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)

  const fetchUsers = async (
    page = 1,
    limit = 10,
    rol?: string
  ) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const apiBase = config.public.apiBaseUrl

      const authStore = useAuthStore()
      const token =
        authStore.accessToken ||
        (process.client ? localStorage.getItem('token') : null)

      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit)
      })
      if (rol) params.append('rol', rol)

      const res = await $fetch<{
        success: boolean
        data: { users: User[]; pagination: { total: number; page: number; limit: number; pages: number } }
      }>(`${apiBase}/api/usuarios?${params.toString()}`, {
        headers: { Accept: 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
        timeout: 30000
      })

      if (res.success) {
        users.value = res.data.users || []
        total.value = res.data.pagination?.total ?? users.value.length
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (err: any) {
      console.error(err)
      error.value = err.message || 'Error al cargar usuarios'
      users.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  return { users, total, loading, error, fetchUsers }
})
