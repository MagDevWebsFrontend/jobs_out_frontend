// composables/useCrearPublicacion.ts
import { useApi } from './useApi'

export const useCrearPublicacion = () => {
  const api = useApi()
  const loading = ref(false)
  const error = ref<string | null>(null)

  /* =========================
     CREAR TRABAJO
  ========================= */
  const crearTrabajo = async (data: any) => {
    try {
      const res: any = await api('/api/trabajos', {
        method: 'POST',
        body: data
      })

      if (!res?.data?.id) {
        throw new Error('No se recibió ID del trabajo')
      }

      return res.data.id
    } catch (e: any) {
      console.error('crearTrabajo error', e)
      throw new Error(e?.data?.message || 'Error al crear el trabajo')
    }
  }

  /* =========================
     CREAR CONTACTO
  ========================= */
  const crearContacto = async (
    trabajoId: string,
    contacto: { tipo: string; valor: string }
  ) => {
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

  /* =========================
     SUBIR IMAGEN (FIX CLAVE)
  ========================= */
  const subirImagen = async (trabajoId: string, file: File) => {
    try {
      const form = new FormData()
      form.append('imagen', file)

      // 🔥 RUTA CORRECTA
      const res: any = await api(`/api/uploads/${trabajoId}/imagen`, {
        method: 'POST',
        body: form
      })

      if (!res?.data?.url) {
        throw new Error('No se recibió URL de imagen')
      }

      return res.data.url
    } catch (e: any) {
      console.error('subirImagen error', e)
      throw new Error(e?.data?.message || 'Error al subir imagen')
    }
  }

  /* =========================
     CREAR PUBLICACION
  ========================= */
  const crearPublicacion = async (data: {
    trabajo_id: string
    estado: string
    imagen_url?: string | null
  }) => {
    try {
      const res: any = await api('/api/publicaciones', {
        method: 'POST',
        body: data
      })

      return res.data
    } catch (e: any) {
      console.error('crearPublicacion error', e)
      throw new Error(e?.data?.message || 'Error al crear publicación')
    }
  }

  /* =========================
     FLUJO COMPLETO
  ========================= */
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
      // 1️⃣ Crear trabajo
      const trabajoId = await crearTrabajo({
        ...trabajo,
        estado
      })

      // 2️⃣ Crear contactos
      if (Array.isArray(contactos)) {
        for (const c of contactos) {
          if (!c?.valor) continue
          await crearContacto(trabajoId, c)
        }
      }

      // 3️⃣ Subir imagen
      let imagenUrl: string | null = null

      if (imagen instanceof File) {
        imagenUrl = await subirImagen(trabajoId, imagen)
      }

      // 4️⃣ Crear publicación
      const publicacion = await crearPublicacion({
        trabajo_id: trabajoId,
        estado,
        imagen_url: imagenUrl
      })

      return {
        trabajoId,
        publicacion,
        imagenUrl
      }

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