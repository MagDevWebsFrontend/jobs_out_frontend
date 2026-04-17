<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'jobs-list',
  title: 'Mis trabajos'
})

import Toast from '~/components/ui/Toast.vue'
import JobStatusBadge from '~/components/jobs/JobStatusBadge.vue'

const api = useApi()

const publicaciones = ref<any[]>([])
const loading = ref(false)

// ===== Toast =====
const toast = reactive({
  visible: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

const showToast = (
  message: string,
  type: 'success' | 'error' = 'success'
) => {
  toast.message = message
  toast.type = type
  toast.visible = true
  setTimeout(() => (toast.visible = false), 3000)
}

// ===== Modal eliminar =====
const publicacionAEliminar = ref<any>(null)

const cargarPublicaciones = async () => {
  loading.value = true
  try {
    const res: any = await api('/api/publicaciones/mis-publicaciones')
    publicaciones.value = res.data || []
  } finally {
    loading.value = false
  }
}

onMounted(cargarPublicaciones)

const confirmarEliminar = (pub: any) => {
  publicacionAEliminar.value = pub
  document.body.style.overflow = 'hidden'
}

const cancelarEliminar = () => {
  publicacionAEliminar.value = null
  document.body.style.overflow = 'auto'
}

const eliminar = async () => {
  if (!publicacionAEliminar.value) return

  try {
    await api(`/api/publicaciones/${publicacionAEliminar.value.id}`, {
      method: 'DELETE'
    })

    showToast('Publicación archivada correctamente')
    await cargarPublicaciones()
  } catch (e: any) {
    showToast(
      e?.data?.message || 'Error al eliminar la publicación',
      'error'
    )
  } finally {
    cancelarEliminar()
  }
}
</script>

<template>
  <main class="max-w-5xl mx-auto px-4 py-8">
    <!-- Header -->
    <header class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#0A66C2]">
          Mis trabajos
        </h1>
        <p class="text-sm text-[#5E5E5E]">
          Publicaciones creadas por ti
        </p>
      </div>

      <NuxtLink
        to="/jobs/create"
        class="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-[#0A66C2] hover:bg-blue-700 transition"
      >
        Crear publicación
      </NuxtLink>
    </header>

    <!-- Loading -->
    <section v-if="loading" class="text-[#5E5E5E]">
      Cargando publicaciones…
    </section>

    <!-- Empty -->
    <section
      v-else-if="!publicaciones.length"
      class="bg-white rounded-xl p-8 text-center"
    >
      <p class="text-[#5E5E5E]">
        Aún no has creado ninguna publicación.
      </p>
    </section>

    <!-- Listado -->
    <section v-else class="space-y-4">
      <article
        v-for="pub in publicaciones"
        :key="pub.id"
        class="bg-white border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm"
      >
        <!-- Info -->
        <div>
          <div class="flex items-center gap-3 mb-1">
            <h2 class="font-semibold text-gray-900">
              {{ pub.trabajo.titulo }}
            </h2>

            <JobStatusBadge :status="pub.estado" />
          </div>

          <p class="text-sm text-[#5E5E5E]">
            {{ pub.trabajo.municipio.nombre }}
          </p>
        </div>

        <!-- Acciones -->
        <div class="flex gap-3">
          <NuxtLink
            :to="`/jobs/${pub.id}`"
            class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#0A66C2] hover:bg-blue-700 transition"
          >
            Ver
          </NuxtLink>

          <button
            @click="confirmarEliminar(pub)"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
          >
            Eliminar
          </button>
        </div>
      </article>
    </section>

    <!-- Modal confirmación -->
    <div
      v-if="publicacionAEliminar"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="cancelarEliminar"
      ></div>

      <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 text-center">
          ¿Eliminar publicación?
        </h3>

        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <p class="font-medium">
            {{ publicacionAEliminar.trabajo.titulo }}
          </p>
          <p class="text-sm text-gray-500">
            Esta acción archivará la publicación
          </p>
        </div>

        <div class="flex gap-3">
          <button
            @click="cancelarEliminar"
            class="flex-1 px-4 py-2 rounded-lg border border-gray-300"
          >
            Cancelar
          </button>

          <button
            @click="eliminar"
            class="flex-1 px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Toast
      :visible="toast.visible"
      :message="toast.message"
      :type="toast.type"
    />
  </main>
</template>
