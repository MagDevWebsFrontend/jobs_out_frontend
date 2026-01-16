<!-- components/profile/DangerZone.vue -->
<template>
  <div class="bg-white rounded-xl shadow-lg p-6 border border-red-200">
    <div class="flex items-center gap-3 mb-6">
      <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.73-.833-2.464 0L4.276 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h2 class="text-xl font-bold text-red-900">
        Zona Peligrosa
      </h2>
    </div>
    
    <div class="space-y-6">
      <!-- Cambiar contraseña -->
      <div class="p-4 bg-red-50 rounded-lg border border-red-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-red-900">Cambiar Contraseña</h3>
            <p class="text-sm text-red-700 mt-1">
              Actualiza tu contraseña por seguridad
            </p>
          </div>
          
          <NuxtLink
            to="/profile/change-password"
            class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Cambiar
          </NuxtLink>
        </div>
      </div>
      
      <!-- Eliminar cuenta -->
      <div class="p-4 bg-red-50 rounded-lg border border-red-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-red-900">Eliminar Cuenta</h3>
            <p class="text-sm text-red-700 mt-1">
              Esta acción es permanente y no se puede deshacer
            </p>
          </div>
          
          <NuxtLink
            to="/profile/delete-account"
            class="px-4 py-2 bg-white text-red-600 border border-red-600 rounded-lg font-medium hover:bg-red-50 transition"
          >
            Eliminar
          </NuxtLink>
        </div>
      </div>
      
      <!-- Información de advertencia -->
      <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="text-sm text-yellow-800">
              <strong>Advertencia:</strong> Estas acciones son irreversibles. Por favor, procede con cuidado.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>