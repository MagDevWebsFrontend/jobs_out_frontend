<template>
  <main class="max-w-5xl mx-auto px-4 py-8">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-[#0A66C2]">
        Mis guardados
      </h1>
      <p class="text-sm text-[#5E5E5E]">
        Ofertas que has guardado para revisar más tarde
      </p>
    </header>

    <!-- Loading -->
    <section
      v-if="loading"
      role="status"
      aria-live="polite"
      class="text-[#5E5E5E]"
    >
      Cargando guardados…
    </section>

    <!-- Empty state -->
    <section
      v-else-if="!guardados.length"
      class="bg-[#F2F2F2] rounded-xl p-8 text-center"
    >
      <p class="text-[#5E5E5E]">
        Aún no tienes publicaciones guardadas.
      </p>
    </section>

    <!-- Listado -->
    <section
      v-else
      class="space-y-4"
      aria-label="Listado de publicaciones guardadas"
    >
      <article
        v-for="pub in guardados"
        :key="pub.id"
        class="bg-white border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm"
      >
        <!-- Info -->
        <div>
          <h2 class="font-semibold text-gray-900">
            {{ pub.trabajo.titulo }}
          </h2>
          <p class="text-sm text-[#5E5E5E]">
            {{ pub.trabajo.municipio.nombre }}
          </p>
        </div>

        <!-- Acciones -->
        <div class="flex gap-3">
          <!-- Ver oferta -->
          <button
            @click="ver(pub.id)"
            class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#0A66C2] hover:bg-blue-700 transition"
            aria-label="Ver oferta de empleo"
          >
            Ver oferta
          </button>

          <!-- Eliminar -->
          <button
            @click="confirmar(pub)"
            class="px-4 py-2 rounded-lg text-sm font-medium text-[#5E5E5E] border border-gray-300 hover:bg-gray-100 transition"
            :aria-label="`Eliminar oferta ${pub.trabajo.titulo}`"
          >
            Eliminar
          </button>
        </div>
      </article>
    </section>

    <!-- Modal flotante de confirmación -->
    <div
      v-if="publicacionAEliminar"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="'modal-title-' + publicacionAEliminar.id"
    >
      <!-- Fondo difuminado -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        @click="cancelarEliminacion"
        aria-hidden="true"
      ></div>

      <!-- Modal -->
      <div
        class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all"
        @keydown.esc="cancelarEliminacion"
        ref="modalRef"
      >
        <!-- Icono de advertencia -->
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        <!-- Contenido -->
        <h3
          :id="'modal-title-' + publicacionAEliminar.id"
          class="text-lg font-semibold text-gray-900 mb-2 text-center"
        >
          ¿Eliminar de guardados?
        </h3>
        
        <p class="text-gray-600 text-center mb-4">
          Estás a punto de eliminar la oferta:
        </p>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <p class="font-medium text-gray-900">
            {{ publicacionAEliminar.trabajo.titulo }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ publicacionAEliminar.trabajo.municipio.nombre }}
          </p>
          <p class="text-xs text-gray-400 mt-2">
            Esta acción no se puede deshacer
          </p>
        </div>

        <!-- Botones -->
        <div class="flex gap-3">
          <button
            @click="cancelarEliminacion"
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            ref="cancelButtonRef"
          >
            Cancelar
          </button>
          <button
            @click="eliminar"
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGuardadosStore } from '~/stores/guardados'

definePageMeta({
  middleware: 'auth',
  layout: 'jobs-list',
  title: 'Mis guardados'
})

const store = useGuardadosStore()
const publicacionAEliminar = ref<any>(null)
const modalRef = ref<HTMLElement | null>(null)
const cancelButtonRef = ref<HTMLElement | null>(null)

await store.obtenerGuardados()

const { guardados, loading } = store

const ver = (id: string) => navigateTo(`/jobs/${id}`)

const confirmar = (pub: any) => {
  publicacionAEliminar.value = pub
  
  // Enfocar el modal cuando se abre (para accesibilidad)
  nextTick(() => {
    if (cancelButtonRef.value) {
      cancelButtonRef.value.focus()
    }
  })
  
  // Bloquear scroll del body
  document.body.style.overflow = 'hidden'
}

const cancelarEliminacion = () => {
  publicacionAEliminar.value = null
  document.body.style.overflow = 'auto'
}

const eliminar = async () => {
  if (!publicacionAEliminar.value) return
  
  await store.eliminarGuardado(publicacionAEliminar.value.id)
  publicacionAEliminar.value = null
  document.body.style.overflow = 'auto'
  
  // Refrescar la lista
  await store.obtenerGuardados()
}

// Cerrar modal con tecla ESC
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && publicacionAEliminar.value) {
    cancelarEliminacion()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
/* Transiciones suaves */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>