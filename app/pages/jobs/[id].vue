<template>
  <main
    class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    role="main"
  >
    <!-- Navegación secundaria -->
    <nav aria-label="Navegación de retorno" class="mb-6">
      <button
        @click="$router.back()"
        class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
        aria-label="Volver a la lista de empleos"
      >
        ← Volver
      </button>
    </nav>

    <!-- Estado: cargando -->
    <section
      v-if="loading"
      class="text-gray-600"
      role="status"
      aria-live="polite"
    >
      Cargando publicación…
    </section>

    <!-- Estado: error -->
    <section v-else-if="error" role="alert">
      <p class="text-red-600 font-medium">
        {{ error }}
      </p>
    </section>

    <!-- Contenido principal -->
    <article
      v-else-if="publicacion"
      class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8"
      itemscope
      itemtype="https://schema.org/JobPosting"
    >
      <!-- Header -->
      <header class="space-y-3">
        <h1
          class="text-2xl sm:text-3xl font-bold text-gray-900"
          itemprop="title"
        >
          {{ publicacion.trabajo.titulo }}
        </h1>

        <p class="text-sm text-gray-600">
          <span itemprop="jobLocation">
            {{ publicacion.trabajo.municipio.nombre }},
            {{ publicacion.trabajo.municipio.provincia.nombre }}
          </span>
        </p>
      </header>

      <!-- Meta info -->
      <section
        class="flex flex-wrap gap-3"
        aria-label="Detalles del empleo"
      >
        <span
          class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
        >
          {{ publicacion.trabajo.modo }}
        </span>

        <span
          class="px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium"
        >
          {{ publicacion.trabajo.jornada }}
        </span>

        <span
          class="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium"
        >
          {{ publicacion.trabajo.experiencia_min }} años de experiencia
        </span>
      </section>

      <!-- Descripción -->
      <section
        class="space-y-3"
        aria-labelledby="descripcion-puesto"
      >
        <h2
          id="descripcion-puesto"
          class="text-lg font-semibold text-gray-900"
        >
          Descripción del puesto
        </h2>

        <p
          class="text-gray-700 leading-relaxed whitespace-pre-line"
          itemprop="description"
        >
          {{ publicacion.trabajo.descripcion }}
        </p>
      </section>

      <!-- Autor -->
      <footer class="pt-6 border-t text-sm text-gray-600">
        Publicado por
        <span class="font-medium text-gray-800">
          {{ publicacion.autor.nombre }}
          {{ publicacion.autor.apellidos }}
        </span>
      </footer>
    </article>
  </main>
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

// SEO dinámico profesional
useHead(() => {
  if (!publicacion) return {}

  const titulo = publicacion.trabajo.titulo
  const ubicacion = `${publicacion.trabajo.municipio.nombre}, ${publicacion.trabajo.municipio.provincia.nombre}`
  const descripcion = publicacion.trabajo.descripcion
    .replace(/\n/g, ' ')
    .slice(0, 155)

  return {
    title: `${titulo} | Oferta de empleo`,
    meta: [
      {
        name: 'description',
        content: `${titulo} en ${ubicacion}. ${descripcion}`
      }
    ]
  }
})
</script>
