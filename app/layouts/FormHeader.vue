<!-- components/layout/FormHeader.vue -->
<template>
  <header class="bg-white shadow mb-8">
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
            {{ title }}
          </h1>
          <p v-if="description" class="text-gray-600 mt-2">
            {{ description }}
          </p>
        </div>
        <div v-if="$slots.right">
          <slot name="right" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: String
})
</script>