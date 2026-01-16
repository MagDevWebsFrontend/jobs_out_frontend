<!-- layouts/profile.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow mb-8">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
              <slot name="title">Perfil de Usuario</slot>
            </h1>
            <p class="text-gray-600 mt-1">
              <slot name="subtitle">Gestiona tu información personal y configuraciones</slot>
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <slot name="header-actions" />
          </div>
        </div>
      </div>
    </header>
    
    <!-- Contenido principal -->
    <main class="container mx-auto px-4 py-8 max-w-6xl">
      <slot />
    </main>
  </div>
</template>