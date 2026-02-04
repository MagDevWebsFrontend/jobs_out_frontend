<template>
  <div class="space-y-4">
    <h3 class="text-base font-medium text-slate-800">Contacto</h3>

    <!-- Error general -->
    <p v-if="errors.contacto" class="text-sm text-red-600">
      {{ errors.contacto }}
    </p>

    <!-- Teléfono -->
    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2">
        Teléfono
      </label>

      <input
        v-model="telefono"
        type="tel"
        inputmode="tel"
        placeholder="+53 5xxxxxxx"
        class="w-full px-4 py-3 border rounded-lg focus:ring-2"
        :class="errors.telefono
          ? 'border-red-500 focus:ring-red-500'
          : 'border-slate-200 focus:ring-blue-500'"
      />

      <p v-if="errors.telefono" class="text-sm text-red-600 mt-1">
        {{ errors.telefono }}
      </p>

      <p class="text-xs text-slate-400 mt-1">
        Incluye código de país, p.ej. +53XXXXXXXX
      </p>
    </div>

    <!-- Email -->
    <div>
      <label class="block text-sm font-medium text-slate-700 mb-2">
        Correo electrónico
      </label>

      <input
        v-model="email"
        type="email"
        placeholder="contacto@empresa.com"
        class="w-full px-4 py-3 border rounded-lg focus:ring-2"
        :class="errors.email
          ? 'border-red-500 focus:ring-red-500'
          : 'border-slate-200 focus:ring-blue-500'"
      />

      <p v-if="errors.email" class="text-sm text-red-600 mt-1">
        {{ errors.email }}
      </p>
    </div>
  </div>
</template>

<script setup>
const telefono = defineModel('telefono', { type: String, default: '' })
const email = defineModel('email', { type: String, default: '' })

defineProps({
  errors: {
    type: Object,
    default: () => ({})
  }
})
</script>
