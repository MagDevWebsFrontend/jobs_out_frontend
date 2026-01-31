// shared/types/user.ts

export interface Provincia {
  id: string
  nombre: string
  created_at: string
}

export interface Municipio {
  id: string
  nombre: string
  provincia_id: string
  created_at: string
  provincia?: Provincia
}

export interface User {
  id: string

  username: string
  email: string

  nombre: string
  apellidos: string | null

  rol: 'admin' | 'trabajador'
  permissions?: string[]

  isAdmin?: boolean

  avatar_url: string | null
  telefono_e164: string | null

  municipio_id: string | null
  municipio?: Municipio

  created_at: string
  updated_at: string
  deleted_at: string | null

  configuracion?: {
    telegram_notif: boolean
  }
}
