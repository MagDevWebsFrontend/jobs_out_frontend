<script setup lang="ts">
import { useProvinciasStore } from '~/stores/structures/provincias'
import { useMunicipiosStore } from '~/stores/structures/municipios'

const props = defineProps<{
  modal: any
  provinciaId?: string
}>()

const emit = defineEmits(['close', 'saved'])

const provinciasStore = useProvinciasStore()
const municipiosStore = useMunicipiosStore()

const form = reactive({
  nombre: props.modal.data?.nombre || ''
})

const save = async () => {
  if (props.modal.type === 'provincia') {
    props.modal.mode === 'create'
      ? await provinciasStore.createProvincia(form)
      : await provinciasStore.updateProvincia(props.modal.data.id, form)
  } else {
    props.modal.mode === 'create'
      ? await municipiosStore.createMunicipio({
          ...form,
          provincia_id: props.provinciaId!
        })
      : await municipiosStore.updateMunicipio(props.modal.data.id, form)
  }

  emit('saved')
}
</script>

<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div class="bg-white p-4 w-80 rounded">
      <h3 class="mb-3 font-medium">
        {{ modal.mode === 'create' ? 'Crear' : 'Editar' }}
        {{ modal.type }}
      </h3>

      <input
        v-model="form.nombre"
        class="border w-full p-2 mb-4"
        placeholder="Nombre"
      />

      <div class="flex justify-end gap-2">
        <button @click="$emit('close')">Cancelar</button>
        <button @click="save">Guardar</button>
      </div>
    </div>
  </div>
</template>
