<template>
  <section class="p-4 sm:p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Panel de Administración
      </h1>
      <p class="text-gray-600">
        Visión general del sistema
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="bg-white shadow rounded-xl p-6 text-center">
        <p class="text-gray-500 text-sm">Usuarios registrados</p>
        <p class="text-3xl font-bold text-gray-900">
          {{ stats.usuarios }}
        </p>
      </div>

      <div class="bg-white shadow rounded-xl p-6 text-center">
        <p class="text-gray-500 text-sm">Publicaciones activas</p>
        <p class="text-3xl font-bold text-gray-900">
          {{ stats.publicaciones }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  title: 'Panel de Administración',
  meta: [
    {
      name: 'description',
      content: 'Dashboard de administración y métricas del sistema'
    }
  ]
})

import { onMounted } from 'vue'
import { useAdminStats } from '~/composables/useAdminStats'

const { stats, fetchStats } = useAdminStats()

onMounted(fetchStats)
</script>
