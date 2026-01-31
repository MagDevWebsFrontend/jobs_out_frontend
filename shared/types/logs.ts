// shared/types/log.ts

export type LogAccion =
  | 'INSERT'
  | 'UPDATE'
  | 'DELETE'
  | 'GUARDAR'
  | 'ELIMINAR_GUARDADO'

export interface LogUsuario {
  id: string
  username: string
  rol: 'admin' | 'trabajador'
}

export interface LogDetalles {
  anterior?: Record<string, any>
  nuevo?: Record<string, any>
  eliminado?: Record<string, any>
  campos_modificados?: Record<
    string,
    {
      de: any
      a: any
    }
  >
  timestamp?: string
}

export interface Log {
  id: string
  usuario_id: string | null
  accion: LogAccion
  entidad: string | null
  entidad_id: string | null
  detalles: LogDetalles | null
  ip: string | null
  user_agent: string | null
  created_at: string

  // Incluido por la API (JOIN)
  usuario?: LogUsuario | null
}
