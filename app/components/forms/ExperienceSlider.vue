<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <div class="text-base font-medium text-slate-800">{{ experienceLabel }}</div>
      <div class="text-sm text-slate-500">{{ experienceText }}</div>
    </div>

    <input
      v-model="modelValue"
      type="range"
      min="0"
      max="10"
      step="1"
      aria-label="Años de experiencia"
      class="w-full h-2 bg-slate-200 rounded-lg appearance-none"
    />

    <div class="flex justify-between text-xs text-slate-400 mt-2">
      <span>0</span><span>2</span><span>4</span><span>6</span><span>8</span><span>10+</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel({ type: Number, default: 0 })

const experienceLabel = computed(() => {
  const labels: Record<number, string> = {
    0: 'Sin experiencia',
    1: '1 año',
    2: '2 años',
    3: '3 años',
    4: '4 años',
    5: '5 años',
    6: '6 años',
    7: '7 años',
    8: '8 años',
    9: '9 años',
    10: '10+ años'
  }
  return labels[modelValue.value] || 'Sin experiencia'
})

const experienceText = computed(() => {
  if (modelValue.value === 10) return '10+ años'
  return `${modelValue.value} año${modelValue.value !== 1 ? 's' : ''}`
})
</script>
