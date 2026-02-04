<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div class="px-6 py-4 border-b border-gray-100">
        <h1 class="text-lg font-bold text-blue-600">Admin Panel</h1>
      </div>

      <!-- BOTÓN VOLVER A JOBS -->
      <div class="px-4 py-3 border-b border-gray-100">
        <NuxtLink
          to="/jobs"
          class="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md
                 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
        >
          ← Volver a Jobs
        </NuxtLink>
      </div>

      <nav class="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        <NuxtLink
          to="/admin"
          class="block px-4 py-2 rounded hover:bg-blue-50 font-medium text-gray-700"
          active-class="bg-blue-100 text-blue-700"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/admin/users"
          class="block px-4 py-2 rounded hover:bg-blue-50 font-medium text-gray-700"
          active-class="bg-blue-100 text-blue-700"
        >
          Usuarios
        </NuxtLink>

        <NuxtLink
          to="/admin/logs"
          class="block px-4 py-2 rounded hover:bg-blue-50 font-medium text-gray-700"
          active-class="bg-blue-100 text-blue-700"
        >
          Logs
        </NuxtLink>

        <NuxtLink
          to="/structures/provincias"
          class="block px-4 py-2 rounded hover:bg-blue-50 font-medium text-gray-700"
          active-class="bg-blue-100 text-blue-700"
        >
          Estructuras
        </NuxtLink>

        <NuxtLink
          to="/admin/comunicado"
          class="block px-4 py-2 rounded hover:bg-blue-50 font-medium text-gray-700"
          active-class="bg-blue-100 text-blue-700"
        >
          Comunicado
        </NuxtLink>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <main class="flex-1 overflow-auto p-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>
