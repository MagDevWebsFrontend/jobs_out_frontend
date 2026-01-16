<!-- components/buttons/ActionButtons.vue -->
<template>
  <div class="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t">
    <button
      type="button"
      @click="emit('save-draft')"
      :disabled="loading"
      :class="[
        'px-6 py-3 rounded-lg font-medium transition',
        loading 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      ]"
    >
      {{ loading ? 'Guardando...' : 'Guardar Borrador' }}
    </button>
    
    <button
      type="button"
      @click="emit('publish')"
      :disabled="loading"
      :class="[
        'px-6 py-3 rounded-lg font-medium transition',
        loading
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      ]"
    >
      {{ loading ? 'Publicando...' : 'Publicar Ahora' }}
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['save-draft', 'publish'])

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>