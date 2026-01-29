<!-- components/jobs/JobSearchSection.vue -->
<template>
  <div class="space-y-6">
    <!-- Sección de búsqueda -->
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Encuentra tu trabajo ideal</h1>
        <p class="text-gray-600 mt-2">Busca entre miles de oportunidades en Cuba</p>
      </div>
      
      <!-- Barra de búsqueda principal -->
      <div class="relative mb-6">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por título, descripción..."
          class="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-lg"
          @keyup.enter="buscar"
        />
      </div>
      
      <!-- Botones de acción -->
      <div class="flex flex-col sm:flex-row gap-4">
        <UiButton 
          @click="toggleFilters"
          :variant="showFilters ? 'primary' : 'outline'"
          class="flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {{ showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros' }}
        </UiButton>
        
        <UiButton 
          @click="buscar"
          :loading="loading"
          class="bg-blue-600 hover:bg-blue-700 text-white flex-1"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Buscar
        </UiButton>
        
        <UiButton 
          @click="limpiar"
          variant="outline"
          :disabled="!hayFiltrosActivos"
        >
          Limpiar
        </UiButton>
      </div>
      
      <!-- Filtros desplegables -->
      <div 
        v-if="showFilters"
        class="mt-6 pt-6 border-t border-gray-200 space-y-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Provincia -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Provincia
            </label>
            <select 
              v-model="filtrosLocal.provincia_id"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Todas las provincias</option>
              <option 
                v-for="provincia in provincias" 
                :key="provincia.id"
                :value="provincia.id"
              >
                {{ provincia.nombre }}
              </option>
            </select>
          </div>
          
          <!-- Municipio -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Municipio
            </label>
            <select 
              v-model="filtrosLocal.municipio_id"
              :disabled="!filtrosLocal.provincia_id"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Todos los municipios</option>
              <option 
                v-for="municipio in municipiosFiltrados" 
                :key="municipio.id"
                :value="municipio.id"
              >
                {{ municipio.nombre }}
              </option>
            </select>
          </div>
          
          <!-- Modo de trabajo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Modalidad
            </label>
            <select 
              v-model="filtrosLocal.modo"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Todas las modalidades</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
              <option value="remoto">Remoto</option>
            </select>
          </div>
          
          <!-- Jornada -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Jornada
            </label>
            <select 
              v-model="filtrosLocal.jornada"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Todas las jornadas</option>
              <option value="tiempo_completo">Tiempo Completo</option>
              <option value="medio_tiempo">Medio Tiempo</option>
              <option value="por_horas">Por Horas</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          
          <!-- Experiencia -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Experiencia Mínima (años)
            </label>
            <div class="flex items-center space-x-4">
              <input
                v-model="filtrosLocal.experiencia_min"
                type="range"
                min="0"
                max="10"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span class="text-sm font-medium text-gray-700 min-w-[80px] text-center">
                {{ filtrosLocal.experiencia_min || 0 }} años
              </span>
              <button
                type="button"
                @click="filtrosLocal.experiencia_min = 0"
                class="text-sm text-gray-500 hover:text-gray-700"
                v-if="filtrosLocal.experiencia_min > 0"
              >
                ×
              </button>
            </div>
          </div>
        </div>
        
        <!-- Resumen de filtros activos -->
        <div v-if="hayFiltrosActivos" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 class="text-sm font-medium text-blue-800 mb-2">Filtros activos:</h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-if="searchQuery"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              Búsqueda: "{{ searchQuery }}"
              <button @click="searchQuery = ''" class="ml-1 text-blue-600 hover:text-blue-800">
                ×
              </button>
            </span>
            
            <span 
              v-if="filtrosLocal.provincia_id"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              Provincia: {{ provinciaNombre }}
              <button @click="filtrosLocal.provincia_id = ''; filtrosLocal.municipio_id = ''" class="ml-1 text-green-600 hover:text-green-800">
                ×
              </button>
            </span>
            
            <span 
              v-if="filtrosLocal.municipio_id"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              Municipio: {{ municipioNombre }}
              <button @click="filtrosLocal.municipio_id = ''" class="ml-1 text-green-600 hover:text-green-800">
                ×
              </button>
            </span>
            
            <span 
              v-if="filtrosLocal.modo"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              Modalidad: {{ formatoModo(filtrosLocal.modo) }}
              <button @click="filtrosLocal.modo = ''" class="ml-1 text-purple-600 hover:text-purple-800">
                ×
              </button>
            </span>
            
            <span 
              v-if="filtrosLocal.jornada"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
            >
              Jornada: {{ formatoJornada(filtrosLocal.jornada) }}
              <button @click="filtrosLocal.jornada = ''" class="ml-1 text-yellow-600 hover:text-yellow-800">
                ×
              </button>
            </span>
            
            <span 
              v-if="filtrosLocal.experiencia_min > 0"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
            >
              Experiencia: {{ filtrosLocal.experiencia_min }}+ años
              <button @click="filtrosLocal.experiencia_min = 0" class="ml-1 text-red-600 hover:text-red-800">
                ×
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Provincia, Municipio } from '#shared/types/publicaciones'

