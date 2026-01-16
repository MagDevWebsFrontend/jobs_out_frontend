<!-- components/forms/BenefitsInput.vue - CORREGIDO -->
<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Beneficios Ofrecidos
    </label>
    
    <div class="space-y-3">
      <!-- Input para agregar nuevo beneficio -->
      <div class="flex gap-2">
        <input
          v-model="newBenefit"
          type="text"
          placeholder="Ej: Seguro médico, Bonos, etc."
          class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          @keyup.enter="addBenefit"
        />
        <button
          type="button"
          @click="addBenefit"
          class="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Agregar
        </button>
      </div>
      
      <!-- Lista de beneficios - CORREGIDO -->
      <div v-if="benefits.length > 0" class="flex flex-wrap gap-2 mt-3">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg"
        >
          <span>{{ benefit }}</span>
          <button
            type="button"
            @click="removeBenefit(index)"
            class="text-blue-500 hover:text-blue-700"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const benefits = defineModel({ type: Array, default: () => [] })
const newBenefit = ref('')

const addBenefit = () => {
  if (newBenefit.value.trim()) {
    benefits.value.push(newBenefit.value.trim())
    newBenefit.value = ''
  }
}

const removeBenefit = (index) => {
  benefits.value.splice(index, 1)
}
</script>