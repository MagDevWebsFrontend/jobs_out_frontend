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

      <!-- omitido para futuras versiones
      <div class="relative flex justify-center text-sm">
        <span class="px-4 bg-white text-gray-500">O continúa con</span>
      </div>
      -->
    </div>
    
    <!-- esto esta omitido para futuras versiones
    <div class="grid grid-cols-2 gap-3">
      <UiButton variant="outline" class="w-full" @click="loginWithGoogle">
        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </UiButton>
      
      <UiButton variant="outline" class="w-full" @click="loginWithGithub">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </UiButton>
    </div>
    -->
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

const handleSubmit = async () => {
  loading.value = true
  errors.username = ''
  errors.password = ''
  
  // Validación simple
  if (!form.username.trim()) {
    errors.username = 'El nombre de usuario es obligatorio'
  } else if (form.username.length < 3) {
    errors.username = 'Mínimo 3 caracteres'
  }
  
  if (!form.password) {
    errors.password = 'La contraseña es obligatoria'
  } else if (form.password.length < 6) {
    errors.password = 'Mínimo 6 caracteres'
  }
  
  if (!errors.username && !errors.password) {
    // Aquí iría la llamada a la API
    console.log('Login attempt:', form)
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulación
    alert('Login exitoso (simulación)')
    navigateTo('/') // Redirigir al dashboard
  }
  
  loading.value = false
}

const loginWithGoogle = () => {
  console.log('Login con Google')
  // Implementar OAuth con Google
}

const loginWithGithub = () => {
  console.log('Login con GitHub')
  // Implementar OAuth con GitHub
}
</script>