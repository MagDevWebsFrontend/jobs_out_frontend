<!-- components/jobs/JobCard.vue -->
<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
    <!-- Imagen del trabajo -->
    <div class="h-48 bg-gray-200 relative">
      <img 
        v-if="publicacion.imagen_url"
        :src="publicacion.imagen_url"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      </div>
      
      <!-- Badge de estado -->
      <div 
        v-if="publicacion.estado === 'publicado'"
        class="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
      >
        Publicado
      </div>
      
      <!-- Botón de guardar -->
      <button
        @click="toggleSave"
        :class="saveButtonClasses"
        class="absolute top-3 right-3 p-2 rounded-full hover:bg-white/90 transition-colors"
        aria-label="Guardar trabajo"
      >
        <svg 
          class="w-5 h-5" 
          :class="isSaved ? 'text-red-500' : 'text-gray-400'"
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path v-if="isSaved" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          <path v-else d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
            stroke="currentColor" 
            stroke-width="1.5" 
            fill="none"
          />
        </svg>
      </button>
    </div>
    
    <!-- Contenido de la card -->
    <div class="p-6">
      <!-- Título y autor -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-1 mb-1">
          {{ publicacion.trabajo.titulo }}
        </h3>
        <div class="flex items-center text-gray-600">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-sm">{{ publicacion.autor.nombre }} {{ publicacion.autor.apellidos }}</span>
        </div>
      </div>
      
      <!-- Descripción -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ publicacion.trabajo.descripcion }}
      </p>
      
      <!-- Ubicación y tipo -->
      <div class="flex flex-wrap gap-2 mb-4">
        <div class="flex items-center text-sm text-gray-500">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ publicacion.trabajo.municipio.nombre }}, {{ publicacion.trabajo.municipio.provincia?.nombre }}</span>
        </div>
        
        <div class="flex items-center text-sm text-gray-500">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>{{ formatJornada(publicacion.trabajo.jornada) }}</span>
        </div>
        
        <div class="flex items-center text-sm text-gray-500">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ formatModo(publicacion.trabajo.modo) }}</span>
        </div>
      </div>
      
      <!-- Experiencia -->
      <div v-if="publicacion.trabajo.experiencia_min > 0" class="mb-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
          {{ publicacion.trabajo.experiencia_min }}+ años de experiencia
        </span>
      </div>
      
      <!-- Fecha de publicación -->
      <div class="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ formatFecha(publicacion.publicado_en) }}</span>
        </div>
        
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ formatHora(publicacion.publicado_en) }}</span>
        </div>
      </div>
      
      <!-- Botones de acción -->
      <div class="flex gap-3 mt-4">
        <UiButton 
          @click="$emit('view', publicacion)"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          Ver Detalles
        </UiButton>
        
        <UiButton 
          @click="$emit('apply', publicacion)"
          :variant="publicacion.trabajo.estado === 'cerrado' ? 'outline' : 'primary'"
          :disabled="publicacion.trabajo.estado === 'cerrado'"
          class="flex-1"
          size="sm"
        >
          {{ publicacion.trabajo.estado === 'cerrado' ? 'Cerrado' : 'Aplicar' }}
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Publicacion } from '#shared/types/publicaciones'

interface Props {
  publicacion: Publicacion
}

const props = defineProps<Props>()
const emit = defineEmits<{
  view: [publicacion: Publicacion]
  apply: [publicacion: Publicacion]
  save: [publicacion: Publicacion, saved: boolean]
}>()

const isSaved = ref(false)

// Computed para clases condicionales
const saveButtonClasses = computed(() => {
  return isSaved.value 
    ? 'bg-white/80 hover:bg-white'
    : 'bg-gray-100/80 hover:bg-gray-200'
})

// Funciones
const toggleSave = () => {
  isSaved.value = !isSaved.value
  emit('save', props.publicacion, isSaved.value)
}

const formatFecha = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const formatHora = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatJornada = (jornada: string) => {
  const map: Record<string, string> = {
    'tiempo_completo': 'Tiempo Completo',
    'medio_tiempo': 'Medio Tiempo',
    'por_horas': 'Por Horas',
    'flexible': 'Flexible'
  }
  return map[jornada] || jornada
}

const formatModo = (modo: string) => {
  const map: Record<string, string> = {
    'presencial': 'Presencial',
    'hibrido': 'Híbrido',
    'remoto': 'Remoto'
  }
  return map[modo] || modo
}

</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  
}
</style>