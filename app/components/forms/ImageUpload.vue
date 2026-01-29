<template>
  <div class="space-y-4">
    <input
      type="file"
      accept="image/*"
      @change="onSelect"
      class="block w-full text-sm"
    />

    <div v-if="preview" class="mt-2">
      <img :src="preview" class="max-h-48 rounded-lg border" />
      <button
        type="button"
        @click="clear"
        class="mt-2 text-sm text-red-600"
      >
        Quitar imagen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/* 👇 props del v-model */
const props = defineProps<{
  modelValue: File | null
}>()

/* 👇 emits del v-model */
const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

const preview = ref<string | null>(null)

/* Seleccionar archivo */
const onSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  emit('update:modelValue', file)
  preview.value = URL.createObjectURL(file)
}

/* Quitar imagen */
const clear = () => {
  emit('update:modelValue', null)

  if (preview.value) {
    URL.revokeObjectURL(preview.value)
  }
  preview.value = null
}
</script>
