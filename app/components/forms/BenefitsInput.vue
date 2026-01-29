<template>
  <div>
    <label class="block text-sm font-medium text-slate-700 mb-2">
      Beneficios
    </label>

    <div class="flex gap-2">
      <input
        v-model="newBenefit"
        type="text"
        placeholder="Ej: Seguro médico, Bonos, Teletrabajo"
        @keyup.enter="addBenefit"
        class="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        @click="addBenefit"
        class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Agregar
      </button>
    </div>

    <div class="flex flex-wrap gap-2 mt-3">
      <span
        v-for="(b, i) in benefits"
        :key="i"
        class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
      >
        <span class="text-sm">{{ b }}</span>
        <button
          type="button"
          @click="removeBenefit(i)"
          class="text-blue-500 hover:text-blue-700"
          :aria-label="`Eliminar ${b}`"
        >
          ×
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const benefits = defineModel<string[]>({
  default: () => []
})

const newBenefit = ref('')

const addBenefit = () => {
  const value = newBenefit.value.trim()
  if (!value) return

  benefits.value.push(value)
  newBenefit.value = ''
}

const removeBenefit = (index: number) => {
  benefits.value.splice(index, 1)
}
</script>
