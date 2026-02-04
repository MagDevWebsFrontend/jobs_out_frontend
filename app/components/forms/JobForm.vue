<template>
  <div class="space-y-8">
    <!-- ================= INFO ================= -->
    <section aria-labelledby="job-info" class="px-0">
      <h3 id="job-info" class="text-lg font-semibold text-slate-800">
        Información del puesto
      </h3>

      <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Título -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Título del puesto *
          </label>

          <input
            v-model="form.titulo"
            type="text"
            class="w-full px-4 py-3 border rounded-lg transition"
            :class="errors.titulo ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'"
            placeholder="Ej: Desarrollador Full Stack Senior"
          />

          <p v-if="errors.titulo" class="text-sm text-red-600 mt-1">
            {{ errors.titulo }}
          </p>
        </div>

        <!-- Descripción -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Descripción *
          </label>

          <textarea
            v-model="form.descripcion"
            rows="5"
            class="w-full px-4 py-3 border rounded-lg transition"
            :class="errors.descripcion ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-blue-500'"
            placeholder="Describe responsabilidades, requisitos y beneficios"
          />

          <p v-if="errors.descripcion" class="text-sm text-red-600 mt-1">
            {{ errors.descripcion }}
          </p>
        </div>
      </div>
    </section>

    <!-- ================= DETALLES ================= -->
    <section aria-labelledby="job-details">
      <h3 id="job-details" class="text-lg font-semibold text-slate-800">
        Detalles del trabajo
      </h3>

      <div class="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Jornada -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Jornada *
          </label>

          <select
            v-model="form.jornada"
            class="w-full px-4 py-3 border rounded-lg"
            :class="errors.jornada ? 'border-red-500' : 'border-slate-200'"
          >
            <option value="">Seleccione...</option>
            <option v-for="op in jornadaOptions" :key="op.value" :value="op.value">
              {{ op.label }}
            </option>
          </select>

          <p v-if="errors.jornada" class="text-sm text-red-600 mt-1">
            {{ errors.jornada }}
          </p>
        </div>

        <!-- Modalidad -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Modalidad *
          </label>

          <select
            v-model="form.modo"
            class="w-full px-4 py-3 border rounded-lg"
            :class="errors.modo ? 'border-red-500' : 'border-slate-200'"
          >
            <option value="">Seleccione...</option>
            <option v-for="op in modoOptions" :key="op.value" :value="op.value">
              {{ op.label }}
            </option>
          </select>

          <p v-if="errors.modo" class="text-sm text-red-600 mt-1">
            {{ errors.modo }}
          </p>
        </div>

        <!-- Ubicación -->
        <div class="lg:col-span-3">
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Ubicación
          </label>

          <LocationSelector 
          v-model="form.municipio_id" 
          :errors="errors"
          />

          <p v-if="errors.municipio_id" class="text-sm text-red-600 mt-1">
            {{ errors.municipio_id }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import LocationSelector from './LocationSelector.vue'

defineProps({
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
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})
</script>
