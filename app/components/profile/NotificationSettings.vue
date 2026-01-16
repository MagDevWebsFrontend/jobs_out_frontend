<!-- components/profile/NotificationSettings.vue -->
<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900">
          Configuración de Notificaciones
        </h2>
        <p class="text-gray-600 mt-1">
          Controla cómo y cuándo recibes notificaciones
        </p>
      </div>
      
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="saveSettings"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Guardando...' : 'Guardar cambios' }}
        </button>
      </div>
    </div>
    
    <div class="space-y-6">
      <!-- Configuración de notificaciones -->
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 class="font-medium text-gray-900">Notificaciones por Telegram</h3>
            <p class="text-sm text-gray-500 mt-1">
              Recibe notificaciones importantes en tu cuenta de Telegram
            </p>
          </div>
          
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="settings.telegram_notif"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      
      <!-- Información adicional -->
      <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 class="font-medium text-blue-900">Información sobre notificaciones</h4>
            <p class="text-sm text-blue-700 mt-1">
              Las notificaciones incluyen: nuevos mensajes, actualizaciones de trabajos, recordatorios importantes y alertas del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:config'])

const loading = ref(false)
const settings = ref({
  telegram_notif: props.config.telegram_notif || false
})

// Watcher para sincronizar cambios
watch(settings, (newSettings) => {
  emit('update:config', newSettings)
}, { deep: true })

const saveSettings = async () => {
  loading.value = true
  console.log('Guardando configuración...', settings.value)
  
  // TODO: Reemplazar con llamada a la API
  // await $fetch('/api/user/notifications', {
  //   method: 'PUT',
  //   body: settings.value
  // })
  
  await new Promise(resolve => setTimeout(resolve, 800))
  loading.value = false
  
  // Podrías agregar un toast/notificación de éxito aquí
  console.log('Configuración guardada')
}
</script>