/* =========================
   PROPS
========================= */
const props = defineProps<{
  provincias: Provincia[]
  municipios: Municipio[]
  loading: boolean
}>()

/* =========================
   EMITS
========================= */
const emit = defineEmits<{
  buscar: [{
    busqueda?: string
    provincia_id?: string
    municipio_id?: string
    modo?: string
    jornada?: string
    experiencia_min?: number
  }]
  limpiar: []
}>()

/* =========================
   ESTADO LOCAL (UI)
========================= */
const showFilters = ref<boolean>(false)
const searchQuery = ref<string>('')

interface FiltrosBusquedaLocal {
  provincia_id: string
  municipio_id: string
  modo: string
  jornada: string
  experiencia_min: number
}

const filtrosLocal = reactive<FiltrosBusquedaLocal>({
  provincia_id: '',
  municipio_id: '',
  modo: '',
  jornada: '',
  experiencia_min: 0
})

/* =========================
   COMPUTED
========================= */
const hayFiltrosActivos = computed<boolean>(() => {
  return Boolean(
    searchQuery.value.trim() ||
    filtrosLocal.provincia_id ||
    filtrosLocal.municipio_id ||
    filtrosLocal.modo ||
    filtrosLocal.jornada ||
    filtrosLocal.experiencia_min > 0
  )
})

const municipiosFiltrados = computed<Municipio[]>(() => {
  if (!filtrosLocal.provincia_id) return []
  return props.municipios.filter(
    m => m.provincia_id === filtrosLocal.provincia_id
  )
})

const provinciaNombre = computed<string>(() => {
  return (
    props.provincias.find(
      p => p.id === filtrosLocal.provincia_id
    )?.nombre || 'Desconocida'
  )
})

const municipioNombre = computed<string>(() => {
  return (
    municipiosFiltrados.value.find(
      m => m.id === filtrosLocal.municipio_id
    )?.nombre || 'Desconocido'
  )
})

/* =========================
   FORMATOS
========================= */
const formatoModo = (modo: string): string => {
  const map: Record<string, string> = {
    presencial: 'Presencial',
    hibrido: 'Híbrido',
    remoto: 'Remoto'
  }
  return map[modo] || modo
}

const formatoJornada = (jornada: string): string => {
  const map: Record<string, string> = {
    tiempo_completo: 'Tiempo Completo',
    medio_tiempo: 'Medio Tiempo',
    por_horas: 'Por Horas',
    flexible: 'Flexible'
  }
  return map[jornada] || jornada
}

/* =========================
   ACCIONES
========================= */
const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const buscar = () => {
  emit('buscar', {
    busqueda: searchQuery.value.trim() || undefined,
    provincia_id: filtrosLocal.provincia_id || undefined,
    municipio_id: filtrosLocal.municipio_id || undefined,
    modo: filtrosLocal.modo || undefined,
    jornada: filtrosLocal.jornada || undefined,
    experiencia_min: filtrosLocal.experiencia_min || undefined
  })
}

const limpiar = () => {
  searchQuery.value = ''
  filtrosLocal.provincia_id = ''
  filtrosLocal.municipio_id = ''
  filtrosLocal.modo = ''
  filtrosLocal.jornada = ''
  filtrosLocal.experiencia_min = 0

  emit('limpiar')
}
</script>
