<template>
  <div class="w-full">
    <!-- Header opcional -->
    <div v-if="$slots.header" class="mb-6">
      <slot name="header" />
    </div>
    
    <!-- Contenido principal -->
    <div :class="[
      'bg-white rounded-2xl shadow-lg',
      padding ? 'p-8' : '',
      className
    ]">
      <slot />
    </div>
    
    <!-- Footer opcional -->
    <div v-if="$slots.footer" class="mt-6 text-center">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  padding: {
    type: Boolean,
    default: true
  },
  className: String
})
</script>