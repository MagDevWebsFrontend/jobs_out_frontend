import { defineStore } from 'pinia'
import type { ProvinciaEntity } from '#shared/types/structures'
import { useApi } from '~/composables/useApi'

export const useProvinciasStore = defineStore('provincias', () => {
  const api = useApi()

  const provincias = ref<Provincia[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProvincias = async () => {
    loading.value = true
    error.value = null
    try {
      const res: any = await api('/api/provincias')
      provincias.value = res.data
    } catch (e: any) {
      error.value = e?.data?.message || 'Error al cargar provincias'
    } finally {
      loading.value = false
    }
  }

  const createProvincia = async (payload: { nombre: string }) => {
    try {
      await api('/api/provincias', {
        method: 'POST',
        body: payload
      })
    } catch (e: any) {
      throw new Error(e?.data?.message || 'Error al crear provincia')
    }
  }

  const updateProvincia = async (id: string, payload: { nombre: string }) => {
    try {
      await api(`/api/provincias/${id}`, {
        method: 'PUT',
        body: payload
      })
    } catch (e: any) {
      throw new Error(e?.data?.message || 'Error al actualizar provincia')
    }
  }

  const deleteProvincia = async (id: string) => {
    try {
      await api(`/api/provincias/${id}`, {
        method: 'DELETE'
      })
    } catch (e: any) {
      throw new Error(e?.data?.message || 'Error al eliminar provincia')
    }
  }

  return {
    provincias,
    loading,
    error,
    fetchProvincias,
    createProvincia,
    updateProvincia,
    deleteProvincia
  }
})
