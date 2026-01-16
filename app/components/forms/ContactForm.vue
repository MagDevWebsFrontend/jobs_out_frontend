<!-- components/forms/ContactForm.vue -->
<template>
  <div class="space-y-6">
    <h3 class="text-lg font-medium text-gray-800">
      Información de Contacto
    </h3>
    
    <!-- Teléfono -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Teléfono *
      </label>
      <input
        v-model="telefono"
        type="tel"
        required
        placeholder="+53 5xxxxxxx"
        pattern="^\+[0-9\s\-\(\)]+$"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>
    
    <!-- Email -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Correo Electrónico *
      </label>
      <input
        v-model="email"
        type="email"
        required
        placeholder="contacto@empresa.com"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>
  </div>
</template>

<script setup>
const telefono = defineModel('telefono', { type: String, default: '' })
const email = defineModel('email', { type: String, default: '' })
</script>