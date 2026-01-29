<template>
  <div class="space-y-4">
    <h3 class="text-base font-medium text-slate-800">Contacto</h3>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2" for="telefono">Teléfono *</label>
      <input
        id="telefono"
        v-model="telefono"
        type="tel"
        required
        inputmode="tel"
        placeholder="+53 5xxxxxxx"
        class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <p class="text-xs text-slate-400 mt-1">Incluye código de país, p.ej. +53 5xxxxxxx</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2" for="email">Correo electrónico *</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        placeholder="contacto@empresa.com"
        class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</template>

<script setup>
const telefono = defineModel('telefono', { type: String, default: '' })
const email = defineModel('email', { type: String, default: '' })
</script>
