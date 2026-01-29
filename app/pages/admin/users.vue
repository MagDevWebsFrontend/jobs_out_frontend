<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-[#0A66C2]">
        Gestión de usuarios
      </h1>
      <p class="text-sm text-[#5E5E5E]">
        Administración de cuentas del sistema
      </p>
    </header>

    <!-- Placeholder -->
    <section
      class="bg-[#F2F2F2] rounded-xl p-8 text-center"
    >
      <p class="text-[#5E5E5E]">
        Aquí se listarán los usuarios del sistema.
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin'],
  title: 'Gestión de usuarios'
})
</script>
