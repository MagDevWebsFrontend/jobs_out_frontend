<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span class="text-xl font-bold text-gray-900">Jobs Out</span>
          </div>
        </div>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <NuxtLink 
            to="/auth/login" 
            class="text-gray-700 hover:text-blue-600 font-medium"
          >
            Iniciar sesión
          </NuxtLink>
          
          <!-- Botón simple sin UIButton por ahora -->
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <NuxtLink to="/auth/register">Registrarse</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>