export interface ProvinciaEntity {
  id: string
  nombre: string
}

export interface MunicipioEntity {
  id: string
  nombre: string
  provincia_id: string
  provincia?: ProvinciaEntity
}
