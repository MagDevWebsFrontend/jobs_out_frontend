<template>
  <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        ¿Listo para transformar tu carrera?
      </h2>
      
      <p class="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
        Únete a miles de profesionales cubanos que ya encontraron su camino laboral ideal. 
        Tu próximo empleo te está esperando.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <UIButton 
          size="lg" 
          class="px-8 bg-white text-blue-600 hover:bg-gray-100"
        >
          <NuxtLink to="/auth/register">Crear cuenta gratis</NuxtLink>
        </UIButton>
        
        <UIButton 
          variant="outline" 
          size="lg" 
          class="px-8 border-white text-white hover:bg-white/10"
        >
          <NuxtLink to="/auth/login">Iniciar sesión</NuxtLink>
        </UIButton>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p class="font-medium">Registro seguro</p>
        </div>
        
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="font-medium">Sin costo para candidatos</p>
        </div>
        
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p class="font-medium">Resultados en semanas</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente nuevo
</script>