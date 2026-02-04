<template>
  <div class="space-y-4">
    <!-- Salario mínimo -->
    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2">
        Salario mínimo
      </label>

      <div class="relative">
        <span class="absolute left-3 top-3 text-slate-500 text-sm">CUP</span>
        <input
          v-model="min"
          type="number"
          min="0"
          step="50"
          inputmode="numeric"
          class="w-full pl-14 pr-4 py-3 border rounded-lg focus:ring-2"
          :class="errors.salario_min
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-200 focus:ring-blue-500'"
        />
      </div>

      <p v-if="errors.salario_min" class="text-sm text-red-600 mt-1">
        {{ errors.salario_min }}
      </p>
    </div>

    <!-- Salario máximo -->
    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2">
        Salario máximo
      </label>

      <div class="relative">
        <span class="absolute left-3 top-3 text-slate-500 text-sm">CUP</span>
        <input
          v-model="max"
          type="number"
          min="0"
          step="50"
          inputmode="numeric"
          class="w-full pl-14 pr-4 py-3 border rounded-lg focus:ring-2"
          :class="errors.salario_max || errors.salario
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-200 focus:ring-blue-500'"
        />
      </div>

      <p v-if="errors.salario_max" class="text-sm text-red-600 mt-1">
        {{ errors.salario_max }}
      </p>

      <p v-if="errors.salario" class="text-sm text-red-600 mt-1">
        {{ errors.salario }}
      </p>
    </div>
  </div>
</template>

<script setup>
const min = defineModel('min', { type: Number, default: 0 })
const max = defineModel('max', { type: Number, default: 0 })

defineProps({
  errors: {
    type: Object,
    default: () => ({})
  }
})
</script>
