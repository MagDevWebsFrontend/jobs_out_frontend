import { defineStore } from 'pinia'
import type { MunicipioEntity } from '#shared/types/structures'
import { useApi } from '~/composables/useApi'

export const useMunicipiosStore = defineStore('municipios', () => {
  const api = useApi()

  const municipios = ref<Municipio[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMunicipios = async () => {
    loading.value = true
    error.value = null
    try {
      const res: any = await api('/api/municipios')
      municipios.value = res.data
    } catch (e: any) {
      error.value = e?.data?.message || 'Error al cargar municipios'
    } finally {
      loading.value = false
    }
  }

  const createMunicipio = async (payload: { nombre: string; provincia_id: string }) => {
    try {
      await api('/api/municipios', {
        method: 'POST',
        body: payload
      })
    } catch (e: any) {
      throw new Error(e?.data?.message || 'Error al crear municipio')
    }
  }

  const updateMunicipio = async (id: string, payload: { nombre: string }) => {
    try {
      await api(`/api/municipios/${id}`, {
        method: 'PUT',
        body: payload
      })
    } catch (e: any) {
      throw new Error(e?.data?.message || 'Error al actualizar municipio')
    }
  }

  const deleteMunicipio = async (id: string) => {
    try {
      await api(`/api/municipios/${id}`, {
        method: 'DELETE'
      })
    } catch (e: any) {
      throw new Error(e?.data?.message || 'Error al eliminar municipio')
    }
  }

  return {
    municipios,
    loading,
    error,
    fetchMunicipios,
    createMunicipio,
    updateMunicipio,
    deleteMunicipio
  }
})
