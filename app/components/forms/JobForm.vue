<!-- components/forms/JobForm.vue -->
<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
        Información del Puesto
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Título del Puesto *
          </label>
          <input
            v-model="form.titulo"
            type="text"
            required
            placeholder="Ej: Desarrollador Full Stack Senior"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Descripción *
          </label>
          <textarea
            v-model="form.descripcion"
            rows="4"
            required
            placeholder="Describe las responsabilidades, requisitos y oportunidades..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
        Detalles del Trabajo
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Jornada -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Jornada *
          </label>
          <select
            v-model="form.jornada"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">Seleccione...</option>
            <option value="completa">Tiempo Completo</option>
            <option value="media">Media Jornada</option>
            <option value="parcial">Parcial</option>
            <option value="flexible">Horario Flexible</option>
          </select>
        </div>
        
        <!-- Modalidad -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Modalidad *
          </label>
          <select
            v-model="form.modo"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">Seleccione...</option>
            <option value="presencial">Presencial</option>
            <option value="remoto">Remoto</option>
            <option value="hibrido">Híbrido</option>
          </select>
        </div>
        
        <!-- Ubicación (ahora usa el componente) -->
        <div class="lg:col-span-3">
          <h3 class="text-lg font-medium text-gray-800 mb-4">
            Ubicación
          </h3>
          <LocationSelector v-model="form.municipio_id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LocationSelector from './LocationSelector.vue'

const form = defineModel('form', {
  type: Object,
  required: true
})
</script>