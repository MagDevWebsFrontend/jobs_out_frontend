<template>
  <section id="que-es" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Imagen/Ilustración -->
        <div class="order-2 lg:order-1">
          <div class="relative">
            <div class="bg-blue-100 rounded-2xl p-8 lg:p-12">
              <div class="space-y-6">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Plataforma #1</h3>
                    <p class="text-sm text-gray-600">En empleo en Cuba</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">100% Confiable</h3>
                    <p class="text-sm text-gray-600">Empresas verificadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Texto -->
        <div class="order-1 lg:order-2">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            ¿Qué es <span class="text-blue-600">Jobs Out</span>?
          </h2>
          
          <p class="text-lg text-gray-600 mb-6">
            Jobs Out es la plataforma líder de búsqueda de empleo en Cuba, diseñada específicamente 
            para conectar el talento cubano con oportunidades laborales tanto dentro como fuera del país.
          </p>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p class="ml-3 text-gray-700">
                <strong class="text-gray-900">Oportunidades reales:</strong> Trabajos verificados de empresas nacionales e internacionales.
              </p>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p class="ml-3 text-gray-700">
                <strong class="text-gray-900">Para todos los perfiles:</strong> Desde recién graduados hasta profesionales con experiencia.
              </p>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p class="ml-3 text-gray-700">
                <strong class="text-gray-900">Sin intermediarios:</strong> Contacto directo entre empleadores y candidatos.
              </p>
            </div>
          </div>
          
          <div class="mt-8">
            <UiButton>
              <NuxtLink to="/auth/register">Descubre más</NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente nuevo
</script>