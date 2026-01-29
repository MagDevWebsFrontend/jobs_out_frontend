import { defineStore } from 'pinia'
import type { Publicacion } from '#shared/types/publicaciones'

export const useGuardadosStore = defineStore('guardados', () => {
  const api = useApi()

  const guardados = ref<Publicacion[]>([])
  const loading = ref(false)

  async function obtenerGuardados() {
    loading.value = true
    const res: any = await api('/api/guardados?limit=50&offset=0')
    guardados.value = res.data.guardados.map((g: any) => g.publicacion)
    console.log(guardados.value)
    loading.value = false
  }

  async function eliminarGuardado(publicacionId: string) {
    await api(`/api/guardados/${publicacionId}`, { method: 'DELETE' })
    guardados.value = guardados.value.filter(p => p.id !== publicacionId)
  }

  async function guardarPublicacion(publicacionId: string) {
    try {
      loading.value = true
      
      const response = await api('/api/guardados', {
        method: 'POST',
        body: {
          publicacion_id: publicacionId
        }
      })

      // Opcional: agregar la publicación a la lista local de guardados
      // Si necesitas la publicación completa, podrías obtenerla desde otro endpoint
      // o hacer que obtenerGuardados() se llame después

      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Error al guardar publicación:', error)
      return {
        success: false,
        error
      }
    } finally {
      loading.value = false
    }
  }

  // Método para verificar si una publicación ya está guardada
  function estaGuardada(publicacionId: string): boolean {
    return guardados.value.some(p => p.id === publicacionId)
  }

  // Método para alternar entre guardar/eliminar
  async function toggleGuardado(publicacionId: string, publicacion?: Publicacion) {
    if (estaGuardada(publicacionId)) {
      await eliminarGuardado(publicacionId)
      return false // Ya no está guardada
    } else {
      const result = await guardarPublicacion(publicacionId)
      if (result.success && publicacion) {
        // Agregar la publicación a la lista local si la tenemos
        guardados.value.push(publicacion)
      }
      return true // Ahora está guardada
    }
  }

  return {
    guardados,
    loading,
    obtenerGuardados,
    eliminarGuardado,
    guardarPublicacion,
    estaGuardada,
    toggleGuardado
  }
})