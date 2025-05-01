<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">All Categories</h1>

    <!-- Loading State -->
    <template v-if="loading">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <SkeletonLoader
          v-for="n in 5"
          :key="n"
          type="category"
        />
      </div>
    </template>

    <!-- Categories Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="`/products/category/${category.id}`"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div class="aspect-square relative">
          <NuxtImg
            :src="category.image || 'https://via.placeholder.com/200'"
            :alt="category.name"
            class="w-full h-full object-cover"
            loading="lazy"
            preset="thumbnail"
            placeholder
          />
        </div>
        <div class="p-4 text-center">
          <h3 class="font-semibold text-gray-800">{{ category.name }}</h3>
          <p class="text-sm text-gray-600 mt-1">{{ productsInCategory(category.id) }} Products</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <button
        @click="fetchCategories"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '~/stores/categories'
import { useProductStore } from '~/stores/products'
import type { Category } from '~/stores/categories'

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const loading = ref(true)
const error = ref('')
const categories = ref<Category[]>([])

// Helper function to count products in each category
const productsInCategory = (categoryId: number) => {
  return productStore.products.filter(product => product.category?.id === categoryId).length
}

// Fetch categories
const fetchCategories = async () => {
  loading.value = true
  error.value = ''
  try {
    await categoryStore.fetchCategories()
    categories.value = categoryStore.categories
  } catch (err) {
    error.value = 'Failed to load categories. Please try again.'
    console.error('Error fetching categories:', err)
  } finally {
    loading.value = false
  }
}

// Initialize data
onMounted(async () => {
  await Promise.all([
    fetchCategories(),
    productStore.fetchProducts()
  ])
})
</script>
