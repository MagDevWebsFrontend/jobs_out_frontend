<script setup lang="ts">
import type { ProvinciaEntity } from '#shared/types/structures'

defineProps<{
  provincias: ProvinciaEntity[]
}>()

defineEmits(['select', 'edit', 'delete'])
</script>

<template>
  <ul class="bg-white rounded-xl shadow divide-y">
    <li
      v-for="p in provincias"
      :key="p.id"
      class="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
    >
      <span
        class="font-medium cursor-pointer text-gray-800"
        @click="$emit('select', p)"
      >
        {{ p.nombre }}
      </span>

      <div class="flex gap-2">
        <button
          class="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
          @click="$emit('edit', p)"
        >
          Editar
        </button>

        <button
          class="px-3 py-1 text-sm rounded bg-red-100 text-red-700 hover:bg-red-200"
          @click="$emit('delete', p)"
        >
          Eliminar
        </button>
      </div>
    </li>
  </ul>
</template>
