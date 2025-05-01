<template>
  <div class="animate-pulse">
    <div v-if="type === 'product'" class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-gray-200 h-48"></div>
      <div class="p-4">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="space-y-3 mt-4">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>

    <div v-else-if="type === 'category'" class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-gray-200 h-24"></div>
      <div class="p-2">
        <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: 'product' | 'category'
}>()
</script>
