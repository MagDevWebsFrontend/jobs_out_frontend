<!-- pages/jobs/index.vue -->
<template>
  <JobsDashboard />
</template>

<script setup>
definePageMeta({
  layout: 'jobs',
  middleware: 'auth'
})

useSeo({
  title: 'Oportunidades laborales - Jobs Out',
  description: 'Encuentra trabajos en Cuba — remoto, presencial, y más.',
  url: useRuntimeConfig().public.siteUrl + useRoute().fullPath,
  image: 'https://tusite.com/og-image.jpg',
  keywords: ['empleo', 'trabajo', 'vacantes']
})
</script>