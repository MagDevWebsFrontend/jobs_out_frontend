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
              type="button"
              @click="navigateBack"
              class="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="profile-form"
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

    <!-- Contenido -->
    <main class="container mx-auto px-4 py-8 max-w-6xl">
      <form
        id="profile-form"
        @submit.prevent="submitForm"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Columna izquierda -->
          <div class="space-y-6">
            <Input
              v-model="form.nombre"
              label="Nombre completo *"
              placeholder="Tu nombre completo"
              required
              :error="errors.nombre"
            />

            <ContactForm
              v-model:telefono="form.telefono_e164"
              v-model:email="form.email"
            />

            <p v-if="errors.email" class="text-sm text-red-600">
              {{ errors.email }}
            </p>

            <p v-if="errors.telefono_e164" class="text-sm text-red-600">
              {{ errors.telefono_e164 }}
            </p>
          </div>

          <!-- Columna derecha -->
          <div class="space-y-6">
            <!-- Avatar (placeholder por ahora) -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Foto de Perfil
              </h3>

              <div class="p-4 border border-dashed rounded-lg text-sm text-gray-500">
                La foto de perfil se podrá editar próximamente.
              </div>
            </div>

            <!-- Ubicación -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Ubicación
              </h3>

              <LocationSelector v-model="form.municipio_id" />

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
          <p class="text-gray-700 font-medium">
            Actualizando perfil...
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'form-layout',
  middleware: 'auth'
})

import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useApi } from '~/composables/useApi'

import ContactForm from '~/components/forms/ContactForm.vue'
import LocationSelector from '~/components/forms/LocationSelector.vue'
import Input from '~/components/ui/Input.vue'

/* =========================
   DEPENDENCIAS
========================= */
const router = useRouter()
const api = useApi()
const auth = useAuthStore()

/* =========================
   ESTADO
========================= */
const loading = ref(false)

const form = reactive({
  nombre: '',
  email: '',
  telefono_e164: '',
  municipio_id: '',
  avatar_url: null as string | null
})

const errors = reactive<Record<string, string>>({
  nombre: '',
  email: '',
  telefono_e164: '',
  municipio_id: ''
})

/* =========================
   CARGAR PERFIL
========================= */
onMounted(async () => {
  if (!auth.user?.id) return

  loading.value = true
  try {
    const res: any = await api(`/api/usuarios/${auth.user.id}`)

    Object.assign(form, {
      nombre: res.data.nombre,
      email: res.data.email,
      telefono_e164: res.data.telefono_e164,
      municipio_id: res.data.municipio_id,
      avatar_url: res.data.avatar_url ?? null
    })
  } catch (e) {
    console.error('Error cargando perfil', e)
  } finally {
    loading.value = false
  }
})

/* =========================
   VALIDACIÓN BÁSICA
========================= */
const validateForm = () => {
  Object.keys(errors).forEach(k => (errors[k] = ''))
  let valid = true

  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio'
    valid = false
  }

  if (!form.municipio_id) {
    errors.municipio_id = 'Seleccione un municipio'
    valid = false
  }

  return valid
}

/* =========================
   SUBMIT
========================= */
const submitForm = async () => {
  if (!validateForm()) return
  if (!auth.user?.id) return

  loading.value = true
  try {
    const res: any = await api(`/api/usuarios/${auth.user.id}`, {
      method: 'PUT',
      body: {
        nombre: form.nombre,
        email: form.email,
        telefono_e164: form.telefono_e164,
        municipio_id: form.municipio_id,
        avatar_url: null
      }
    })

    // 🔥 sincronizar auth store
    auth.user = {
      ...auth.user,
      ...res.data
    }

    await router.push('/profile')
  } catch (e: any) {
    if (e?.status === 409) {
      errors.email = 'Este correo ya está en uso'
    }
  } finally {
    loading.value = false
  }
}

/* =========================
   NAVEGACIÓN
========================= */
const navigateBack = () => {
  router.back()
}
</script>
