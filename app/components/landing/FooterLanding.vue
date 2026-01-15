<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Sección principal del footer -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Logo y descripción motivacional -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-2xl font-bold">Jobs Out</span>
          </div>
          
          <p class="text-gray-400 mb-6 max-w-md">
            <span class="font-medium text-white">Tu talento merece ser descubierto.</span> 
            En Jobs Out creemos que cada profesional cubano tiene un potencial extraordinario 
            esperando la oportunidad adecuada. No busques trabajo, encuentra tu vocación.
          </p>
          
          <p class="text-gray-400 italic">
            "El trabajo duro vence al talento cuando el talento no trabaja duro. 
            Nosotros te damos la plataforma, tú pones el esfuerzo."
          </p>
        </div>
        
        <!-- Enlaces rápidos -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-white">Para candidatos</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="/auth/register" class="text-gray-400 hover:text-white transition-colors">Buscar empleo</NuxtLink></li>
            <li><NuxtLink to="#" class="text-gray-400 hover:text-white transition-colors">Crear currículum</NuxtLink></li>
            <li><NuxtLink to="#" class="text-gray-400 hover:text-white transition-colors">Consejos profesionales</NuxtLink></li>
            <li><NuxtLink to="#" class="text-gray-400 hover:text-white transition-colors">Preguntas frecuentes</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Empresas y contacto -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-white">Para empresas</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="#" class="text-gray-400 hover:text-white transition-colors">Publicar empleo</NuxtLink></li>
            <li><NuxtLink to="#" class="text-gray-400 hover:text-white transition-colors">Buscar candidatos</NuxtLink></li>
            <li><NuxtLink to="#" class="text-gray-400 hover:text-white transition-colors">Planes y precios</NuxtLink></li>
            <li><NuxtLink to="#" class="text-gray-400 hover:text-white transition-colors">Contactar soporte</NuxtLink></li>
          </ul>
        </div>
      </div>
      
      <!-- Newsletter -->
      <div class="border-t border-gray-800 pt-8 mb-8">
        <div class="max-w-md">
          <h3 class="text-lg font-semibold mb-4">Suscríbete a oportunidades</h3>
          <p class="text-gray-400 mb-4 text-sm">
            Recibe las mejores ofertas de empleo y consejos profesionales en tu correo.
          </p>
          <div class="flex">
            <input 
              type="email" 
              placeholder="tu@email.com"
              class="flex-grow px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
            >
            <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg font-medium">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
      
      <!-- Copyright y enlaces legales -->
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="text-gray-400 text-sm mb-4 md:mb-0">
          <p>&copy; {{ new Date().getFullYear() }} Jobs Out. Todos los derechos reservados.</p>
          <p class="mt-1">Construyendo el futuro laboral de Cuba, una oportunidad a la vez.</p>
        </div>
        
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-white text-sm">Privacidad</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm">Términos</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm">Cookies</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm">Aviso legal</a>
        </div>
      </div>
      
      <!-- Mensaje final motivador -->
      <div class="mt-8 pt-8 border-t border-gray-800 text-center">
        <p class="text-gray-500 text-sm italic">
          "El éxito no es casualidad. Es trabajo duro, perseverancia, aprendizaje, sacrificio 
          y, sobre todo, amor por lo que estás haciendo." - Pelé
        </p>
        <p class="text-gray-400 text-sm mt-2">
          Jobs Out - Conectando talento cubano con oportunidades desde 2024
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Componente existente, actualizado
</script>