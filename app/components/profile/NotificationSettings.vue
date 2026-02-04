<!-- components/profile/NotificationSettings.vue -->
<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <div class="space-y-6">
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
            <div
              class="w-11 h-6 bg-gray-200 rounded-full
                    peer-focus:ring-2 peer-focus:ring-blue-300
                    peer-checked:bg-blue-600
                    transition-colors duration-200 relative"
            >
              <span
                class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
                      transform transition-transform duration-200
                      peer-checked:translate-x-5"
              ></span>
            </div>
          </label>

        </div>
      </div>

      <!-- Información adicional (igual) -->
      <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
        Al activar esta opcion permites que te enviemos:
        - recordatorios siempre a las 8 am via telegram asi como notificaciones personalizadas de nuestros administradores. Gracias
      </div>

      <div class="flex justify-end">
        <button
          type="button"
          @click="saveSettings"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {{ loading ? 'Guardando...' : 'Guardar cambios' }}
        </button>
      </div>
    </div>

    <!-- Modal de verificación -->
    <VerificationModal
      :visible="showCodeModal"
      :code="verificationCode"
      :botLink="botLink"
      @close="showCodeModal = false"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import VerificationModal from '~/components/profile/VerificationModal.vue';
import { useNotifications } from '~/composables/useNotifications'; // si lo guardas como composable export default export
import { useAuthStore } from '~/stores/auth';

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:config']);

const auth = useAuthStore();
const userId = computed(() => auth.user?.id);

// local state
const loading = ref(false);
const settings = ref({
  telegram_notif: props.config.telegram_notif || false
});
const showCodeModal = ref(false);
const verificationCode = ref('');
const botLink = ref('');

// composable
const api = useApi(); // tu helper
const { updateNotificationConfig, requestTelegramCode, state } = useNotifications(api);

// watcher para emitir cambios si necesitas
watch(settings, (newVal) => {
  emit('update:config', newVal);
}, { deep: true });

// Guarda configuración y si activó telegram pide el código
async function saveSettings() {
  if (!userId.value) {
    // fallback: pedir recarga o login
    return;
  }

  loading.value = true;

  try {
    // 1) Actualizar configuración en backend
    await updateNotificationConfig(userId.value, {
      telegram_notif: settings.value.telegram_notif
    });

    // 2) Si activó telegram y aún no tiene chat_id → solicitar código
    if (settings.value.telegram_notif) {
      // Llamada al endpoint para generar código
      const data = await requestTelegramCode(userId.value); // { code, bot_link }

      // Mostrar modal con el código
      verificationCode.value = data.code;
      botLink.value = data.bot_link || `https://t.me/${process.env.TELEGRAM_BOT_USERNAME?.replace('@','') || 'YourBot'}`;
      showCodeModal.value = true;
    } else {
      // Si desactivó, puedes notificarlo
    }

    // Actualiza usuario en store para reflejar cambios (opcional)
    // Puedes re-fetch user profile: await api('/api/auth/me')
    const updated = await api('/api/auth/me'); // opcional
    auth.user = updated.data;

  } catch (err) {
    console.error('Error guardando notificaciones', err);
    // muestra toast
  } finally {
    loading.value = false;
  }
}
</script>
