<script setup lang="ts">
definePageMeta({ layout: 'admin' })

import type { ProvinciaEntity, MunicipioEntity } from '#shared/types/structures'
import { useProvinciasStore } from '~/stores/structures/provincias'
import { useMunicipiosStore } from '~/stores/structures/municipios'
import Toast from '~/components/ui/Toast.vue'

const provinciasStore = useProvinciasStore()
const municipiosStore = useMunicipiosStore()

const provinciaSeleccionada = ref<Provincia | null>(null)

const modal = reactive({
  open: false,
  type: 'provincia' as 'provincia' | 'municipio',
  mode: 'create' as 'create' | 'edit',
  data: null as Provincia | Municipio | null
})

onMounted(async () => {
  await provinciasStore.fetchProvincias()
  await municipiosStore.fetchMunicipios()
})

const municipiosPorProvincia = computed(() =>
  provinciaSeleccionada.value
    ? municipiosStore.municipios.filter(
        m => m.provincia_id === provinciaSeleccionada.value!.id
      )
    : []
)

const openCreateProvincia = () => {
  modal.open = true
  modal.type = 'provincia'
  modal.mode = 'create'
  modal.data = null
}

const openEditProvincia = (p: Provincia) => {
  modal.open = true
  modal.type = 'provincia'
  modal.mode = 'edit'
  modal.data = p
}

const openCreateMunicipio = () => {
  modal.open = true
  modal.type = 'municipio'
  modal.mode = 'create'
  modal.data = null
}

const openEditMunicipio = (m: Municipio) => {
  modal.open = true
  modal.type = 'municipio'
  modal.mode = 'edit'
  modal.data = m
}

const onSaved = async () => {
  modal.open = false
  await provinciasStore.fetchProvincias()
  await municipiosStore.fetchMunicipios()
}

const toast = reactive({
  visible: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

const confirmDelete = reactive({
  open: false,
  type: 'provincia' as 'provincia' | 'municipio',
  item: null as any
})

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.message = message
  toast.type = type
  toast.visible = true
  setTimeout(() => (toast.visible = false), 3000)
}

const askDeleteProvincia = (provincia: Provincia) => {
  confirmDelete.open = true
  confirmDelete.type = 'provincia'
  confirmDelete.item = provincia
}

const askDeleteMunicipio = (municipio: Municipio) => {
  confirmDelete.open = true
  confirmDelete.type = 'municipio'
  confirmDelete.item = municipio
}


const confirmDeleteAction = async () => {
  try {
    if (confirmDelete.type === 'provincia') {
      await provinciasStore.deleteProvincia(confirmDelete.item.id)
      showToast('Provincia eliminada correctamente')
    } else {
      await municipiosStore.deleteMunicipio(confirmDelete.item.id)
      showToast('Municipio eliminado correctamente')
    }

    await provinciasStore.fetchProvincias()
    await municipiosStore.fetchMunicipios()
  } catch (e: any) {
    showToast(e.message || 'Error al eliminar', 'error')
  } finally {
    confirmDelete.open = false
  }
}

</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl font-semibold">Provincias y Municipios</h1>
      <button 
      class="px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700"
      @click="openCreateProvincia">+ Nueva provincia</button>
    </div>

    <AdminStructuresProvinciasList
  :provincias="provinciasStore.provincias"
  @select="provinciaSeleccionada = $event"
  @edit="openEditProvincia"
  @delete="askDeleteProvincia"
    />

    <AdminStructuresMunicipiosList
      v-if="provinciaSeleccionada"
      :provincia="provinciaSeleccionada"
      :municipios="municipiosPorProvincia"
      @create="openCreateMunicipio"
      @edit="openEditMunicipio"
      @delete="askDeleteMunicipio"
    />


    <AdminStructuresProvinciaMunicipioModal
      v-if="modal.open"
      :modal="modal"
      :provincia-id="provinciaSeleccionada?.id"
      @saved="onSaved"
      @close="modal.open = false"
    />
  </div>

  <AdminStructuresConfirmDeleteModal
  :visible="confirmDelete.open"
  :message="`¿Seguro que deseas eliminar ${
    confirmDelete.type === 'provincia'
      ? 'la provincia'
      : 'el municipio'
  } '${confirmDelete.item?.nombre}'?`"
  @cancel="confirmDelete.open = false"
  @confirm="confirmDeleteAction"
/>

<Toast
  :visible="toast.visible"
  :message="toast.message"
  :type="toast.type"
/>

</template>
