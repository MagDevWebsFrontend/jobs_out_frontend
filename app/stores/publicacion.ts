import { defineStore } from 'pinia'
import type { Publicacion } from '#shared/types/publicaciones'

export const usePublicacionStore = defineStore('publicacion', () => {
  const api = useApi()

  const publicacion = ref<Publicacion | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function obtenerPublicacion(id: string) {
    loading.value = true
    error.value = null
    try {
      const res: any = await api(`/api/publicaciones/${id}`)
      publicacion.value = res.data
    } catch (e) {
      error.value = 'No se pudo cargar la publicación'
    } finally {
      loading.value = false
    }
  }

  return {
    publicacion,
    loading,
    error,
    obtenerPublicacion
  }
})
