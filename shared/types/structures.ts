export interface Provincia {
  id: string
  nombre: string
}

export interface Municipio {
  id: string
  nombre: string
  provincia_id: string
  provincia?: Provincia
}
