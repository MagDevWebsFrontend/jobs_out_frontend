<script setup lang="ts">
defineProps<{
  visible: boolean
  title?: string
  message: string
  confirmText?: string
  loading?: boolean
}>()

defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
  >
    <div class="bg-white rounded-xl w-full max-w-sm p-5 shadow-lg">
      <h3 class="text-lg font-semibold mb-2">
        {{ title || 'Confirmar acción' }}
      </h3>

      <p class="text-sm text-gray-600 mb-4">
        {{ message }}
      </p>

      <div class="flex justify-end gap-2">
        <button
          class="px-3 py-1.5 rounded border"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>

        <button
          class="px-3 py-1.5 rounded bg-red-600 text-white"
          :disabled="loading"
          @click="$emit('confirm')"
        >
          {{ confirmText || 'Eliminar' }}
        </button>
      </div>
    </div>
  </div>
</template>
