<!-- components/jobs/JobsDashboard.vue -->
<template>
  <div class="space-y-8">
    <!-- BARRA SUPERIOR CON ACCIONES -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Oportunidades Laborales</h1>
        <p class="text-gray-600 mt-1">Encuentra y publica oportunidades de trabajo</p>
      </div>
      
      <!-- BOTÓN NUEVA PUBLICACIÓN EN BARRA (Desktop) -->
      <UiButton 
        @click="nuevaPublicacion"
        class="bg-blue-600 hover:bg-blue-700 text-white hidden md:flex"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nueva Publicación
      </UiButton>
    </div>
    
    <!-- Componente de búsqueda -->
    <JobSearchSection
      :loading="loading"
      :provincias="unref(publicacionesStore.provincias)"
      :municipios="unref(publicacionesStore.municipios)"
      @buscar="aplicarBusqueda"
      @limpiar="limpiarBusquedaCompleta"
/>

    
    <!-- Loading -->
    <div v-if="loading && publicaciones.length === 0" class="flex justify-center items-center py-12">
      <div class="text-center">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Cargando publicaciones...</p>
      </div>
    </div>
    
    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-8">
      <div class="text-center">
        <svg class="w-12 h-12 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="text-lg font-semibold text-red-800 mb-2">Error al cargar publicaciones</h3>
        <p class="text-red-700 mb-4">{{ error }}</p>
        <UiButton @click="recargarPublicaciones" class="bg-red-600 hover:bg-red-700 text-white">
          Intentar de nuevo
        </UiButton>
      </div>
    </div>
    
    <!-- Contenido principal -->
    <div v-else>
      <!-- Encabezado con estadísticas -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ busquedaActiva ? 'Resultados de búsqueda' : 'Oportunidades disponibles' }}
            <span v-if="publicacionesFiltradas.length > 0" class="text-lg text-gray-600 ml-2">
              ({{ publicacionesFiltradas.length }} {{ total > publicacionesFiltradas.length ? `de ${total}` : '' }})
            </span>
          </h2>
          <p class="text-gray-600 mt-1">
            {{ publicacionesFiltradas.length === 0 
              ? (busquedaActiva ? 'No se encontraron resultados' : 'No hay publicaciones disponibles')
              : (busquedaActiva ? 'Resultados filtrados' : 'Encuentra tu próximo trabajo')
            }}
          </p>
        </div>
        
        <div v-if="publicacionesFiltradas.length > 0" class="flex items-center space-x-4">
          <!-- Botón para limpiar búsqueda -->
          <UiButton 
            v-if="busquedaActiva"
            @click="limpiarBusqueda"
            variant="outline"
            size="sm"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpiar búsqueda
          </UiButton>
          
          <span class="text-sm text-gray-600">
            {{ hasMore ? 'Hay más resultados' : 'Mostrando todos' }}
          </span>
          <UiButton 
            v-if="hasMore"
            @click="cargarMas"
            variant="outline"
            size="sm"
            :loading="loading"
          >
            Cargar más
          </UiButton>
        </div>
      </div>
      
      <!-- Lista de publicaciones -->
      <div v-if="publicacionesFiltradas.length > 0">
        <JobsList 
          :publicaciones="publicacionesFiltradas"
          @view="handleViewPublicacion"
          @apply="handleApplyPublicacion"
          @save="handleSavePublicacion"
        />
      </div>
      
      <!-- Sin resultados -->
      <div v-else-if="!loading" class="text-center py-12 bg-white rounded-2xl shadow-xl">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ busquedaActiva ? 'No se encontraron resultados' : 'No hay publicaciones disponibles' }}
        </h3>
        <p class="text-gray-600 mb-4">
          {{ busquedaActiva 
            ? 'Intenta con otras palabras clave o filtros diferentes.' 
            : 'Vuelve más tarde para ver nuevas oportunidades.'
          }}
        </p>
        
        <div class="space-x-3">
          <UiButton 
            v-if="busquedaActiva"
            @click="limpiarBusqueda"
            variant="outline"
          >
            Ver todas las publicaciones
          </UiButton>
          
          <!-- Botón para crear publicación cuando no hay resultados -->
          <UiButton 
            @click="nuevaPublicacion"
            class="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Crear nueva publicación
          </UiButton>
        </div>
      </div>
    </div>
    
    <!-- BOTÓN FLOTANTE PARA MÓVIL (FAB) -->
    <button
      @click="nuevaPublicacion"
      class="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-105 active:scale-95"
      aria-label="Crear nueva publicación"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span class="sr-only">Nueva Publicación</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePublicaciones } from '~/composables/usePublicaciones'
