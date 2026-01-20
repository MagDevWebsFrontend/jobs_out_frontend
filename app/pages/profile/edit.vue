<!-- pages/profile/edit.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow mb-8">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
              Editar Perfil de Usuario
            </h1>
            <p class="text-gray-600 mt-1">
              Actualiza tu información personal
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <button
              @click="navigateBack"
              class="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="submitForm"
              :disabled="loading"
              class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading">Guardando...</span>
              <span v-else>Guardar Cambios</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Contenido principal -->
    <main class="container mx-auto px-4 py-8 max-w-6xl">
      <form @submit.prevent="submitForm" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Columna izquierda -->
          <div class="space-y-6">
            <!-- Nombre con Input component (COMENTADO) -->
            <Input
              v-model="form.nombre"
              label="Nombre completo *"
              placeholder="Tu nombre completo"
              required
              :error="errors.nombre"
            />
            
            <!-- Teléfono con ContactForm (COMENTADO) -->
            <ContactForm
              v-model:telefono="form.telefono_e164"
              v-model:email="form.email"
            />
            
            
          </div>
          
          <!-- Columna derecha -->
          <div class="space-y-6">
            <!-- Avatar con ImageUpload component (COMENTADO) -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Foto de Perfil
              </h3>
              <div class="max-w-xs">
                <ImageUpload
                  v-model="form.avatar_file"
                  :initial-preview="form.avatar_url"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Esta imagen se mostrará en tu perfil público
              </p>
            </div>
            
            <!-- Municipio con LocationSelector (COMENTADO) -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Ubicación
              </h3>
              <LocationSelector
                v-model="form.municipio_id"
              />
              <p v-if="errors.municipio_id" class="mt-1 text-sm text-red-600">
                {{ errors.municipio_id }}
              </p>
            </div>
          </div>
        </div>
      </form>
      
      <!-- Loading overlay -->
      <div
        v-if="loading"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg p-8 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-700 font-medium">Actualizando perfil...</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'form-layouta'
})

import { ref, reactive, onMounted } from 'vue'
import ContactForm from '~/components/forms/ContactForm.vue'
import ImageUpload from '~/components/forms/ImageUpload.vue'
import LocationSelector from '~/components/forms/LocationSelector.vue'
import Input from '~/components/ui/Input.vue'


const router = useRouter()
const route = useRoute()
const userId = route.params.id
const fileInput = ref(null)

// Estados
const loading = ref(false)
const imagePreview = ref('')
const form = reactive({
  nombre: '',
  email: '',
  telefono_e164: '',
  municipio_id: '',
  avatar_url: '',
  avatar_file: null
})

const errors = reactive({
  nombre: '',
  email: '',
  telefono_e164: '',
  municipio_id: ''
})

// Cargar datos iniciales
onMounted(async () => {
  await fetchUserData()
})

const fetchUserData = async () => {
  try {
    loading.value = true
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Datos de ejemplo
    form.nombre = 'Juan Pérez'
    form.email = 'juan@ejemplo.com'
    form.telefono_e164 = '+53 51234567'
    form.municipio_id = '102'
    form.avatar_url = 'https://via.placeholder.com/150/3b82f6/ffffff?text=JP'
    imagePreview.value = form.avatar_url
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

// Manejar subida de imagen
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    form.avatar_file = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  form.avatar_file = null
  form.avatar_url = ''
  imagePreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Limpiar error
const clearError = (field) => {
  if (errors[field]) {
    errors[field] = ''
  }
}

// Navegar atrás
const navigateBack = () => {
  router.back()
}

// Validación
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre es requerido'
    isValid = false
  }
  
  if (!form.email.trim()) {
    errors.email = 'El correo es requerido'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Correo electrónico inválido'
    isValid = false
  }
  
  if (form.telefono_e164 && !/^\+\d[\d\s\-\(\)]+$/.test(form.telefono_e164)) {
    errors.telefono_e164 = 'Formato de teléfono inválido. Use formato internacional: +53 5xxxxxxx'
    isValid = false
  }
  
  return isValid
}

// Enviar formulario
const submitForm = async () => {
  if (!validateForm()) return
  
  try {
    loading.value = true
    
    // Simular llamada a API
    console.log('Enviando datos:', form)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Éxito
    alert('¡Perfil actualizado exitosamente!')
    router.push(`/profile/${userId}`)
    
  } catch (error) {
    console.error('Error:', error)
    alert('Error al actualizar el perfil')
  } finally {
    loading.value = false
  }
}
</script>