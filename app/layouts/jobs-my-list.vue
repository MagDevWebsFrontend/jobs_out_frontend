<template>
  <main class="min-h-screen bg-[#F3F2EF]">
    <div class="max-w-5xl mx-auto px-4 py-8">
      <!-- Header -->
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-[#0A66C2]">
            <slot name="title" />
          </h1>
          <p class="text-sm text-[#5E5E5E]">
            <slot name="subtitle" />
          </p>
        </div>

        <slot name="actions" />
      </header>

      <!-- Contenido -->
      <slot />
    </div>
  </main>
</template>
