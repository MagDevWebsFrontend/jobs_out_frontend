<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
  <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">

    <div class="text-center">
      <h1 class="text-2xl font-semibold text-slate-900">
        Cambiar contraseña
      </h1>
      <p class="text-sm text-slate-500 mt-1">
        Usa una contraseña segura y única
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">

      <UiInput
        v-model="form.password"
        label="Contraseña actual"
        type="password"
        required
        :error="errors.password"
      />

      <UiInput
        v-model="form.passwordNew"
        label="Nueva contraseña"
        type="password"
        required
        :error="errors.passwordNew"
      />

      <button
        type="submit"
        class="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
        :disabled="loading"
      >
        <span v-if="!loading">Actualizar contraseña</span>
        <span v-else>Cambiando...</span>
      </button>

    </form>

    <div class="text-center">
      <NuxtLink
        to="/auth/forgot-password"
        class="text-sm text-blue-600 hover:underline"
      >
        ¿Olvidaste tu contraseña?
      </NuxtLink>
    </div>

  </div>
</div>

<Toast
  :visible="unref(toast.visible)"
  :message="unref(toast.message)"
  :type="unref(toast.type)"
/>
</template>

<script setup lang="ts">
import Toast from '~/components/ui/Toast.vue'


  definePageMeta({
  layout: 'form-layout'
})
const form = reactive({
  password: '',
  passwordNew: ''
})

const errors = reactive<Record<string, string>>({})
const { cambiarContrasena, loading } = useProfile()
const toast = useToast()

const handleSubmit = async () => {
  try {
    await cambiarContrasena({
      currentPassword: form.password,
      newPassword: form.passwordNew
    })

    toast.show('Contraseña actualizada correctamente', 'success')

    navigateTo('/profile')
  } catch (e: any) {
    console.error(e)
    errors.password = 'Credenciales incorrectas'
    toast.show(e.message || 'Error al cambiar contraseña', 'error')
  }
}
</script>