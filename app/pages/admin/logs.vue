<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-[#0A66C2]">
        Trazas del sistema
      </h1>
      <p class="text-sm text-[#5E5E5E]">
        Registros de actividad y eventos críticos
      </p>
    </header>

    <section
      class="bg-[#F2F2F2] rounded-xl p-8 text-center"
    >
      <p class="text-[#5E5E5E]">
        Aquí se mostrarán las trazas del sistema.
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin'],
  title: 'Trazas del sistema'
})
</script>
