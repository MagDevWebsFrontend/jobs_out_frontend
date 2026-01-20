<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
      <p class="text-gray-600 mt-2">Accede a tu cuenta para continuar</p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <UiInput
        v-model="form.username"
        label="Nombre de usuario"
        type="text"
        placeholder="tu_usuario"
        required
        :error="errors.username"
      >
        <template #prefix>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </template>
      </UiInput>
      
      <UiInput
        v-model="form.password"
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        required
        :error="errors.password"
      >
        <template #prefix>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </template>
      </UiInput>
      
      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input type="checkbox" v-model="form.remember" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
          <span class="ml-2 text-sm text-gray-700">Recordarme</span>
        </label>
        
        <NuxtLink to="/auth/forgot-password" class="text-sm text-primary-600 hover:text-primary-500 font-medium">
          ¿Olvidaste tu contraseña?
        </NuxtLink>
      </div>
      
      <UiButton 
        type="submit" 
        :loading="loading" 
        class="w-full"
      >
        Iniciar sesión
      </UiButton>
    </form>
    
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
    </div>

    <div class="text-center text-sm text-gray-600">
      ¿No tienes una cuenta?
      <NuxtLink to="/auth/register" class="text-primary-600 hover:text-primary-500 font-medium ml-1">
        Regístrate aquí
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  username: '',
  password: '',
  remember: false
})

const errors = reactive<Record<string, string>>({})
const loading = ref(false)

// en components/auth/LoginForm (script setup)
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const handleSubmit = async () => {
  loading.value = true
  // validaciones...
  const result = await auth.login(form.username, form.password)
  if (result.success) {
    // redirigir al dashboard o al redirect query
    console.log("entro bien a la condi")
    const redirect = useRoute().query.redirect as string || '/jobs'
    navigateTo(redirect)
    console.log("debio redirigir")
  } else {
    // muestra error amigable
    errors.password = 'Credenciales incorrectas' // ejemplo
  }
  loading.value = false
}
</script>