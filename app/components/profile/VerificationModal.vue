<!-- components/profile/VerificationModal.vue -->
<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50" @click="close" aria-hidden="true"></div>

    <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
      <h3 class="text-lg font-semibold mb-4">Verifica tu cuenta en Telegram</h3>

      <p class="text-sm text-gray-600 mb-4">
        Copia el código y envíalo al bot para completar la vinculación.
      </p>

      <div class="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4">
        <div class="text-2xl font-mono">{{ code }}</div>
        <button @click="copyCode" class="px-3 py-1 bg-blue-600 text-white rounded">
          Copiar
        </button>
      </div>

      <p class="text-sm text-gray-700 mb-4">
        Abre el bot:
        <a :href="botLink" target="_blank" class="text-blue-600 underline">
          {{ botLinkText }}
        </a>
      </p>

      <div class="flex gap-3">
        <button @click="close" class="flex-1 px-4 py-2 rounded-lg border">Cerrar</button>
        <button @click="openBot" class="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white">Abrir bot</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: { type: Boolean, default: false },
  code: { type: String, default: '' },
  botLink: { type: String, default: '' }
});
const emit = defineEmits(['close']);

const botLinkText = props.botLink.replace('https://', '').replace('http://', '');

function close() {
  emit('close');
}

function copyCode() {
  navigator.clipboard.writeText(props.code)
    .then(() => {
      // Optional: toast success
    })
    .catch(() => {
      // Optional: notify error
    });
}

function openBot() {
  window.open(props.botLink, '_blank');
  emit('close');
}
</script>
