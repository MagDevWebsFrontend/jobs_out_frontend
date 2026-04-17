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
              class="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="profile-form"
              :disabled="loading"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
        class="bg-white rounded-xl shadow-sm border p-6 md:p-8"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <!-- IZQUIERDA -->
          <div class="space-y-6">
            <Input
              v-model="form.nombre"
              label="Nombre completo *"
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

          <!-- DERECHA -->
          <div class="space-y-6">

            <!-- AVATAR -->
            <div>
              <h3 class="text-lg font-semibold mb-4">
                Foto de Perfil
              </h3>

              <ImageUpload v-model="avatarFile" />

              <img
                v-if="avatarPreview || form.avatar_url"
                :src="avatarPreview || form.avatar_url"
                class="mt-4 w-24 h-24 rounded-full object-cover border"
              />
            </div>

            <!-- UBICACIÓN -->
            <div>
              <h3 class="text-lg font-semibold mb-4">
                Ubicación
              </h3>

              <LocationSelector v-model="form.municipio_id" />

              <p v-if="errors.municipio_id" class="text-sm text-red-600 mt-1">
                {{ errors.municipio_id }}
              </p>
            </div>

          </div>
        </div>
      </form>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg p-8 text-center">
          <div class="animate-spin h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Actualizando perfil...</p>
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

import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useApi } from '~/composables/useApi'

import ContactForm from '~/components/forms/ContactForm.vue'
import LocationSelector from '~/components/forms/LocationSelector.vue'
import Input from '~/components/ui/Input.vue'
import ImageUpload from '~/components/forms/ImageUpload.vue'

const router = useRouter()
const api = useApi()
const auth = useAuthStore()

const loading = ref(false)

const avatarFile = ref<File | null>(null)
const avatarPreview = ref<string | null>(null)

const form = reactive({
  nombre: '',
  email: '',
  telefono_e164: '',
  municipio_id: '',
  avatar_url: undefined as string | undefined
})

const errors = reactive<Record<string, string>>({
  nombre: '',
  email: '',
  telefono_e164: '',
  municipio_id: ''
})

/* =========================
   PREVIEW
========================= */
watch(avatarFile, (file) => {
  if (avatarPreview.value) {
    URL.revokeObjectURL(avatarPreview.value)
  }

  avatarPreview.value = file
    ? URL.createObjectURL(file)
    : null
})

/* =========================
   LOAD USER
========================= */
onMounted(async () => {
  if (!auth.user) {
    await auth.fetchMe()
  }

  if (!auth.user) return

  Object.assign(form, {
    nombre: auth.user.nombre,
    email: auth.user.email,
    telefono_e164: auth.user.telefono_e164,
    municipio_id: auth.user.municipio_id,
    avatar_url: auth.user.avatar_url ?? undefined
  })
})

/* =========================
   VALIDATION
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
    let avatarUrl = form.avatar_url

    // 🔥 subir avatar
    if (avatarFile.value) {
      const fd = new FormData()
      fd.append('imagen', avatarFile.value)

      const uploadRes: any = await api('/api/uploads/avatar', {
        method: 'POST',
        body: fd
      })

      avatarUrl = uploadRes.data.url
    }

    const res: any = await api(`/api/usuarios/${auth.user.id}`, {
      method: 'PUT',
      body: {
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono_e164: form.telefono_e164,
        municipio_id: form.municipio_id,
        avatar_url: avatarUrl
      }
    })

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

const navigateBack = () => router.back()
</script>