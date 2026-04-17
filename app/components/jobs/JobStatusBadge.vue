<!-- components/jobs/JobStatusBadge.vue -->
<template>
  <span
    class="px-2 py-0.5 text-xs font-medium rounded-full"
    :class="classes"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: 'borrador' | 'publicado' | 'archivado'
}>()

const labelMap = {
  borrador: 'Borrador',
  publicado: 'Publicado',
  archivado: 'Archivado'
}

const classMap = {
  borrador: 'bg-yellow-100 text-yellow-800',
  publicado: 'bg-green-100 text-green-800',
  archivado: 'bg-gray-200 text-gray-700'
}

const label = labelMap[props.status]
const classes = classMap[props.status]
</script>
