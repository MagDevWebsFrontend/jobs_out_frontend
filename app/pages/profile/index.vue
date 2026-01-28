<!-- pages/profile/index.vue -->
<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- COLUMNA IZQUIERDA: Info básica (ProfileHeader) -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6 sticky top-8">
          <ProfileHeader :user="user" />
        </div>
      </div>
      
      <!-- COLUMNA DERECHA: Info detallada -->
      <div class="lg:col-span-2">
        <div class="space-y-8">
          <!-- ProfileInfo SOLO con info detallada (sin datos básicos duplicados) -->
          <ProfileInfo :user="user" />
          
          <!-- Configuraciones -->
          <NotificationSettings :config="user.configuracion" />
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
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'profile-layout',
  middleware: 'auth'
})

const api = useApi()
const auth = useAuthStore()
const { user } = storeToRefs(auth)

/**
 * Si el usuario no está cargado aún → fetch
 */
if (!user.value) {
  const res = await api('/api/auth/me')
  auth.user = res.data
}
</script>