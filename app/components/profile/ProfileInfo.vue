<!-- components/profile/ProfileInfo.vue -->
<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900">
        Información Detallada
      </h2>
    </div>
    
    <div class="space-y-6">
      <!-- Información de contacto -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
          Información de Contacto
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">
              Teléfono
            </label>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p class="text-gray-900 font-medium">
                {{ user.telefono_e164 || 'No especificado' }}
              </p>
            </div>
          </div>
          
          <!-- Ubicación -->
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">
              Ubicación
            </label>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="text-gray-900 font-medium">
                <span v-if="user.municipio">
                  {{ user.municipio.nombre }}, {{ user.municipio.provincia.nombre }}
                </span>
                <span v-else>No especificado</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Información de la cuenta -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
          Información de la Cuenta
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Rol -->
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">
              Rol
            </label>
            <p class="text-gray-900 font-medium">
              {{ getRoleLabel(user.rol) }}
            </p>
          </div>
          
          <!-- Fecha de creación -->
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">
              Fecha de creación
            </label>
            <p class="text-gray-900 font-medium">
              {{ formatDate(user.created_at) }}
            </p>
          </div>
          
          <!-- Última actualización -->
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">
              Última actualización
            </label>
            <p class="text-gray-900 font-medium">
              {{ formatDate(user.updated_at) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const getRoleLabel = (role) => {
  const roles = {
    admin: 'Administrador',
    trabajador: 'Trabajador'
  }
  return roles[role] || role
}

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Fecha inválida'
  }
}
</script>