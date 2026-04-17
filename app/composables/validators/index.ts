// composables/validators/index.ts
import { ref } from 'vue'

export const isBlank = (v: any) => {
  if (v === null || v === undefined) return true
  if (typeof v === 'string') return v.trim().length === 0
  return false
}

export const phoneRegex = /^\+53\d{8}$/
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateImageFile(file: File | null, { required = false } = {}) {
  const errors: Record<string, string> = {}
  if (required && !file) {
    errors.imagen = 'Debes seleccionar una imagen'
    return errors
  }
  if (!file) return errors

  const allowedTypes = ['image/jpeg', 'image/png']
  const maxSize = 2 * 1024 * 1024 // 2MB

  if (!allowedTypes.includes(file.type)) {
    errors.imagen = 'Formato de imagen no permitido (JPG o PNG)'
  }
  if (file.size > maxSize) {
    errors.imagen = 'La imagen no puede superar los 2MB'
  }
  return errors
}

/** Validate a job form (reutiliza isBlank / regex) */
export function validateJobForm(formData: any, contact: any, imageFile: File | null, estado: 'borrador'|'publicado' = 'borrador') {
  const errors: Record<string, string> = {}

  // Trabajo
  if (isBlank(formData.titulo)) errors.titulo = 'El título del puesto es obligatorio'
  if (isBlank(formData.descripcion)) errors.descripcion = 'La descripción es obligatoria'
  if (isBlank(formData.jornada)) errors.jornada = 'Selecciona una jornada válida'
  if (isBlank(formData.modo)) errors.modo = 'Selecciona una modalidad válida'
  if (isBlank(formData.municipio_id)) errors.municipio_id = 'Selecciona un municipio'

  // Salarios
  if (Number(formData.salario_min) <= 0) errors.salario_min = 'El salario mínimo debe ser mayor que 0'
  if (Number(formData.salario_max) <= 0) errors.salario_max = 'El salario máximo debe ser mayor que 0'
  if (Number(formData.salario_min) > 0 && Number(formData.salario_max) > 0 && Number(formData.salario_min) > Number(formData.salario_max)) {
    errors.salario = 'El salario mínimo no puede ser mayor que el máximo'
  }

  // Contacto
  const telefono = contact?.telefono
  const email = contact?.email
  if (isBlank(telefono) && isBlank(email)) errors.contacto = 'Debes proporcionar al menos un medio de contacto'
  if (!isBlank(telefono) && !phoneRegex.test(telefono)) errors.telefono = 'Formato inválido: +53XXXXXXXX'
  if (!isBlank(email) && !emailRegex.test(email)) errors.email = 'Correo electrónico inválido'

  // Imagen (solo publicar)
  if (estado === 'publicado') {
    Object.assign(errors, validateImageFile(imageFile, { required: true }))
  } else {
    Object.assign(errors, validateImageFile(imageFile, { required: false }))
  }

  return errors
}
