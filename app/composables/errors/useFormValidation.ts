import { ref, watch } from 'vue'

export const useFormValidation = (
  formData: Ref<any>,
  contact: Ref<any>,
  imageFile: Ref<File | null>
) => {
  const errors = ref<Record<string, string>>({})

  const isBlank = (value: any): boolean => {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim().length === 0
    return false
  }

  const phoneRegex = /^\+53\d{8}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  /* =============================
   * Watch salario
   * ============================= */
  watch(
    () => [formData.value.salario_min, formData.value.salario_max],
    ([min, max]) => {
      if (min > 0 && max > 0 && min > max) {
        formData.value.salario_max = min
      }
    }
  )

  /* =============================
   * Validación principal
   * ============================= */
  const validateForm = (estado: 'borrador' | 'publicado'): boolean => {
    errors.value = {}

    /* ===== Trabajo ===== */
    if (isBlank(formData.value.titulo)) {
      errors.value.titulo = 'El título del puesto es obligatorio'
    }

    if (isBlank(formData.value.descripcion)) {
      errors.value.descripcion = 'La descripción es obligatoria'
    }

    if (isBlank(formData.value.jornada)) {
      errors.value.jornada = 'Selecciona una jornada válida'
    }

    if (isBlank(formData.value.modo)) {
      errors.value.modo = 'Selecciona una modalidad válida'
    }

    if (isBlank(formData.value.municipio_id)) {
      errors.value.municipio_id = 'Selecciona un municipio'
    }

    /* ===== Salarios ===== */
    if (formData.value.salario_min <= 0) {
      errors.value.salario_min = 'El salario mínimo debe ser mayor que 0'
    }

    if (formData.value.salario_max <= 0) {
      errors.value.salario_max = 'El salario máximo debe ser mayor que 0'
    }

    /* ===== Contacto ===== */
    const telefono = contact.value.telefono
    const email = contact.value.email

    if (isBlank(telefono) && isBlank(email)) {
      errors.value.contacto = 'Debes proporcionar al menos un medio de contacto'
    }

    if (!isBlank(telefono) && !phoneRegex.test(telefono)) {
      errors.value.telefono = 'Formato inválido: +53XXXXXXXX'
    }

    if (!isBlank(email) && !emailRegex.test(email)) {
      errors.value.email = 'Correo electrónico inválido'
    }

    /* ===== Imagen (solo al publicar) ===== */
    if (estado === 'publicado') {
      if (!imageFile.value) {
        errors.value.imagen = 'Debes seleccionar una imagen'
      } else {
        const allowedTypes = ['image/jpeg', 'image/png']
        const maxSize = 2 * 1024 * 1024 // 2MB

        if (!allowedTypes.includes(imageFile.value.type)) {
          errors.value.imagen = 'Formato de imagen no permitido (JPG o PNG)'
        }

        if (imageFile.value.size > maxSize) {
          errors.value.imagen = 'La imagen no puede superar los 2MB'
        }
      }
    }

    return Object.keys(errors.value).length === 0
  }

  const clearErrors = () => {
    errors.value = {}
  }

  return {
    errors,
    validateForm,
    clearErrors
  }
}
