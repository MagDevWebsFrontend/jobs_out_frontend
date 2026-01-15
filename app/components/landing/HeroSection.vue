<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 py-20 md:py-32">
    <div class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Logo y nombre -->
        <div class="inline-flex items-center justify-center mb-8">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 class="ml-3 text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Jobs Out
          </h1>
        </div>

        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Encuentra el trabajo
          <span class="block text-blue-600">que mereces en Cuba</span>
        </h2>
        
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Conectamos talento cubano con oportunidades laborales nacionales e internacionales. 
          Tu próximo empleo está a un clic de distancia.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UiButton size="lg" class="px-8">
            <NuxtLink to="/auth/register">Encontrar empleo</NuxtLink>
          </UiButton>
          <UiButton variant="outline" size="lg" class="px-8">
            <NuxtLink to="#como-funciona">Ver cómo funciona</NuxtLink>
          </UiButton>
        </div>
        
        <!-- Stats -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">500+</div>
            <div class="text-gray-600">Empresas activas</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">10K+</div>
            <div class="text-gray-600">Trabajadores</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">85%</div>
            <div class="text-gray-600">Tasa de éxito</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">15</div>
            <div class="text-gray-600">Provincias cubiertas</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Este componente ya debería existir, se mantiene similar
</script>