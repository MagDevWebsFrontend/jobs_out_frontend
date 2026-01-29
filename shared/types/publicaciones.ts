// types/publicaciones.ts
export interface Provincia {
  id: string
  nombre: string
  created_at: string
}

export interface Municipio {
  id: string
  provincia_id: string
  nombre: string
  created_at: string
  provincia: Provincia
}

export interface Autor {
  id: string
  nombre: string
  apellidos: string
  username: string
  avatar_url: string | null
}

export interface Trabajo {
  id: string
  autor_id: string
  titulo: string
  descripcion: string
  experiencia_min: number
  jornada: 'tiempo_completo' | 'medio_tiempo' | 'por_horas' | 'flexible'
  modo: 'presencial' | 'hibrido' | 'remoto'
  municipio_id: string
  estado: 'borrador' | 'publicado' | 'cerrado'
  created_at: string
  updated_at: string
  deleted_at: string | null
  municipio: Municipio
}

export interface Publicacion {
  id: string
  trabajo_id: string
  autor_id: string
  publicado_en: string
  estado: 'publicado' | 'oculto' | 'eliminado'
  created_at: string
  updated_at: string
  imagen_url: string 
  trabajo: Trabajo
  autor: Autor
}

export interface PublicacionesResponse {
  message: any
  success: boolean
  data: Publicacion[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}