<template>
  <div ref="menuRef" class="relative">
    <!-- Botón del menú -->
    <button
      @click="toggleUserMenu"
      class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      :id="buttonId"
      :aria-expanded="isUserMenuOpen"
      :aria-controls="dropdownId"
      type="button"
    >
      <!-- Iniciales del usuario -->
      <div
        class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold"
      >
        {{ userInitials }}
      </div>

      <!-- Nombre del usuario -->
      <span class="ml-2 hidden md:block text-gray-700 font-medium">
        {{ userName }}
      </span>

      <!-- Icono flecha -->
      <svg
        class="ml-1 h-5 w-5 text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isUserMenuOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isUserMenuOpen"
      :id="dropdownId"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-2 bg-white ring-1 ring-black ring-opacity-5 z-50 animate-in slide-in-from-top-1"
      role="menu"
      aria-orientation="vertical"
      :aria-labelledby="buttonId"
    >
      <!-- Info de usuario -->
      <div class="px-4 py-3 border-b border-gray-100">
        <p class="text-sm font-medium text-gray-900 truncate">
          {{ auth.user?.name || auth.user?.username || 'Usuario' }}
        </p>
        <p class="text-xs text-gray-500 truncate">
          {{ auth.user?.email || 'usuario@ejemplo.com' }}
        </p>
      </div>

      <!-- Links del menú -->
      <div class="py-1">
        <NuxtLink to="/profile" class="menu-item" @click="closeUserMenu">
          Mi Perfil
        </NuxtLink>

        <NuxtLink to="/jobs/my-jobs" class="menu-item" @click="closeUserMenu">
          Mis Trabajos
        </NuxtLink>

        <NuxtLink to="/jobs/saved" class="menu-item" @click="closeUserMenu">
          Guardados
        </NuxtLink>

        <!-- Único link de Admin -->
        <NuxtLink
          v-if="isAdmin"
          to="/admin"
          class="menu-item font-semibold text-blue-700"
          @click="closeUserMenu"
        >
          Admin
        </NuxtLink>
      </div>

      <!-- Logout -->
      <div class="border-t border-gray-100 pt-1">
        <button
          @click="handleLogout"
          class="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
          role="menuitem"
          type="button"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const auth = useAuthStore()

const isUserMenuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const uid = Math.random().toString(36).slice(2)
const buttonId = `user-menu-button-${uid}`
const dropdownId = `user-dropdown-${uid}`

// Computed para admin
const isAdmin = computed(() =>
  auth.user?.rol === 'admin' ||
  auth.user?.permissions?.includes('admin') ||
  auth.user?.isAdmin === true
)

// Computed nombre e iniciales
const userName = computed(() => auth.user?.name || auth.user?.username)
const userInitials = computed(() => {
  const name = auth.user?.name
  if (!name) return 'U'
  const parts = name.split(' ')
  return parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : parts[0].slice(0, 2).toUpperCase()
})

// Toggle menu
const toggleUserMenu = () => { isUserMenuOpen.value = !isUserMenuOpen.value }
const closeUserMenu = () => { isUserMenuOpen.value = false }

// Logout
const handleLogout = async () => {
  closeUserMenu()
  try { await auth.logout() }
  catch (e) { console.error('Error al cerrar sesión', e) }
}

// Click outside & escape
const onClickOutside = (e: MouseEvent) => {
  if (!menuRef.value) return
  if (!menuRef.value.contains(e.target as Node)) closeUserMenu()
}
const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeUserMenu() }

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})

console.log('auth.user:', auth.user?.rol)
</script>

<style scoped>
.menu-item {
  @apply flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors;
}

@keyframes slideInFromTop {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: slideInFromTop 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
