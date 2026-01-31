<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <header class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Detalle del Usuario</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </header>

      <div class="space-y-2 text-gray-700 text-sm">
        <p><span class="font-medium">Nombre:</span> {{ user.nombre }} {{ user.apellidos }}</p>
        <p><span class="font-medium">Usuario:</span> @{{ user.username }}</p>
        <p><span class="font-medium">Email:</span> {{ user.email }}</p>
        <p><span class="font-medium">Rol:</span> {{ user.rol }}</p>
        <p>
          <span class="font-medium">Estado:</span>
          <span v-if="user.deleted_at" class="text-red-600">Eliminado</span>
          <span v-else class="text-green-600">Activo</span>
        </p>
        <p>
          <span class="font-medium">Teléfono:</span> {{ user.telefono_e164 || '—' }}
        </p>
        <p>
          <span class="font-medium">Municipio / Provincia:</span>
          {{ user.municipio?.nombre || '—' }} / {{ user.municipio?.provincia?.nombre || '—' }}
        </p>
        <p>
          <span class="font-medium">Configuración Telegram:</span>
          {{ user.configuracion?.telegram_notif ? 'Activado' : 'Desactivado' }}
        </p>
        <p><span class="font-medium">Creado:</span> {{ formatDate(user.created_at) }}</p>
        <p><span class="font-medium">Última actualización:</span> {{ formatDate(user.updated_at) }}</p>
      </div>

      <footer class="mt-4 text-right">
        <button @click="$emit('close')" class="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">Cerrar</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '#shared/types/user'
//import { defineProps } from 'vue'

defineProps<{ user: User }>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleString()
}
</script>
