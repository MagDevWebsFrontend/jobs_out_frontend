import type { Log } from '#shared/types/logs'
import type { PaginatedResponse } from '#shared/types/pagination'

export const useLogs = () => {
  const logs = ref<Log[]>([])
  const total = ref(0)
  const limit = ref(50)
  const offset = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const filters = ref({
    accion: '' as '' | Log['accion'],
    entidad: '',
    usuario: '',
    desde: '',
    hasta: ''
  })

  const fetchLogs = async () => {
    loading.value = true
    error.value = null

    try {
      const { data } = await useFetch<PaginatedResponse<Log>>(
        '/admin/logs',
        {
          method: 'GET',
          query: {
            limit: limit.value,
            offset: offset.value,
            ...filters.value
          }
        }
      )

      if (!data.value?.success) {
        throw new Error('Error al cargar logs')
      }

      logs.value = data.value.data
      total.value = data.value.total
    } catch (err: any) {
      error.value = err.message || 'Error inesperado'
    } finally {
      loading.value = false
    }
  }

  return {
    logs,
    total,
    limit,
    offset,
    filters,
    loading,
    error,
    fetchLogs
  }
}
