// composables/useCrearPublicacion.ts
import { useApi } from './useApi'

export const useCrearPublicacion = () => {
  const api = useApi()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const crearTrabajo = async (data: any) => {
    try {
      const res: any = await api('/api/trabajos', {
        method: 'POST',
        body: data
      })
      return res.data.id
    } catch (e: any) {
      console.error('crearTrabajo error', e)
      throw new Error(e?.data?.message || 'Error al crear el trabajo')
    }
  }

  const crearContacto = async (trabajoId: string, contacto: { tipo: string; valor: string }) => {
    try {
      const res: any = await api(`/api/trabajos/${trabajoId}/contactos`, {
        method: 'POST',
        body: contacto
      })
      return res.data
    } catch (e: any) {
      console.error('crearContacto error', e)
      throw new Error(e?.data?.message || 'Error al crear contacto')
    }
  }

  const subirImagen = async (trabajoId: string, file: File) => {
    try {
      const form = new FormData()
      form.append('imagen', file)

      const res: any = await api(`/api/publicaciones/${trabajoId}/imagen`, {
        method: 'POST',
        body: form
        // NO establecer headers Content-Type: multipart/form-data (fetch lo hace)
      })

      // Normalizar url (si backend devuelve url relativo)
      return res.data?.url || null
    } catch (e: any) {
      console.error('subirImagen error', e)
      throw new Error(e?.data?.message || 'Error al subir imagen')
    }
  }

  const crearPublicacion = async (data: {
    trabajo_id: string
    estado: string
    imagen_url?: string | null
  }) => {
    try {
      const res = await api('/api/publicaciones', {
        method: 'POST',
        body: data
      })
      return res.data
    } catch (e: any) {
      console.error('crearPublicacion error', e)
      throw new Error(e?.data?.message || 'Error al crear publicación')
    }
  }

  const crearPublicacionCompleta = async ({
    trabajo,
    contactos,
    imagen,
    estado
  }: {
    trabajo: any
    contactos: Array<{ tipo: string; valor: string }>
    imagen?: File | null
    estado: 'borrador' | 'publicado'
  }) => {
    loading.value = true
    error.value = null

    try {
      // 1) Crear trabajo SIN contactos para garantizar id
      const trabajoId = await crearTrabajo({
        ...trabajo,
        estado // dejar que backend guarde estado
      })

      // 2) Crear contactos (si vienen)
      if (Array.isArray(contactos) && contactos.length > 0) {
        for (const c of contactos) {
          // Omitir contactos vacíos
          if (!c?.valor) continue
          await crearContacto(trabajoId, c)
        }
      }

      // 3) Subir imagen (opcional)
      let imagenUrl: string | null = null
      if (imagen instanceof File) {
        imagenUrl = await subirImagen(trabajoId, imagen)
      }

      // 4) Crear la publicación asociada
      const publicacion = await crearPublicacion({
        trabajo_id: trabajoId,
        estado,
        imagen_url: imagenUrl
      })

      return { trabajoId, publicacion }
    } catch (e: any) {
      error.value = e.message || 'Error en el flujo de publicación'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    crearPublicacionCompleta,
    crearTrabajo,
    crearContacto,
    subirImagen,
    crearPublicacion
  }
}
