<!-- layouts/jobs.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Barra de navegación como componente separado -->
    <JobsNavigation />
    
    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import JobsNavigation from '~/components/navigation/JobsNavigation.vue';

// No necesita lógica aquí, todo está en el componente
</script>