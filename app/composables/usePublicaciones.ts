// composables/usePublicaciones.ts
import type { Publicacion, PublicacionesResponse } from '#shared/types/publicaciones'

interface FiltrosPublicaciones {
  estado?: string
  provincia_id?: string
  municipio_id?: string
  modo?: string
  jornada?: string
  busqueda?: string
  experiencia_min?: number
  limit?: number
  offset?: number
}

export const usePublicaciones = () => {
  // Estado
  const publicaciones = ref<Publicacion[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)
  const hasMore = ref(false)
  const busquedaActiva = ref(false)
  
  // Datos para filtros
  const provincias = ref<Array<{ id: string; nombre: string }>>([])
  const municipios = ref<Array<{ id: string; nombre: string; provincia_id: string }>>([])
  
  // Filtros actuales
  const filtros = reactive<FiltrosPublicaciones>({
    estado: 'publicado',
    busqueda: '',
    provincia_id: '',
    municipio_id: '',
    modo: '',
    jornada: '',
    limit: 50,
    offset: 0
  })

  // Función principal para obtener publicaciones
  const obtenerPublicaciones = async (filtrosPersonalizados?: FiltrosPublicaciones) => {
    loading.value = true
    error.value = null
    
    try {
      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      
      // Usar filtros personalizados o los actuales
      const filtrosAAplicar = filtrosPersonalizados || filtros
      
      // Actualizar estado de búsqueda
      busquedaActiva.value = !!filtrosAAplicar.busqueda
      
      // Construir query string
      const queryParams = new URLSearchParams()
      
      // Siempre incluir estado=publicado
      queryParams.append('estado', 'publicado')
      
      // Agregar otros filtros si tienen valor
      Object.entries(filtrosAAplicar).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null && key !== 'estado') {
          queryParams.append(key, String(value))
        }
      })
      
      const url = `${apiBaseUrl}/api/publicaciones?${queryParams.toString()}`
      
      const response = await $fetch<PublicacionesResponse>(url, {
        headers: { 'Accept': 'application/json' },
        timeout: 30000
      })
      
      if (response.success && response.data) {
        if (filtros.offset && filtros.offset > 0) {
          publicaciones.value.push(...response.data)
        } else {
          publicaciones.value = response.data
        }
        total.value = response.pagination?.total || 0
        hasMore.value = response.pagination?.hasMore || false
        
        // Extraer provincias y municipios
        extraerUbicaciones()
      } else {
        throw new Error(response.message || 'Error al obtener publicaciones')
      }
    } catch (err: any) {
      error.value = err.message || 'Error al cargar las publicaciones'
      publicaciones.value = []
    } finally {
      loading.value = false
    }
  }

  // Extraer provincias y municipios de las publicaciones
  const extraerUbicaciones = () => {
    const provinciasMap = new Map<string, { id: string; nombre: string }>()
    const municipiosMap = new Map<string, { id: string; nombre: string; provincia_id: string }>()
    
    publicaciones.value.forEach((pub: { trabajo: { municipio: any } }) => {
      const municipio = pub.trabajo?.municipio
      const provincia = municipio?.provincia
      
      if (provincia && !provinciasMap.has(provincia.id)) {
        provinciasMap.set(provincia.id, {
          id: provincia.id,
          nombre: provincia.nombre
        })
      }
      
      if (municipio && !municipiosMap.has(municipio.id)) {
        municipiosMap.set(municipio.id, {
          id: municipio.id,
          nombre: municipio.nombre,
          provincia_id: municipio.provincia_id
        })
      }
    })
    
    provincias.value = Array.from(provinciasMap.values())
    municipios.value = Array.from(municipiosMap.values())
  }

  // Cargar todas las publicaciones inicialmente
  const cargarInicial = async () => {
    // Si hay una búsqueda activa, no cargar todas
    if (busquedaActiva.value) return
    
    await obtenerPublicaciones({ estado: 'publicado', limit: 50 })
  }

  // Aplicar filtros actuales
  const aplicarFiltros = async () => {
    await obtenerPublicaciones()
  }

  // Buscar por texto
  const buscarPorTexto = async (texto: string) => {
    filtros.busqueda = texto
    await aplicarFiltros()
  }

  // Limpiar todos los filtros
  const limpiarFiltros = async () => {
    // Resetear filtros
    filtros.busqueda = ''
    filtros.provincia_id = ''
    filtros.municipio_id = ''
    filtros.modo = ''
    filtros.jornada = ''
    filtros.offset = 0
    busquedaActiva.value = false
    
    // Cargar todas las publicaciones
    await obtenerPublicaciones({ estado: 'publicado', limit: 50 })
  }

  // Limpiar solo la búsqueda de texto
  const limpiarBusqueda = async () => {
    // Solo limpiar la búsqueda, mantener otros filtros si existen
    filtros.busqueda = ''
    busquedaActiva.value = false
    
    // Si hay otros filtros activos, mantenerlos
    if (filtros.provincia_id || filtros.municipio_id || filtros.modo || filtros.jornada) {
      await aplicarFiltros()
    } else {
      // Si no hay otros filtros, cargar todas
      await obtenerPublicaciones({ estado: 'publicado', limit: 50 })
    }
  }

  // Cargar más resultados
  const cargarMas = async () => {
    if (!hasMore.value) return
    
    try {
      filtros.offset = publicaciones.value.length
      await aplicarFiltros()
    } catch (err) {
      console.error('Error cargando más resultados:', err)
    }
  }

  const aplicarFiltrosConFiltros = async (filtrosExternos: {
    provincia_id?: string
    municipio_id?: string
    modo?: string
    jornada?: string
    experiencia_min?: number
  }) => {
    // Actualizar filtros con los valores externos
    if (filtrosExternos.provincia_id !== undefined) filtros.provincia_id = filtrosExternos.provincia_id
    if (filtrosExternos.municipio_id !== undefined) filtros.municipio_id = filtrosExternos.municipio_id
    if (filtrosExternos.modo !== undefined) filtros.modo = filtrosExternos.modo
    if (filtrosExternos.jornada !== undefined) filtros.jornada = filtrosExternos.jornada
    
    // Aplicar filtros
    await aplicarFiltros()
  }

  // Filtrar por experiencia localmente
  const filtrarPorExperienciaLocal = (experiencia: number) => {
    if (experiencia === 0) {
      return publicaciones.value
    }
    
    return publicaciones.value.filter((pub: { trabajo: { experiencia_min: number } }) => 
      pub.trabajo?.experiencia_min >= experiencia
    )
  }

  // Método para resetear busquedaActiva desde fuera
  const resetearBusquedaActiva = () => {
    busquedaActiva.value = false
  }


  return {
    // Estado
    publicaciones,
    loading,
    error,
    total,
    hasMore,
    busquedaActiva,
    
    // Datos para filtros
    provincias,
    municipios,
    
    // Filtros
    filtros,
    
    // Métodos
    obtenerPublicaciones,
    cargarInicial,
    aplicarFiltros,
    buscarPorTexto,
    limpiarFiltros,
    limpiarBusqueda,
    cargarMas,
    aplicarFiltrosConFiltros,
    filtrarPorExperienciaLocal,
    resetearBusquedaActiva
  }
}