<!-- components/navigation/JobsUserMenu.vue -->
<template>
  <div class="relative">
    <button
      @click="toggleUserMenu"
      class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      id="user-menu-button"
    >
      <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
        {{ userInitials }}
      </div>
      <span class="ml-2 hidden md:block text-gray-700 font-medium">
        {{ userName }}
      </span>
      <svg 
        class="ml-1 h-5 w-5 text-gray-400" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Menú desplegable -->
    <div
      v-if="isUserMenuOpen"
      @click="closeMenus"
      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      <NuxtLink
        to="/jobs/profile"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Mi Perfil
        </div>
      </NuxtLink>
      
      <NuxtLink
        to="/jobs/my-jobs"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Mis Trabajos
        </div>
      </NuxtLink>
      
      <NuxtLink
        to="/jobs/saved"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Guardados
        </div>
      </NuxtLink>
      
      <hr class="my-1 border-gray-200">
      
      <button
        @click="handleLogout"
        class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        role="menuitem"
      >
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar Sesión
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Datos del usuario (por ahora improvisados)
const user = {
  name: 'Juan Pérez',
  email: 'juan@example.com'
}

const isUserMenuOpen = ref(false)

// Computed properties para datos del usuario
const userName = computed(() => user.name)
const userInitials = computed(() => {
  const names = user.name.split(' ')
  return names.length >= 2 
    ? `${names[0][0]}${names[1][0]}`
    : user.name.substring(0, 2)
})

// Funciones para manejar el menú
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeMenus = () => {
  isUserMenuOpen.value = false
}

// Manejar logout
const handleLogout = () => {
  // Aquí iría la lógica de logout
  console.log('Cerrando sesión...')
  navigateTo('/auth/login')
}

// Cerrar menú al hacer clic fuera del componente

</script>