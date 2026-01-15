<template>
  <section id="como-funciona" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Consigue tu trabajo ideal en 4 pasos
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Un proceso sencillo diseñado para que encuentres empleo rápidamente
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Paso 1 -->
        <div class="relative">
          <div class="bg-blue-50 rounded-2xl p-6 h-full">
            <div class="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
              1
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Regístrate gratis</h3>
            <p class="text-gray-600 mb-4">
              Crea tu cuenta en menos de 2 minutos. Solo necesitas tu correo electrónico.
            </p>
            <div class="text-blue-600 font-medium">¡Es completamente gratis!</div>
          </div>
          <div class="hidden lg:block absolute top-12 -right-4">
            <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <!-- Paso 2 -->
        <div class="relative">
          <div class="bg-blue-50 rounded-2xl p-6 h-full">
            <div class="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
              2
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Completa tu perfil</h3>
            <p class="text-gray-600 mb-4">
              Añade tu experiencia, habilidades y preferencias laborales. Mientras más completo, mejor.
            </p>
            <div class="text-blue-600 font-medium">Destaca entre los demás</div>
          </div>
          <div class="hidden lg:block absolute top-12 -right-4">
            <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <!-- Paso 3 -->
        <div class="relative">
          <div class="bg-blue-50 rounded-2xl p-6 h-full">
            <div class="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
              3
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Encuentra oportunidades</h3>
            <p class="text-gray-600 mb-4">
              Filtra por provincia, modalidad (presencial/remoto), salario y tipo de contrato.
            </p>
            <div class="text-blue-600 font-medium">Personaliza tu búsqueda</div>
          </div>
          <div class="hidden lg:block absolute top-12 -right-4">
            <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <!-- Paso 4 -->
        <div>
          <div class="bg-blue-50 rounded-2xl p-6 h-full">
            <div class="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
              4
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Postula o guarda</h3>
            <p class="text-gray-600 mb-4">
              Envía tu solicitud directamente o guarda los trabajos para más tarde.
            </p>
            <div class="text-blue-600 font-medium">¡Recibe ofertas!</div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <UiButton size="lg">
          <NuxtLink to="/auth/register">Comenzar ahora</NuxtLink>
        </UiButton>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente nuevo
</script>