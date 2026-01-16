<!-- components/forms/ImageUpload.vue -->
<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Imagen de la Publicación
    </label>
    
    <div
      @dragover.prevent="dragover = true"
      @dragleave="dragover = false"
      @drop.prevent="handleDrop"
      :class="[
        'border-2 border-dashed rounded-lg p-8 text-center transition',
        dragover ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      ]"
    >
      <div v-if="!imagePreview">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="mt-4">
          <label for="file-upload" class="cursor-pointer">
            <span class="text-blue-600 hover:text-blue-500 font-medium">
              Sube una imagen
            </span>
            <span class="text-gray-600"> o arrastra y suelta</span>
          </label>
          <input
            id="file-upload"
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileSelect"
          />
        </div>
        <p class="text-xs text-gray-500 mt-2">
          PNG, JPG, GIF hasta 5MB
        </p>
      </div>
      
      <!-- Vista previa -->
      <div v-else class="relative">
        <img
          :src="imagePreview"
          alt="Vista previa"
          class="mx-auto max-h-64 rounded-lg"
        />
        <button
          type="button"
          @click="removeImage"
          class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const fileInput = ref(null)
const dragover = ref(false)
const imagePreview = ref(null)
const selectedFile = ref(null)

const emit = defineEmits(['update:modelValue'])

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
    emit('update:modelValue', file)
  }
}

const handleDrop = (event) => {
  dragover.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
    emit('update:modelValue', file)
  }
}

const removeImage = () => {
  selectedFile.value = null
  imagePreview.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('update:modelValue', null)
}
</script>