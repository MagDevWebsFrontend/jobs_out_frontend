<!-- pages/profile/index.vue -->
<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- COLUMNA IZQUIERDA: Info básica (ProfileHeader) -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6 sticky top-8">
          <ProfileHeader :user="userData" />
        </div>
      </div>
      
      <!-- COLUMNA DERECHA: Info detallada -->
      <div class="lg:col-span-2">
        <div class="space-y-8">
          <!-- ProfileInfo SOLO con info detallada (sin datos básicos duplicados) -->
          <ProfileInfo :user="userData" />
          
          <!-- Configuraciones -->
          <NotificationSettings :config="userData.configuracion" />
          <DangerZone />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import ProfileInfo from '~/components/profile/ProfileInfo.vue'
import NotificationSettings from '~/components/profile/NotificationSettings.vue'
import DangerZone from '~/components/profile/DangerZone.vue'

// Datos de ejemplo
const userData = ref({
  id: "77777777-7777-7777-7777-777777777777",
  nombre: "Juan",
  apellidos: "Pérez",
  username: "juanp",
  email: "juan@example.com",
  rol: "trabajador",
  telefono_e164: "+584141234567",
  municipio_id: "44444444-4444-4444-4444-444444444444",
  avatar_url: null,
  created_at: "2026-01-01T19:30:29.186Z",
  updated_at: "2026-01-16T21:25:32.652Z",
  configuracion: {
    telegram_notif: false,
    created_at: "2026-01-01T19:30:29.186Z",
    updated_at: "2026-01-01T19:30:29.186Z"
  },
  municipio: {
    id: "44444444-4444-4444-4444-444444444444",
    provincia_id: "11111111-1111-1111-1111-111111111111",
    nombre: "Municipio 2",
    created_at: "2026-01-01T19:30:29.186Z",
    provincia: {
      id: "11111111-1111-1111-1111-111111111111",
      nombre: "Provincia A",
      created_at: "2026-01-01T19:30:29.186Z"
    }
  }
})

definePageMeta({
  layout: 'profile-layout'
})
</script>