import type { Publicacion } from '#shared/types/publicaciones'
import JobSearchSection from './JobSearchSection.vue'

// Usar el composable
const publicacionesStore = usePublicaciones()

// Acceder directamente a los refs del store
const { 
  publicaciones, 
  loading, 
  error, 
  total, 
  hasMore, 
  busquedaActiva 
} = publicacionesStore

// Obtener el valor de experiencia_min de los filtros (si existe)
const experienciaMinima = ref(0)

// Filtrar publicaciones localmente por experiencia
const publicacionesFiltradas = computed(() => {
  if (!publicaciones.value || !Array.isArray(publicaciones.value)) return []
  
  if (experienciaMinima.value > 0) {
    return publicaciones.value.filter(pub => 
      pub?.trabajo?.experiencia_min >= experienciaMinima.value
    )
  }
  return publicaciones.value
})

// Cargar datos iniciales
await useAsyncData('publicaciones', () =>
  publicacionesStore.obtenerPublicaciones({
    estado: 'publicado',
    limit: 50
  })
)


// Manejador para nueva publicación
const nuevaPublicacion = () => {
  console.log('📝 Redirigiendo a formulario de nueva publicación')
  
  // Redirigir a la página de creación de publicación
  navigateTo('/jobs/formJob')
}

// Recargar publicaciones cuando se limpian filtros
const recargarPublicaciones = async () => {
  await publicacionesStore.obtenerPublicaciones({
    estado: 'publicado',
    limit: 50
  })
}


// Limpiar búsqueda activa
const limpiarBusqueda = async () => {
  await publicacionesStore.limpiarBusqueda()
}

// Cargar más resultados
const cargarMas = async () => {
  await publicacionesStore.cargarMas()
}

// Manejadores de eventos
const handleViewPublicacion = (publicacion: Publicacion) => {
  console.log('Viendo publicación:', publicacion.id)
  navigateTo(`/jobs/${publicacion.id}`)
}

const handleApplyPublicacion = (publicacion: Publicacion) => {
  console.log('Aplicando a publicación:', publicacion.id)
  // Aquí puedes mostrar un modal o redirigir
  // Por ejemplo: showApplyModal.value = true; selectedJob.value = publicacion
}

const handleSavePublicacion = (publicacion: Publicacion, saved: boolean) => {
  console.log('Guardando publicación:', publicacion.id, saved)
  // Aquí puedes guardar en localStorage o hacer petición a API
  // Por ejemplo: guardarEnFavoritos(publicacion.id, saved)
}

const aplicarBusqueda = async (payload: {
  busqueda?: string
  provincia_id?: string
  municipio_id?: string
  modo?: string
  jornada?: string
  experiencia_min?: number
}) => {
  // reset paginación
  publicacionesStore.filtros.offset = 0

  if (payload.busqueda) {
    publicacionesStore.filtros.busqueda = payload.busqueda
  } else {
    publicacionesStore.filtros.busqueda = ''
  }

  await publicacionesStore.aplicarFiltrosConFiltros(payload)
}

const limpiarBusquedaCompleta = async () => {
  await publicacionesStore.limpiarFiltros()
}
</script>