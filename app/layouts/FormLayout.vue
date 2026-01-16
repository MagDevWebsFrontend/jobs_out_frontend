<!-- components/layout/FormLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <slot name="header" />
    
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <slot />
      </div>
      
      <div class="mt-8">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>