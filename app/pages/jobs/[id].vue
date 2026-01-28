<template>
  <div>
    <button @click="$router.back()" class="mb-6 text-blue-600 hover:underline">
      ← Volver
    </button>

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <div v-else-if="publicacion" class="bg-white rounded-xl shadow p-8 space-y-6">
      <h1 class="text-3xl font-bold">{{ publicacion.trabajo.titulo }}</h1>

      <p class="text-gray-600">
        {{ publicacion.trabajo.municipio.nombre }},
        {{ publicacion.trabajo.municipio.provincia.nombre }}
      </p>

      <p class="text-gray-700 whitespace-pre-line">
        {{ publicacion.trabajo.descripcion }}
      </p>

      <div class="flex gap-4 text-sm text-gray-500">
        <span>Modo: {{ publicacion.trabajo.modo }}</span>
        <span>Jornada: {{ publicacion.trabajo.jornada }}</span>
        <span>Experiencia mínima: {{ publicacion.trabajo.experiencia_min }} años</span>
      </div>

      <div class="pt-4 border-t">
        <p class="font-semibold">
          Publicado por {{ publicacion.autor.nombre }} {{ publicacion.autor.apellidos }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePublicacionStore } from '~/stores/publicacion'

definePageMeta({
  middleware: 'auth',
  layout: 'jobs-list'
})

const route = useRoute()
const store = usePublicacionStore()

await store.obtenerPublicacion(route.params.id as string)

const { publicacion, loading, error } = store
</script>
