<!-- components/forms/LocationSelector.vue -->
<template>
  <div class="space-y-6">
    <!-- Provincia -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Provincia *
      </label>
      <select
        v-model="selectedProvinceId"
        required
        :disabled="loadingProvinces"
        @change="onProvinceChange"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Seleccione una provincia</option>
        <option
          v-for="province in provinces"
          :key="province.id"
          :value="province.id"
        >
          {{ province.nombre }}
        </option>
      </select>
      
      <!-- Loading estado para provincias -->
      <div v-if="loadingProvinces" class="mt-2 text-sm text-gray-500">
        Cargando provincias...
      </div>
    </div>

    <!-- Municipio -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Municipio *
      </label>
      <select
        v-model="selectedMunicipioId"
        required
        :disabled="!selectedProvinceId || loadingMunicipalities"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Seleccione un municipio</option>
        <option
          v-for="municipality in municipalities"
          :key="municipality.id"
          :value="municipality.id"
        >
          {{ municipality.nombre }}
        </option>
      </select>
      
      <!-- Estados -->
      <div v-if="loadingMunicipalities" class="mt-2 text-sm text-gray-500">
        Cargando municipios...
      </div>
      <div v-if="selectedProvinceId && !loadingMunicipalities && municipalities.length === 0" 
           class="mt-2 text-sm text-yellow-600">
        No hay municipios disponibles para esta provincia
      </div>
      <div v-if="!selectedProvinceId && !loadingMunicipalities" 
           class="mt-2 text-sm text-gray-500">
        Seleccione una provincia primero
      </div>
    </div>
  </div>
</template>

<script setup>
// Props para recibir/seleccionar municipio_id
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// Estados
const loadingProvinces = ref(false)
const loadingMunicipalities = ref(false)
const provinces = ref([])
const municipalities = ref([])
const selectedProvinceId = ref('')
const selectedMunicipioId = ref(props.modelValue || '')

// Watcher para sincronizar v-model
watch(selectedMunicipioId, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.modelValue, (newValue) => {
  if (newValue !== selectedMunicipioId.value) {
    selectedMunicipioId.value = newValue
  }
})

// Cargar provincias al montar
onMounted(async () => {
  await loadProvinces()
})

// Método para cargar provincias
const loadProvinces = async () => {
  try {
    loadingProvinces.value = true
    console.log('Cargando provincias...')
    
    // TODO: Reemplazar con llamada real a la API
    // const response = await $fetch('/api/provincias')
    
    // Datos de ejemplo
    await new Promise(resolve => setTimeout(resolve, 500))
    provinces.value = [
      { id: '1', nombre: 'La Habana' },
      { id: '2', nombre: 'Matanzas' },
      { id: '3', nombre: 'Villa Clara' },
      { id: '4', nombre: 'Santiago de Cuba' },
      { id: '5', nombre: 'Camagüey' }
    ]
    
    console.log('Provincias cargadas:', provinces.value.length)
  } catch (error) {
    console.error('Error cargando provincias:', error)
    // Podrías mostrar un mensaje de error al usuario
  } finally {
    loadingProvinces.value = false
  }
}

// Método para cargar municipios cuando se selecciona provincia
const loadMunicipalities = async (provinceId) => {
  if (!provinceId) {
    municipalities.value = []
    selectedMunicipioId.value = ''
    return
  }

  try {
    loadingMunicipalities.value = true
    console.log(`Cargando municipios para provincia ${provinceId}...`)
    
    // TODO: Reemplazar con llamada real a la API
    // const response = await $fetch(`/api/provincias/${provinceId}/municipios`)
    
    // Datos de ejemplo según provincia
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const municipiosPorProvincia = {
      '1': [
        { id: '101', nombre: 'La Habana Vieja' },
        { id: '102', nombre: 'Centro Habana' },
        { id: '103', nombre: 'Plaza de la Revolución' },
        { id: '104', nombre: 'Cerro' },
        { id: '105', nombre: 'Marianao' }
      ],
      '2': [
        { id: '201', nombre: 'Matanzas' },
        { id: '202', nombre: 'Varadero' },
        { id: '203', nombre: 'Cárdenas' },
        { id: '204', nombre: 'Colón' },
        { id: '205', nombre: 'Jovellanos' }
      ],
      '3': [
        { id: '301', nombre: 'Santa Clara' },
        { id: '302', nombre: 'Placetas' },
        { id: '303', nombre: 'Sagua la Grande' },
        { id: '304', nombre: 'Remedios' }
      ],
      '4': [
        { id: '401', nombre: 'Santiago de Cuba' },
        { id: '402', nombre: 'Contramaestre' },
        { id: '403', nombre: 'Palma Soriano' }
      ],
      '5': [
        { id: '501', nombre: 'Camagüey' },
        { id: '502', nombre: 'Florida' },
        { id: '503', nombre: 'Nuevitas' }
      ]
    }
    
    municipalities.value = municipiosPorProvincia[provinceId] || []
    selectedMunicipioId.value = ''
    
    console.log('Municipios cargados:', municipalities.value.length)
  } catch (error) {
    console.error('Error cargando municipios:', error)
    municipalities.value = []
  } finally {
    loadingMunicipalities.value = false
  }
}

// Handler cuando cambia la provincia
const onProvinceChange = (event) => {
  selectedProvinceId.value = event.target.value
  loadMunicipalities(event.target.value)
}

// Exponer método para resetear (opcional)
const resetLocation = () => {
  selectedProvinceId.value = ''
  selectedMunicipioId.value = ''
  municipalities.value = []
}

// Exponer métodos si es necesario
defineExpose({
  resetLocation,
  loadProvinces,
  loadMunicipalities
})
</script>