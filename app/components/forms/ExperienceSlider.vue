<!-- components/forms/ExperienceSlider.vue - CORREGIDO -->
<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <span class="text-lg font-semibold text-gray-800">
        {{ experienceLabel }}
      </span>
      <span class="text-sm text-gray-500">
        {{ experienceText }}
      </span>
    </div>
    
    <div class="px-2">
      <input
        v-model="modelValue"
        type="range"
        min="0"
        max="10"
        step="1"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
      />
      
      <div class="flex justify-between text-xs text-gray-500 mt-2">
        <span>0</span>
        <span>2</span>
        <span>4</span>
        <span>6</span>
        <span>8</span>
        <span>10+</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const modelValue = defineModel({ type: Number, default: 0 })

const experienceLabel = computed(() => {
  const labels = {
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