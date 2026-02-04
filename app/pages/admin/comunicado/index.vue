<script setup lang="ts">
definePageMeta({ layout: 'admin' })

import { reactive } from 'vue';
import { useAdminNotifications } from '~/composables/useAdminNotifications';
import { useToast } from '~/composables/useToast'; // ajusta la ruta si difiere

const api = useApi();
const { sendBroadcast, state } = useAdminNotifications(api);
const toast = useToast();

const form = reactive({
  mensaje: '',
  audiencia: 'todos',
  canales: [] as string[] // values: 'whatsapp' | 'telegram' | 'email'
});

const canalesDisponibles = [
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Telegram', value: 'telegram' },
  { label: 'Email', value: 'email' }
];

const resetForm = () => {
  form.mensaje = '';
  form.audiencia = 'todos';
  form.canales = [];
};

const enviar = async () => {
  try {
    if (!form.mensaje.trim()) {
      toast.show('Escribe un mensaje', 'error');
      return;
    }
    if (form.canales.length === 0) {
      toast.show('Selecciona al menos un canal', 'error');
      return;
    }

    // map to backend contract: message, audience, channels
    const payload = {
      message: form.mensaje,
      audience: form.audiencia,
      channels: form.canales // IMPORTANT: 'channels' in English
    };

    const res = await sendBroadcast(payload);

    // backend returns { success, message, result }
    if (res && res.success) {
      toast.show('Comunicado enviado', 'success');

      // optional: show counts in console
      console.log('Broadcast result:', res.result || res);

      // reset form
      resetForm();
    } else {
      toast.show(res?.message || 'Error al enviar comunicado', 'error');
    }
  } catch (err) {
    console.error('Error al enviar comunicado:', err);
    toast.show('Error al enviar comunicado', 'error');
  }
};
</script>

<template>
  <div class="max-w-xl">
    <h1 class="text-xl font-semibold mb-4">Enviar comunicado</h1>

    <!-- Mensaje -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Comunicado</label>
      <textarea
        v-model="form.mensaje"
        rows="4"
        class="w-full border rounded p-2"
      />
    </div>

    <!-- Audiencia -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Enviar a</label>
      <select v-model="form.audiencia" class="border rounded p-2 w-full">
        <option value="todos">Todos los usuarios</option>
        <option value="notificados">Solo con notificaciones activas</option>
      </select>
    </div>

    <!-- Canales -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">Canales</label>
      <div class="flex gap-4">
        <label
          v-for="c in canalesDisponibles"
          :key="c.value"
          class="flex items-center gap-2"
        >
          <input
            type="checkbox"
            :value="c.value"
            v-model="form.canales"
          />
          {{ c.label }}
        </label>
      </div>
    </div>

    <button
      class="px-4 py-2 rounded bg-blue-600 text-white"
      @click="enviar"
      :disabled="state.loading"
    >
      {{ state.loading ? 'Enviando...' : 'Enviar comunicado' }}
    </button>
  </div>
</template>
