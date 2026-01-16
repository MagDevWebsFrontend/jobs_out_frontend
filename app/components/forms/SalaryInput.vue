<!-- components/forms/SalaryInput.vue -->
<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Salario Mínimo
      </label>
      <div class="relative">
        <input
          v-model="min"
          type="number"
          min="0"
          class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <span class="absolute left-4 top-3 text-gray-500">CUP</span>
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Salario Máximo
      </label>
      <div class="relative">
        <input
          v-model="max"
          type="number"
          min="0"
          class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <span class="absolute left-4 top-3 text-gray-500">CUP</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const min = defineModel('min', { type: Number, default: 0 })
const max = defineModel('max', { type: Number, default: 0 })
</script>