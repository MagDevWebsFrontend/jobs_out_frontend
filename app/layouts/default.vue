<template>
  <div class="min-h-screen flex flex-col">
    <NavigationLandingNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <LandingFooterLanding />
  </div>
</template>

<script setup>
// Este layout se usará automáticamente para páginas sin layout definido
</script>