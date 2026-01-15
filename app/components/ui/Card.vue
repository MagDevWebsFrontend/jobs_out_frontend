<template>
  <div :class="[
    'rounded-xl border bg-white transition-all duration-200',
    shadow ? 'shadow-lg' : 'shadow',
    hoverable && 'hover:shadow-xl hover:-translate-y-0.5',
    padding ? 'p-6' : '',
    className
  ]">
    <div v-if="$slots.header || title" class="mb-4">
      <div v-if="$slots.header">
        <slot name="header" />
      </div>
      <div v-else-if="title" class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <slot name="header-action" />
      </div>
    </div>
    
    <div :class="[noPadding ? '' : 'py-2']">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="mt-6 pt-6 border-t border-gray-200">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  shadow: {
    type: Boolean,
    default: true
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  padding: {
    type: Boolean,
    default: true
  },
  noPadding: {
    type: Boolean,
    default: false
  },
  className: String
})
</script>