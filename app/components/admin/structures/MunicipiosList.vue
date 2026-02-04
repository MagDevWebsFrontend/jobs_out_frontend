<script setup lang="ts">
import type { ProvinciaEntity, MunicipioEntity } from '#shared/types/structures'

defineProps<{
  provincia: ProvinciaEntity
  municipios: MunicipioEntity[]
}>()

defineEmits(['create', 'edit', 'delete'])
</script>

<template>
  <div class="mt-8">
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-lg font-semibold">
        Municipios de {{ provincia.nombre }}
      </h2>

      <button
        class="px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700"
        @click="$emit('create')"
      >
        + Nuevo municipio
      </button>
    </div>

    <ul class="bg-white rounded-xl shadow divide-y">
      <li
        v-for="m in municipios"
        :key="m.id"
        class="flex justify-between items-center px-4 py-3 hover:bg-gray-50"
      >
        <span class="text-gray-800">{{ m.nombre }}</span>

        <div class="flex gap-2">
          <button
            class="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
            @click="$emit('edit', m)"
          >
            Editar
          </button>

          <button
            class="px-3 py-1 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200"
            @click="$emit('delete', m)"
          >
            Eliminar
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
