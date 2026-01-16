<!-- pages/jobs/formJob.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow mb-8">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
          Crear Nueva Publicación
        </h1>
        <p class="text-gray-600 mt-2">
          Completa todos los campos para publicar una nueva oferta de trabajo
        </p>
      </div>
    </header>
    
    <!-- Formulario -->
    <div class="container mx-auto px-4 pb-8 max-w-4xl">
      <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          
          <!-- Componente 1: JobForm -->
          <JobForm v-model:form="formData" />
          
          <!-- Componente 2: ExperienceSlider -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-800 mb-4">
              Experiencia Requerida
            </h3>
            <ExperienceSlider v-model="formData.experiencia_min" />
          </div>
          
          <!-- Componente 3: SalaryInput -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-800 mb-4">
              Rango Salarial (CUP)
            </h3>
            <SalaryInput
              v-model:min="formData.salario_min"
              v-model:max="formData.salario_max"
            />
          </div>
          
          <!-- Componente 4: BenefitsInput -->
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              Beneficios Ofrecidos
            </h2>
            <BenefitsInput v-model="formData.beneficios" />
          </div>
          
          <!-- Componente 5: ContactForm -->
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              Contacto
            </h2>
            <ContactForm
              v-model:telefono="contact.telefono"
              v-model:email="contact.email"
            />
          </div>
          
          <!-- Componente 6: ImageUpload -->
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              Imagen Destacada
            </h2>
            <ImageUpload v-model="imageFile" />
          </div>
          
          <!-- Botones -->
          <div class="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t">
            <button
              type="button"
              @click="saveDraft"
              :disabled="loading"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition',
                loading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              ]"
            >
              {{ loading ? 'Guardando...' : 'Guardar Borrador' }}
            </button>
            
            <button
              type="button"
              @click="publish"
              :disabled="loading"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition',
                loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              ]"
            >
              {{ loading ? 'Publicando...' : 'Publicar Ahora' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import BenefitsInput from '~/components/forms/BenefitsInput.vue'
import ContactForm from '~/components/forms/ContactForm.vue'
import ExperienceSlider from '~/components/forms/ExperienceSlider.vue'
import ImageUpload from '~/components/forms/ImageUpload.vue'
import JobForm from '~/components/forms/JobForm.vue'
import SalaryInput from '~/components/forms/SalaryInput.vue'

definePageMeta({
  layout: 'form-layout'
})

const loading = ref(false)
const imageFile = ref(null)

const formData = ref({
  titulo: '',
  descripcion: '',
  jornada: '',
  modo: '',
  experiencia_min: 0,
  salario_min: 0,
  salario_max: 0,
  municipio_id: '',
  beneficios: []
})

const contact = ref({
  telefono: '',
  email: ''
})

// Métodos para guardar/publicar
const saveDraft = async () => {
  loading.value = true
  console.log('Guardando borrador...', {
    trabajo: { ...formData.value, estado: 'borrador' },
    contactos: [
      { tipo: 'telefono', valor: contact.value.telefono },
      { tipo: 'email', valor: contact.value.email }
    ],
    imagen: imageFile.value
  })
  
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
  alert('Borrador guardado exitosamente')
}

const publish = async () => {
  loading.value = true
  console.log('Publicando...', {
    trabajo: { ...formData.value, estado: 'publicado' },
    contactos: [
      { tipo: 'telefono', valor: contact.value.telefono },
      { tipo: 'email', valor: contact.value.email }
    ],
    imagen: imageFile.value
  })
  
  await new Promise(resolve => setTimeout(resolve, 1500))
  loading.value = false
  alert('Publicación creada exitosamente')
}
</script>