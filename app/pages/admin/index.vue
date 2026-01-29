<template>
  <main class="max-w-5xl mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-[#0A66C2]">
        Panel de administración
      </h1>
      <p class="text-sm text-[#5E5E5E]">
        Gestión del sistema y supervisión general
      </p>
    </header>

    <section class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Usuarios -->
      <NuxtLink
        to="/admin/users"
        class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow transition"
      >
        <h2 class="font-semibold text-gray-900 mb-1">
          Gestión de usuarios
        </h2>
        <p class="text-sm text-[#5E5E5E]">
          Ver, bloquear o administrar usuarios del sistema
        </p>
      </NuxtLink>

      <!-- Logs -->
      <NuxtLink
        to="/admin/logs"
        class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow transition"
      >
        <h2 class="font-semibold text-gray-900 mb-1">
          Trazas del sistema
        </h2>
        <p class="text-sm text-[#5E5E5E]">
          Auditoría y registros de actividad
        </p>
      </NuxtLink>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin'],
  title: 'Panel de administración'
})
</script>
