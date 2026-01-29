<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white/80 backdrop-blur sticky top-0 z-20 border-b">
      <div class="container mx-auto px-4 py-6 max-w-5xl">
        <h1 class="text-2xl sm:text-3xl font-semibold text-slate-900">Crear nueva publicación</h1>
        <p class="text-sm text-slate-500 mt-1">Completa los campos para publicar una oferta. Revisa bien antes de publicar.</p>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 max-w-5xl">
      <section class="bg-white rounded-2xl shadow-md p-6 sm:p-8" aria-labelledby="form-title">
        <h2 id="form-title" class="sr-only">Formulario de publicación</h2>

        <form class="space-y-8" @submit.prevent>
          <JobForm
            v-model:form="formData"
            :jornada-options="jornadaOptions"
            :modo-options="modoOptions"
          />

          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Experiencia requerida</label>
              <ExperienceSlider v-model="formData.experiencia_min" />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Rango salarial (CUP)</label>
              <SalaryInput v-model:min="formData.salario_min" v-model:max="formData.salario_max" />
            </div>
          </div>

          <BenefitsInput v-model="formData.beneficios" />

          <div class="grid gap-6 sm:grid-cols-2">
            <ContactForm v-model:telefono="contact.telefono" v-model:email="contact.email" />
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Imagen destacada</label>
              <ImageUpload v-model="imageFile" />
              <p class="text-xs text-slate-400 mt-2">Formato JPG/PNG. Máx recommended 2MB.</p>
            </div>
          </div>

          <!-- acciones -->
          <div class="flex flex-col sm:flex-row items-center justify-end gap-3 mt-2">
            <button
              type="button"
              class="w-full sm:w-auto px-5 py-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition disabled:opacity-60"
              :disabled="loading"
              @click="saveDraft"
            >
              <span v-if="!loading">Guardar borrador</span>
              <span v-else>Guardando...</span>
            </button>

            <button
              type="button"
              class="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition disabled:opacity-60"
              :disabled="loading"
              @click="publish"
            >
              <span v-if="!loading">Publicar ahora</span>
              <span v-else>Publicando...</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>
  <Toast
  :visible="unref(toast.visible)"
  :message="unref(toast.message)"
  :type="unref(toast.type)"
  />
</template>

<script setup lang="ts">
import { useHead } from '#app'
import JobForm from '~/components/forms/JobForm.vue'
import BenefitsInput from '~/components/forms/BenefitsInput.vue'
import ContactForm from '~/components/forms/ContactForm.vue'
import ExperienceSlider from '~/components/forms/ExperienceSlider.vue'
import ImageUpload from '~/components/forms/ImageUpload.vue'
import SalaryInput from '~/components/forms/SalaryInput.vue'
import { useCrearPublicacion } from '~/composables/useCrearPublicacion'
import { useApi } from '~/composables/useApi'
import { useRouter } from '#imports'
import Toast from '~/components/ui/Toast.vue'
import { useToast } from '~/composables/useToast'


useHead({
  title: 'Crear publicación - Empleos',
  meta: [
    { name: 'description', content: 'Publica una oferta de trabajo en nuestra plataforma.' },
    { property: 'og:title', content: 'Crear publicación - Empleos' },
    { property: 'og:description', content: 'Publica una oferta de trabajo en nuestra plataforma.' }
  ]
})

const api = useApi()
const router = useRouter()
const { crearPublicacionCompleta, loading } = useCrearPublicacion()
const toast = useToast()

const imageFile = ref<File | null>(null)

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

const jornadaOptions = ref([
  { value: 'tiempo_completo', label: 'Tiempo Completo' },
  { value: 'tiempo_parcial', label: 'Tiempo Parcial' },
  { value: 'por_turnos', label: 'Por Turnos' }
])

const modoOptions = ref([
  { value: 'presencial', label: 'Presencial' },
  { value: 'remoto', label: 'Remoto' },
  { value: 'hibrido', label: 'Híbrido' }
])

onMounted(async () => {
  try {
    const res: any = await api('/api/trabajos/options')
    if (res?.success && res.data) {
      if (Array.isArray(res.data.jornadas)) jornadaOptions.value = res.data.jornadas.map((j: string) => ({ value: j, label: j }))
      if (Array.isArray(res.data.modos)) modoOptions.value = res.data.modos.map((m: string) => ({ value: m, label: m }))
    }
  } catch {
    // fallback por defecto
    console.warn('No se pudo cargar opciones del backend — usando fallback')
  }
})

// helpers
const resetForm = () => {
  formData.value = {
    titulo: '',
    descripcion: '',
    jornada: '',
    modo: '',
    experiencia_min: 0,
    salario_min: 0,
    salario_max: 0,
    municipio_id: '',
    beneficios: []
  }
  contact.value = { telefono: '', email: '' }
  imageFile.value = null
}

const showSuccess = (msg: string) => {
  // simple, configurable: puedes reemplazar por un toast más bonito
  // usar alert evita introducir dependencias nuevas
  alert(msg)
}

const saveDraft = async () => {
  try {
    const result = await crearPublicacionCompleta({
      trabajo: formData.value,
      contactos: [
        { tipo: 'telefono', valor: contact.value.telefono },
        { tipo: 'email', valor: contact.value.email }
      ],
      imagen: imageFile.value,
      estado: 'borrador'
    })
    toast.show('Borrador guardado correctamente', 'success')
    resetForm()
    router.push('/jobs')
    return result
  } catch (e: any) {
    console.error(e)
    toast.show('Error al guardar borrador', 'error')
    throw e
  }
}

const publish = async () => {
  try {
    const result = await crearPublicacionCompleta({
      trabajo: formData.value,
      contactos: [
        { tipo: 'telefono', valor: contact.value.telefono },
        { tipo: 'email', valor: contact.value.email }
      ],
      imagen: imageFile.value,
      estado: 'publicado'
    })

    toast.show('🎉 Publicación creada con éxito', 'success')
    resetForm()
    router.push('/jobs')
    return result
  } catch (e: any) {
    console.error(e)
    toast.show('Error al crear la publicación', 'error')
    throw e
  }
}

definePageMeta({
  layout: 'form-layout'
})
</script>
