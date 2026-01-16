<!-- components/jobs/JobsList.vue -->
<template>
  <div>
    <!-- Grid de publicaciones -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="publicacion in publicaciones"
        :key="publicacion.id"
      >
        <JobsCard 
          :publicacion="publicacion"
          @view="$emit('view', publicacion)"
          @apply="$emit('apply', publicacion)"
          @save="$emit('save', publicacion, $event)"
        />
      </div>
    </div>
    
    <!-- Mensaje cuando no hay resultados -->
    <div v-if="publicaciones.length === 0 && !$slots.default" class="text-center py-12">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        No hay publicaciones para mostrar
      </h3>
      <p class="text-gray-600">
        Intenta con otros filtros o palabras clave.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Publicacion } from '~/types/publicaciones'
import JobsCard from './JobsCard.vue';

defineProps<{
  publicaciones: Publicacion[]
}>()


defineEmits<{
  view: [publicacion: Publicacion]
  apply: [publicacion: Publicacion]
  save: [publicacion: Publicacion, saved: boolean]
}>()


</script>