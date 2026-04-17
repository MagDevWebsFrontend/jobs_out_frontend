<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900">Crear cuenta</h1>
      <p class="text-gray-600 mt-2">Comienza tu experiencia en Jobs Out</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <UiInput
        v-model="form.nombre"
        label="Nombre completo"
        placeholder="Juan Pérez"
        required
        :error="errors.nombre"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <UiInput
            v-model="form.username"
            label="Nombre de usuario"
            placeholder="juanperez"
            required
            :error="errors.username"
          />

          <!-- Estado username -->
          <p v-if="usernameChecking" class="mt-1 text-xs text-gray-500">
            Verificando disponibilidad…
          </p>
          <p v-else-if="usernameAvailable === true" class="mt-1 text-xs text-green-600">
            Usuario disponible ✓
          </p>
          <p v-else-if="usernameAvailable === false" class="mt-1 text-xs text-red-600">
            Usuario no disponible ✗
          </p>
        </div>

        <UiInput
          v-model="form.telefono_e164"
          label="Teléfono"
          placeholder="+5341412345"
          required
          :error="errors.telefono_e164"
        />
      </div>

      <UiInput
        v-model="form.email"
        label="Correo electrónico"
        type="email"
        placeholder="tu@email.com"
        required
        :error="errors.email"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UiInput
          v-model="form.password"
          label="Contraseña"
          type="password"
          required
          :error="errors.password"
        />
        <UiInput
          v-model="form.confirmPassword"
          label="Confirmar contraseña"
          type="password"
          required
          :error="errors.confirmPassword"
        />
      </div>

      <!-- Ubicación -->
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">
          Ubicación *
        </label>

        <LocationSelector
          v-model="form.municipio_id"
          :errors="errors"
        />

        <p v-if="errors.municipio_id" class="text-sm text-red-600 mt-1">
          {{ errors.municipio_id }}
        </p>
      </div>


      <div class="flex items-start">
        <input type="checkbox" v-model="form.terms" class="mt-1" />
        <span class="ml-2 text-sm">Acepto los términos</span>
      </div>

      <UiButton
        type="submit"
        class="w-full"
        :loading="loading"
        :disabled="!form.terms || usernameAvailable !== true"
      >
        Crear cuenta
      </UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useApi } from '~/composables/useApi'
import LocationSelector from '~/components/forms/LocationSelector.vue'
import { useAuthStore } from '~/stores/auth'

const api = useApi()
const auth = useAuthStore()

/* ===========================
   FORM
=========================== */
const form = reactive({
  nombre: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  telefono_e164: '',
  municipio_id: '',
  terms: false
})

const errors = reactive<Record<string, string>>({})
const loading = ref(false)

/* ===========================
   USERNAME CHECK
=========================== */
const usernameChecking = ref(false)
const usernameAvailable = ref<boolean | null>(null)
const lastCheckedUsername = ref('')

const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 500) => {
  let t: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

const checkUsername = async (username: string) => {
  // 🔒 validación básica
  if (!username || username.length < 3) {
    usernameAvailable.value = null
    return
  }

  lastCheckedUsername.value = username
  usernameChecking.value = true

  try {
    const res = await api<{ available: boolean }>(
      '/api/auth/availability',
      { params: { username } }
    )

    // 🧠 evitar race conditions
    if (lastCheckedUsername.value === username) {
      usernameAvailable.value = res.available
    }

  } catch {
    usernameAvailable.value = null
  } finally {
    if (lastCheckedUsername.value === username) {
      usernameChecking.value = false
    }
  }
}

const debouncedCheck = debounce(checkUsername, 500)

watch(() => form.username, (val) => {
  errors.username = ''
  usernameAvailable.value = null

  if (!val || val.length < 3) return

  debouncedCheck(val)
})
/* ===========================
   SUBMIT
=========================== */
const handleSubmit = async () => {
  // Reset errores
  Object.keys(errors).forEach(k => (errors[k] = ''))

  if (!form.municipio_id) {
    errors.municipio_id = 'Seleccione una ubicación'
    return
  }

  if (usernameAvailable.value === false) {
    errors.username = 'Usuario no disponible'
    return
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
    return
  }

  loading.value = true
  try {
    const result = await auth.register({
      nombre: form.nombre,
      username: form.username,
      email: form.email,
      password: form.password, // 🔥 CORRECTO
      telefono_e164: form.telefono_e164,
      municipio_id: form.municipio_id
    })

    if (!result.success) {
      throw result.error
    }

    // 🔥 AUTO LOGIN + REDIRECCIÓN
    await navigateTo('/profile/edit')

  } catch (err: any) {
    if (err?.status === 409) {
      errors.username = 'Usuario ya existe'
    } else if (err?.data?.message) {
      // opcional: manejar errores del backend
      console.error(err.data.message)
    }
  } finally {
    loading.value = false
  }
}
</script>


