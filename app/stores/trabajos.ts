// stores/trabajos.ts
import { defineStore } from 'pinia'
import type { Trabajo } from '#shared/types/publicaciones'

export const useTrabajosStore = defineStore('trabajos', () => {
  const api = useApi()
  
  const trabajos = ref<Trabajo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Crear un trabajo
  async function crearTrabajo(data: {
    titulo: string
    descripcion: string
    estado: 'borrador' | 'publicado'
    jornada: string
    modo: string
    experiencia_min: number
    salario_min: number
    salario_max: number
    municipio_id: string
    beneficios: string[]
  }) {
    loading.value = true
    error.value = null
    try {
      const response = await api('/api/trabajos', {
        method: 'POST',
        body: data
      })
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Error al crear trabajo'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener trabajos por estado (para borradores)
  async function obtenerTrabajos(estado?: string) {
    loading.value = true
    try {
      const params = estado ? `?estado=${estado}` : ''
      const response = await api(`/api/trabajos${params}`)
      trabajos.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Error al obtener trabajos'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener un trabajo específico
  async function obtenerTrabajo(id: string) {
    loading.value = true
    try {
      const response = await api(`/api/trabajos/${id}`)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Error al obtener trabajo'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actualizar trabajo (para editar borradores)
  async function actualizarTrabajo(id: string, data: Partial<Trabajo>) {
    loading.value = true
    try {
      const response = await api(`/api/trabajos/${id}`, {
        method: 'PUT',
        body: data
      })
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar trabajo'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Eliminar trabajo
  async function eliminarTrabajo(id: string) {
    loading.value = true
    try {
      await api(`/api/trabajos/${id}`, {
        method: 'DELETE'
      })
      // Remover de la lista local
      trabajos.value = trabajos.value.filter(t => t.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar trabajo'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Obtener solo borradores
  async function obtenerBorradores() {
    return await obtenerTrabajos('borrador')
  }

  // Publicar un borrador
  async function publicarTrabajo(id: string) {
    return await actualizarTrabajo(id, { estado: 'publicado' })
  }

  return {
    // Estado
    trabajos,
    loading,
    error,
    
    // Métodos
    crearTrabajo,
    obtenerTrabajos,
    obtenerTrabajo,
    actualizarTrabajo,
    eliminarTrabajo,
    obtenerBorradores,
    publicarTrabajo
  }
})