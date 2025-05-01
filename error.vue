<template>
  <NuxtLayout>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-6xl font-bold text-gray-800 mb-4">
          {{ error?.statusCode || '404' }}
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          {{ error?.message || 'Page not found' }}
        </p>
        <button
          @click="handleError"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: Error & {
    statusCode?: number
    url?: string
  }
}>()

const handleError = () => {
  clearError()
  navigateTo('/')
}
</script>
