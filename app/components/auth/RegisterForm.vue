<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900">Crear cuenta</h1>
      <p class="text-gray-600 mt-2">Comienza tu experiencia en Jobs Out</p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UIInput
          v-model="form.firstName"
          label="Nombre"
          placeholder="Juan"
          required
          :error="errors.firstName"
        />
        
        <UIInput
          v-model="form.lastName"
          label="Apellido"
          placeholder="Pérez"
          required
          :error="errors.lastName"
        />
      </div>
      
      <UIInput
        v-model="form.username"
        label="Nombre de usuario"
        placeholder="juan_perez"
        required
        :error="errors.username"
        hint="Entre 3 y 20 caracteres. Letras, números y guiones bajos."
      />
      
      <UIInput
        v-model="form.email"
        label="Correo electrónico"
        type="email"
        placeholder="tu@email.com"
        required
        :error="errors.email"
        hint="Lo usaremos para notificaciones importantes"
      />
      
      <UIInput
        v-model="form.password"
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        required
        :error="errors.password"
        hint="Mínimo 8 caracteres, una mayúscula y un número"
      />
      
      <UIInput
        v-model="form.confirmPassword"
        label="Confirmar contraseña"
        type="password"
        placeholder="••••••••"
        required
        :error="errors.confirmPassword"
      />
      
      <!-- Tipo de cuenta -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          ¿Qué tipo de cuenta necesitas?
        </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            :class="[
              'p-4 border rounded-lg text-center transition-all',
              form.accountType === 'candidate' 
                ? 'border-blue-600 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-gray-400 text-gray-700'
            ]"
            @click="form.accountType = 'candidate'"
          >
            <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="font-medium">Busco trabajo</span>
          </button>
          
          <button
            type="button"
            :class="[
              'p-4 border rounded-lg text-center transition-all',
              form.accountType === 'employer' 
                ? 'border-blue-600 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-gray-400 text-gray-700'
            ]"
            @click="form.accountType = 'employer'"
          >
            <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span class="font-medium">Soy empleador</span>
          </button>
        </div>
      </div>
      
      <!-- Términos y condiciones -->
      <div class="flex items-start">
        <input 
          type="checkbox" 
          v-model="form.terms" 
          id="terms"
          class="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        >
        <label for="terms" class="ml-2 text-sm text-gray-700">
          Acepto los 
          <a href="#" class="text-primary-600 hover:text-primary-500 font-medium">términos y condiciones</a> 
          y la 
          <a href="#" class="text-primary-600 hover:text-primary-500 font-medium">política de privacidad</a>
          de Jobs Out
        </label>
      </div>
      
      <!-- Newsletter -->
      <div class="flex items-start">
        <input 
          type="checkbox" 
          v-model="form.newsletter" 
          id="newsletter"
          class="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        >
        <label for="newsletter" class="ml-2 text-sm text-gray-700">
          Quiero recibir ofertas de empleo, consejos profesionales y novedades de Jobs Out
        </label>
      </div>
      
      <UIButton 
        type="submit" 
        :loading="loading" 
        class="w-full"
        :disabled="!form.terms"
      >
        Crear mi cuenta
      </UIButton>
    </form>
    
    <div class="text-center text-sm text-gray-600">
      ¿Ya tienes una cuenta?
      <NuxtLink to="/auth/login" class="text-primary-600 hover:text-primary-500 font-medium ml-1">
        Inicia sesión aquí
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  accountType: 'candidate', // 'candidate' o 'employer'
  terms: false,
  newsletter: true
})

const errors = reactive<Record<string, string>>({})
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  Object.keys(errors).forEach(key => errors[key] = '')
  
  // Validaciones
  if (!form.firstName.trim()) errors.firstName = 'El nombre es obligatorio'
  if (!form.lastName.trim()) errors.lastName = 'El apellido es obligatorio'
  
  if (!form.username.trim()) {
    errors.username = 'El nombre de usuario es obligatorio'
  } else if (form.username.length < 3) {
    errors.username = 'Mínimo 3 caracteres'
  } else if (form.username.length > 20) {
    errors.username = 'Máximo 20 caracteres'
  } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
    errors.username = 'Solo letras, números y guiones bajos'
  }
  
  if (!form.email) {
    errors.email = 'El correo es obligatorio'
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Correo electrónico inválido'
  }
  
  if (!form.password) {
    errors.password = 'La contraseña es obligatoria'
  } else if (form.password.length < 8) {
    errors.password = 'Mínimo 8 caracteres'
  } else if (!/(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
    errors.password = 'Debe contener al menos una mayúscula y un número'
  }
  
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña'
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }
  
  if (!form.terms) {
    alert('Debes aceptar los términos y condiciones')
  }
  
  const hasErrors = Object.values(errors).some(error => error)
  
  if (!hasErrors && form.terms) {
    // Aquí iría la llamada a la API
    console.log('Register attempt:', form)
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulación
    
    // Redirigir según el tipo de cuenta
    if (form.accountType === 'candidate') {
      alert('¡Bienvenido candidato! Tu cuenta ha sido creada.')
      navigateTo('/dashboard/candidate')
    } else {
      alert('¡Bienvenido empleador! Tu cuenta ha sido creada.')
      navigateTo('/dashboard/employer')
    }
  }
  
  loading.value = false
}
</script>