<template>
  <AuthLoginForm />
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  // middleware: 'guest' // Descomentar cuando implementes middleware de autenticación
})
</script>