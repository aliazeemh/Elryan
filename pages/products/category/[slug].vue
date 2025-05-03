<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <template v-if="loading">
      <div class="mb-8">
        <SkeletonLoader type="category" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <SkeletonLoader
          v-for="n in 8"
          :key="n"
          type="product"
        />
      </div>
    </template>

    <template v-else-if="category">
      <!-- Category Header -->
      <div class="mb-8 flex items-center space-x-4">
        <div class="w-24 h-24 rounded-lg overflow-hidden">
          <NuxtImg
            :src="category.image"
            :alt="category.name"
            class="w-full h-full object-cover"
            loading="lazy"
            preset="thumbnail"
          />
        </div>
        <div>
          <h1 class="text-3xl font-bold">{{ category.name }}</h1>
          <p class="text-gray-600 mt-2">{{ products.length }} Products</p>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="displayedProducts.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
          class="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div v-else class="text-center py-12">
        <p class="text-gray-500">No products found in this category</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          class="px-4 py-2 rounded-md transition-colors duration-200"
          :class="{
            'bg-blue-600 text-white': currentPage === page,
            'bg-gray-200 text-gray-700 hover:bg-gray-300': currentPage !== page
          }"
          v-text="page"
        />
      </div>
    </template>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <button
        @click="retryCount = 0; fetchCategoryData()"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
      <NuxtLink
        to="/categories"
        class="mt-4 ml-4 inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        View All Categories
      </NuxtLink>
    </div>
    <!-- Not Found State -->
    <div v-else class="text-center py-12">
      <p class="text-red-500">Category not found</p>
      <NuxtLink
        to="/categories"
        class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        View All Categories
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '~/stores/categories'
import { useProductStore } from '~/stores/products'
import type { Category } from '~/stores/categories'
import type { Product } from '~/stores/products'

const route = useRoute()
const categoryStore = useCategoryStore()
const productStore = useProductStore()
const config = useRuntimeConfig()

// State
const category = ref<Category | null>(null)
const products = ref<Product[]>([])
const currentPage = ref(1)
let itemsPerPage = config.public.itemsPerPage
const loading = ref(true)
const error = ref('')
const retryCount = ref(0)
const maxRetries = 3

// Computed
const displayedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return products.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() =>
  Math.ceil(products.value.length / itemsPerPage)
)

// Fetch category and its products
const fetchCategoryData = async () => {
  loading.value = true
  error.value = ''
  try {
    await Promise.all([
      categoryStore.fetchCategories(),
      productStore.fetchProducts()
    ]).catch(async (err) => {
      console.error('Network error:', err)
      if (retryCount.value < maxRetries) {
        retryCount.value++
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount.value))
        return fetchCategoryData()
      }
      throw new Error('Network error after retries')
    })

    // Find category by slug
    category.value = categoryStore.categories.find(
      cat => cat.slug === route.params.slug
    ) || null

    if (category.value) {
      // Filter products by category
      products.value = productStore.products.filter(
        product => product.category?.id === category.value?.id
      )
    }
  } catch (err) {
    console.error('Error fetching category data:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load category data'
  } finally {
    if (!error.value) {
      retryCount.value = 0
    }
    loading.value = false
  }
}

// Watch for route changes to reload data
watch(() => route.params.slug, fetchCategoryData, { immediate: true })
</script>
