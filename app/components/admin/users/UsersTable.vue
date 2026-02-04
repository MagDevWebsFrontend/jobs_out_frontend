<template>
  <section class="bg-white rounded-xl shadow-sm border border-gray-100">
    <!-- Header + Filtros -->
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-b gap-3">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">
          Usuarios del sistema
        </h2>
        <p class="text-sm text-gray-500">
          Gestión y supervisión de usuarios registrados
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <select v-model="filterRol" class="border rounded px-2 py-1 text-sm">
          <option value="">Todos los roles</option>
          <option value="admin">Admin</option>
          <option value="trabajador">Trabajador</option>
        </select>

        <select v-model.number="limit" class="border rounded px-2 py-1 text-sm">
          <option :value="10">10 / página</option>
          <option :value="25">25 / página</option>
          <option :value="50">50 / página</option>
        </select>

        <button @click="reload" class="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50">
          Recargar
        </button>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="p-6 space-y-3">
      <div v-for="i in 5" :key="i" class="h-4 bg-gray-200 rounded animate-pulse" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="p-6 text-sm text-red-600">
      {{ error }}
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 text-gray-600">
          <tr>
            <th class="px-4 py-3 text-left">Usuario</th>
            <th class="px-4 py-3 text-left">Email</th>
            <th class="px-4 py-3 text-left">Rol</th>
            <th class="px-4 py-3 text-left">Municipio / Provincia</th>
            <th class="px-4 py-3 text-left">Estado</th>
            <th class="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <div class="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                  {{ initials(user) }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ user.nombre }} {{ user.apellidos ?? '' }}</p>
                  <p class="text-xs text-gray-500">@{{ user.username }}</p>
                </div>
              </div>
            </td>

            <td class="px-4 py-3 text-gray-700">{{ user.email || '—' }}</td>

            <td class="px-4 py-3">
              <span :class="user.rol === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium">
                {{ user.rol }}
              </span>
            </td>

            <td class="px-4 py-3 text-gray-700">
              {{ user.municipio?.nombre || '—' }} / {{ user.municipio?.provincia?.nombre || '—' }}
            </td>

            <td class="px-4 py-3">
              <span v-if="user.deleted_at" class="text-xs text-red-600">Eliminado</span>
              <span v-else class="text-xs text-green-600">Activo</span>
            </td>

            <td class="px-4 py-3 text-right">
              <button class="text-xs text-blue-600 hover:underline" @click="$emit('view', user)">Ver</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty -->
      <div v-if="users.length === 0" class="p-6 text-center text-sm text-gray-500">
        No hay usuarios registrados
      </div>
    </div>

    <!-- Paginación -->
    <div v-if="total > limit" class="flex justify-end gap-2 p-4">
      <button
        class="px-2 py-1 border rounded"
        :disabled="page <= 1"
        @click="prevPage"
      >
        Anterior
      </button>
      <span class="px-2 py-1">{{ page }} / {{ totalPages }}</span>
      <button
        class="px-2 py-1 border rounded"
        :disabled="page >= totalPages"
        @click="nextPage"
      >
        Siguiente
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { User } from '#shared/types/user'
import { useUsersStore } from '~/stores/admin/users'
import { computed, ref, watch, onMounted } from 'vue'

defineEmits<{
  (e: 'view', user: User): void
}>()

const usersStore = useUsersStore()
const users = computed(() => usersStore.users)
const loading = computed(() => usersStore.loading)
const error = computed(() => usersStore.error)
const total = computed(() => usersStore.total)

const filterRol = ref('')
const page = ref(1)
const limit = ref(10)

const totalPages = computed(() => Math.ceil(total.value / limit.value))

const reload = () => {
  page.value = 1
  usersStore.fetchUsers(page.value, limit.value, filterRol.value)
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    usersStore.fetchUsers(page.value, limit.value, filterRol.value)
  }
}

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
    usersStore.fetchUsers(page.value, limit.value, filterRol.value)
  }
}

watch([filterRol, limit], () => {
  reload()
})

const initials = (user: User) => {
  const nombre = user.nombre?.trim()
  const apellido = user.apellidos?.trim()
  if (!nombre && !apellido) return 'U'
  return `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase()
}

onMounted(() => {
  usersStore.fetchUsers(page.value, limit.value)
})
</script>
