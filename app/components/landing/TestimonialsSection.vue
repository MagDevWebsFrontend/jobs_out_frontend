<template>
  <section class="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Lo que dicen nuestros usuarios
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Historias reales de cubanos que transformaron sus carreras
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Testimonio 1 -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              AC
            </div>
            <div class="ml-4">
              <h4 class="font-semibold text-gray-900">Ana Castillo</h4>
              <p class="text-sm text-gray-600">Desarrolladora Frontend · La Habana</p>
            </div>
          </div>
          <p class="text-gray-700 italic mb-4">
            "Encontré mi trabajo actual en Jobs Out después de 3 meses buscando. La plataforma es intuitiva y las empresas responden rápido. ¡Recomendado 100%!"
          </p>
          <div class="flex text-yellow-400">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
        
        <!-- Testimonio 2 -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
              CM
            </div>
            <div class="ml-4">
              <h4 class="font-semibold text-gray-900">Carlos Mendoza</h4>
              <p class="text-sm text-gray-600">Ingeniero Civil · Santiago de Cuba</p>
            </div>
          </div>
          <p class="text-gray-700 italic mb-4">
            "Como profesional con 10 años de experiencia, pensé que sería difícil encontrar nuevas oportunidades. Jobs Out me conectó con empresas internacionales que buscaban mi perfil."
          </p>
          <div class="flex text-yellow-400">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
        
        <!-- Testimonio 3 -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              LM
            </div>
            <div class="ml-4">
              <h4 class="font-semibold text-gray-900">Laura Martínez</h4>
              <p class="text-sm text-gray-600">Traductora freelance · Matanzas</p>
            </div>
          </div>
          <p class="text-gray-700 italic mb-4">
            "Gracias a Jobs Out conseguí varios clientes internacionales para trabajar remotamente. La posibilidad de filtrar por trabajo remoto cambió mi vida profesional."
          </p>
          <div class="flex text-yellow-400">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
      </div>
      
      <!-- Más testimonios (ocultos en móvil) -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:grid">
        <!-- Testimonio 4 -->
        <div class="bg-white/80 rounded-2xl p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-semibold text-gray-900">Recién graduados</h4>
            </div>
          </div>
          <p class="text-gray-700 text-sm">
            "Encontré mi primer empleo 2 semanas después de graduarme. Las empresas buscan talento joven en la plataforma."
          </p>
        </div>
        
        <!-- Testimonio 5 -->
        <div class="bg-white/80 rounded-2xl p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-semibold text-gray-900">Emprendedores</h4>
            </div>
          </div>
          <p class="text-gray-700 text-sm">
            "Contraté a 3 excelentes profesionales para mi startup a través de Jobs Out. El proceso fue rápido y eficiente."
          </p>
        </div>
        
        <!-- Testimonio 6 -->
        <div class="bg-white/80 rounded-2xl p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <h4 class="font-semibold text-gray-900">Cambio de carrera</h4>
            </div>
          </div>
          <p class="text-gray-700 text-sm">
            "A los 40 años cambié de profesión gracias a los cursos recomendados y oportunidades en Jobs Out."
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente nuevo
</script>