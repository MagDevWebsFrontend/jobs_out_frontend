<template>
  <div class="space-y-8">
    <section aria-labelledby="job-info" class="px-0">
      <h3 id="job-info" class="text-lg font-semibold text-slate-800">Información del puesto</h3>

      <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-2" for="titulo">Título del puesto *</label>
          <input
            id="titulo"
            v-model="form.titulo"
            type="text"
            required
            placeholder="Ej: Desarrollador Full Stack Senior"
            class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-2" for="descripcion">Descripción *</label>
          <textarea
            id="descripcion"
            v-model="form.descripcion"
            rows="5"
            required
            placeholder="Describe responsabilidades, requisitos y beneficios"
            class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>
    </section>

    <section aria-labelledby="job-details">
      <h3 id="job-details" class="text-lg font-semibold text-slate-800">Detalles del trabajo</h3>

      <div class="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Jornada -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2" for="jornada">Jornada *</label>
          <select id="jornada" v-model="form.jornada" required class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccione...</option>
            <option v-for="op in jornadaOptions" :key="op.value" :value="op.value">{{ op.label }}</option>
          </select>
        </div>

        <!-- Modalidad -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2" for="modo">Modalidad *</label>
          <select id="modo" v-model="form.modo" required class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccione...</option>
            <option v-for="op in modoOptions" :key="op.value" :value="op.value">{{ op.label }}</option>
          </select>
        </div>

        <!-- Ubicación -->
        <div class="lg:col-span-3">
          <label class="block text-sm font-medium text-slate-700 mb-2">Ubicación</label>
          <LocationSelector v-model="form.municipio_id" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import LocationSelector from './LocationSelector.vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  jornadaOptions: {
    type: Array,
    default: () => []
  },
  modoOptions: {
    type: Array,
    default: () => []
  }
})
</script>
