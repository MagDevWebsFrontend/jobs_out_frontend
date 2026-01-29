<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2">Salario mínimo</label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-slate-500 text-sm">CUP</span>
        <input v-model="min" type="number" min="0" step="50" inputmode="numeric"
               class="w-full pl-14 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2">Salario máximo</label>
      <div class="relative">
        <span class="absolute left-3 top-3 text-slate-500 text-sm">CUP</span>
        <input v-model="max" type="number" min="0" step="50" inputmode="numeric"
               class="w-full pl-14 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>
  </div>
</template>

<script setup>
const min = defineModel('min', { type: Number, default: 0 })
const max = defineModel('max', { type: Number, default: 0 })
</script>
