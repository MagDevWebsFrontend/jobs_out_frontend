<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2" for="provincia">Provincia *</label>
      <div>
        <select
          id="provincia"
          v-model="selectedProvinceId"
          required
          :disabled="loadingProvinces"
          @change="onProvinceChange"
          :aria-busy="loadingProvinces"
          class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
        >
          <option value="">Seleccione una provincia</option>
          <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.nombre }}</option>
        </select>
        <div v-if="loadingProvinces" class="mt-2 text-xs text-slate-500">Cargando provincias…</div>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2" for="municipio">Municipio *</label>
      <div>
        <select
          id="municipio"
          v-model="selectedMunicipioId"
          required
          :disabled="!selectedProvinceId || loadingMunicipalities"
          :aria-busy="loadingMunicipalities"
          class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
        >
          <option value="">Seleccione un municipio</option>
          <option v-for="municipio in municipalities" :key="municipio.id" :value="municipio.id">{{ municipio.nombre }}</option>
        </select>

        <div v-if="loadingMunicipalities" class="mt-2 text-xs text-slate-500">Cargando municipios…</div>
        <div v-if="selectedProvinceId && !loadingMunicipalities && municipalities.length === 0" class="mt-2 text-xs text-amber-700">No hay municipios disponibles</div>
        <div v-if="!selectedProvinceId && !loadingMunicipalities" class="mt-2 text-xs text-slate-400">Seleccione una provincia primero</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi'

const props = defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const api = useApi()
const loadingProvinces = ref(false)
const loadingMunicipalities = ref(false)
const provinces = ref<any[]>([])
const municipalities = ref<any[]>([])
const selectedProvinceId = ref<string>('')
const selectedMunicipioId = ref<string>(props.modelValue || '')

watch(selectedMunicipioId, (newValue) => emit('update:modelValue', newValue))
watch(() => props.modelValue, (newVal) => {
  if (newVal !== selectedMunicipioId.value) selectedMunicipioId.value = newVal
})

onMounted(async () => {
  await loadProvinces()
  if (selectedMunicipioId.value) {
    try {
      const res: any = await api(`/api/municipios/${selectedMunicipioId.value}`)
      if (res?.success && res.data) {
        selectedProvinceId.value = res.data.provincia_id
        await loadMunicipalities(selectedProvinceId.value)
      }
    } catch {
      // no crítico
    }
  }
})

const loadProvinces = async () => {
  loadingProvinces.value = true
  try {
    const res: any = await api('/api/provincias')
    provinces.value = res.data || []
  } catch (e) {
    console.error('Error cargando provincias', e)
    provinces.value = []
  } finally {
    loadingProvinces.value = false
  }
}

const loadMunicipalities = async (provinceId: string) => {
  if (!provinceId) {
    municipalities.value = []
    selectedMunicipioId.value = ''
    return
  }
  loadingMunicipalities.value = true
  try {
    const res: any = await api(`/api/municipios?provincia_id=${provinceId}`)
    municipalities.value = res.data || []
    if (!municipalities.value.find(m => m.id === selectedMunicipioId.value)) {
      selectedMunicipioId.value = ''
    }
  } catch (e) {
    console.error('Error cargando municipios', e)
    municipalities.value = []
  } finally {
    loadingMunicipalities.value = false
  }
}

const onProvinceChange = (ev: Event) => {
  selectedProvinceId.value = (ev.target as HTMLSelectElement).value
  loadMunicipalities(selectedProvinceId.value)
}

defineExpose({ loadProvinces, loadMunicipalities })
</script>
