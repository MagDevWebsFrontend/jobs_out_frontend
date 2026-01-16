<!-- components/profile/ProfileHeader.vue -->
<template>
  <div class="text-center">
    <!-- Avatar -->
    <div class="relative inline-block mb-4">
      <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          <span class="text-4xl font-bold text-white">
            {{ userInitials }}
          </span>
        </div>
      </div>
      
      <!-- Badge de rol -->
      <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <span :class="[
          'px-3 py-1 rounded-full text-xs font-semibold',
          user?.rol === 'admin' ? 'bg-red-100 text-red-800' :
          user?.rol === 'trabajador' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        ]">
          {{ getRoleLabel(user?.rol) }}
        </span>
      </div>
    </div>
    
    <!-- Nombre completo -->
    <h2 class="text-xl font-bold text-gray-900">
      {{ userName }}
    </h2>
    
    <!-- Username -->
    <p class="text-gray-600 mb-2">
      @{{ user?.username || '' }}
    </p>
    
    <!-- Email -->
    <div class="flex items-center justify-center gap-2 text-gray-500 mb-4">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span>{{ user?.email || '' }}</span>
    </div>
    
    <!-- Botón de editar en sidebar -->
    <div class="mt-6">
      <NuxtLink
        to="/profile/edit"
        class="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Editar Perfil
      </NuxtLink>
    </div>

    <!-- Fecha de creación -->
    <div class="text-sm text-gray-500 border-t pt-4 mt-4">
      <p>Miembro desde</p>
      <p class="font-medium">{{ formatDate(user?.created_at) }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

const userInitials = computed(() => {
  const first = props.user?.nombre?.charAt(0) || ''
  const last = props.user?.apellidos?.charAt(0) || ''
  return first + last
})

const userName = computed(() => {
  const name = props.user?.nombre || ''
  const last = props.user?.apellidos || ''
  return `${name} ${last}`.trim()
})

const getRoleLabel = (role) => {
  const roles = {
    admin: 'Administrador',
    trabajador: 'Trabajador',
    empleador: 'Empleador'
  }
  return roles[role] || role || 'Usuario'
}

const formatDate = (dateString) => {
  if (!dateString) return 'No disponible'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return 'Fecha inválida'
  }
}
</script>