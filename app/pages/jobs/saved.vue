<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Mis guardados</h1>

    <div v-if="loading">Cargando...</div>

    <div v-else class="space-y-4">
      <div
        v-for="pub in guardados"
        :key="pub.id"
        class="bg-white p-6 rounded-xl shadow flex justify-between items-center"
      >
        <div @click="ver(pub.id)" class="cursor-pointer">
          <h2 class="font-semibold">{{ pub.trabajo.titulo }}</h2>
          <p class="text-sm text-gray-500">
            {{ pub.trabajo.municipio.nombre }}
          </p>
        </div>

        <button
          @click="confirmar(pub.id)"
          class="text-yellow-600 hover:text-yellow-800"
        >
          🔖
        </button>
      </div>
    </div>

    <!-- Confirmación -->
    <UiModal v-if="confirmId" @close="confirmId = null">
      <p>¿Deseas eliminar esta publicación de guardados?</p>
      <div class="flex justify-end gap-3 mt-4">
        <UiButton @click="confirmId = null" variant="outline">No</UiButton>
        <UiButton @click="eliminar" class="bg-red-600 text-white">Sí</UiButton>
      </div>
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import { useGuardadosStore } from '~/stores/guardados'

definePageMeta({
  middleware: 'auth',
  layout: 'jobs-list'
})

const store = useGuardadosStore()
const confirmId = ref<string | null>(null)

await store.obtenerGuardados()

const { guardados, loading } = store

const ver = (id: string) => navigateTo(`/jobs/${id}`)
const confirmar = (id: string) => (confirmId.value = id)
const eliminar = async () => {
  await store.eliminarGuardado(confirmId.value!)
  confirmId.value = null
}
</script>
