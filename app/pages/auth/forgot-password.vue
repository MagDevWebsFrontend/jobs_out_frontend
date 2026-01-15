<template>
  <div class="space-y-6">
    <div class="text-center">
      <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-900">Recuperar contraseña</h1>
      <p class="text-gray-600 mt-2">
        Te enviaremos un enlace para restablecer tu contraseña
      </p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <UiInput
        v-model="form.username"
        label="Nombre de usuario o correo"
        type="text"
        placeholder="tu_usuario o tu@email.com"
        required
        :error="errors.username"
      >
        <template #prefix>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </template>
      </UiInput>
      
      <UiButton 
        type="submit" 
        :loading="loading" 
        class="w-full"
      >
        Enviar enlace de recuperación
      </UiButton>
    </form>
    
    <div class="text-center text-sm text-gray-600">
      ¿Recordaste tu contraseña?
      <NuxtLink to="/auth/login" class="text-primary-600 hover:text-primary-500 font-medium ml-1">
        Inicia sesión
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
  layout: 'auth',
  // middleware: 'guest' // Descomentar cuando implementes middleware de autenticación
})
const form = reactive({
  username: ''
})

const errors = reactive<Record<string, string>>({})
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  errors.username = ''
  
  if (!form.username.trim()) {
    errors.username = 'Por favor ingresa tu usuario o correo'
  }
  
  if (!errors.username) {
    // Simulación de envío
    console.log('Password recovery request:', form)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('¡Enlace enviado! Revisa tu correo electrónico.')
    navigateTo('/auth/login')
  }
  
  loading.value = false
}
</script>