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
        <UiInput
          v-model="form.username"
          label="Nombre de usuario"
          placeholder="juanperez"
          required
          :error="errors.username"
          hint="Entre 3 y 20 caracteres. Letras, números y guiones bajos."
        />
        
        <UiInput
          v-model="form.telefono_e164"
          label="Teléfono"
          placeholder="+584141234567"
          required
          :error="errors.telefono_e164"
          hint="Formato E.164: +58XXXXXXXXXX"
        />
      </div>
      
      <UiInput
        v-model="form.email"
        label="Correo electrónico"
        type="email"
        placeholder="tu@email.com"
        required
        :error="errors.email"
        hint="Lo usaremos para notificaciones importantes"
      />
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UiInput
          v-model="form.password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          required
          :error="errors.password"
          hint="Mínimo 8 caracteres, una mayúscula y un número"
        />
        
        <UiInput
          v-model="form.confirmPassword"
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          required
          :error="errors.confirmPassword"
        />
      </div>

      <!-- Provincias y Municipios -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Provincia
          </label>
          <select 
            v-model="form.provincia_id"
            @change="handleProvinciaChange"
            class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            required
          >
            <option value="">Selecciona una provincia</option>
            <option 
              v-for="provincia in provincias" 
              :key="provincia.id" 
              :value="provincia.id"
            >
              {{ provincia.nombre }}
            </option>
          </select>
          <p v-if="errors.provincia_id" class="mt-1 text-sm text-red-600">
            {{ errors.provincia_id }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Municipio
          </label>
          <select 
            v-model="form.municipio_id"
            :disabled="!form.provincia_id"
            class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
            required
          >
            <option value="">Selecciona un municipio</option>
            <option 
              v-for="municipio in municipiosFiltrados" 
              :key="municipio.id" 
              :value="municipio.id"
            >
              {{ municipio.nombre }}
            </option>
          </select>
          <p v-if="errors.municipio_id" class="mt-1 text-sm text-red-600">
            {{ errors.municipio_id }}
          </p>
          <p v-if="!form.provincia_id" class="mt-1 text-sm text-gray-500">
            Primero selecciona una provincia
          </p>
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
      
      <UiButton 
        type="submit" 
        :loading="loading" 
        class="w-full"
        :disabled="!form.terms"
      >
        Crear mi cuenta
      </UiButton>
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
// Datos de ejemplo - luego reemplazarás con llamadas a tu API
const provincias = ref([
  { id: '1', nombre: 'Distrito Nacional' },
  { id: '2', nombre: 'Santo Domingo' },
  { id: '3', nombre: 'Santiago' },
  { id: '4', nombre: 'La Vega' },
  { id: '5', nombre: 'San Cristóbal' },
])

const municipios = ref([
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', nombre: 'Santo Domingo Este', provincia_id: '2' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa7', nombre: 'Santo Domingo Norte', provincia_id: '2' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa8', nombre: 'Santo Domingo Oeste', provincia_id: '2' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa9', nombre: 'Boca Chica', provincia_id: '2' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afb0', nombre: 'Los Alcarrizos', provincia_id: '2' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afb1', nombre: 'Santiago de los Caballeros', provincia_id: '3' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afb2', nombre: 'Tamboril', provincia_id: '3' },
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afb3', nombre: 'Villa González', provincia_id: '3' },
])

const form = reactive({
  nombre: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  telefono_e164: '',
  provincia_id: '',
  municipio_id: '',
  accountType: 'candidate',
  terms: false,
  newsletter: true
})

const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const municipiosFiltrados = ref<typeof municipios.value>([])

const handleProvinciaChange = () => {
  // Limpiar municipio cuando cambia la provincia
  form.municipio_id = ''
  
  // Filtrar municipios según la provincia seleccionada
  if (form.provincia_id) {
    municipiosFiltrados.value = municipios.value.filter(
      m => m.provincia_id === form.provincia_id
    )
  } else {
    municipiosFiltrados.value = []
  }
}

const validateTelefono = (telefono: string) => {
  // Validación básica de formato E.164
  const regex = /^\+\d{1,3}\d{6,14}$/
  return regex.test(telefono)
}

const handleSubmit = async () => {
  loading.value = true
  Object.keys(errors).forEach(key => errors[key] = '')
  
  // Validaciones
  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre completo es obligatorio'
  } else if (form.nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres'
  }
  
  if (!form.username.trim()) {
    errors.username = 'El nombre de usuario es obligatorio'
  } else if (form.username.length < 3) {
    errors.username = 'Mínimo 3 caracteres'
  } else if (form.username.length > 20) {
    errors.username = 'Máximo 20 caracteres'
  } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
    errors.username = 'Solo letras, números y guiones bajos'
  }
  
  if (!form.telefono_e164) {
    errors.telefono_e164 = 'El teléfono es obligatorio'
  } else if (!validateTelefono(form.telefono_e164)) {
    errors.telefono_e164 = 'Formato inválido. Usa: +58XXXXXXXXXX'
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
  
  if (!form.provincia_id) {
    errors.provincia_id = 'Selecciona una provincia'
  }
  
  if (!form.municipio_id) {
    errors.municipio_id = 'Selecciona un municipio'
  }
  
  if (!form.terms) {
    alert('Debes aceptar los términos y condiciones')
  }
  
  const hasErrors = Object.values(errors).some(error => error)
  
  if (!hasErrors && form.terms) {
    // Preparar datos para la API
    const payload = {
      nombre: form.nombre,
      username: form.username,
      email: form.email,
      password_hash: form.password, // Nota: Normalmente esto se hashea en el backend
      telefono_e164: form.telefono_e164,
      municipio_id: form.municipio_id
      // accountType no va en el payload inicial según tus parámetros
    }
    
    console.log('Register attempt:', payload)
    
    // Aquí iría la llamada a la API
    // Ejemplo:
    // const { data, error } = await useFetch('/api/auth/register', {
    //   method: 'POST',
    //   body: payload
    // })
    
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

// Inicializar municipios filtrados
handleProvinciaChange()
</script>