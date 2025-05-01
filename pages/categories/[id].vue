<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>

    <!-- Category Header -->
    <div v-else-if="category" class="mb-8">
      <h1 class="text-3xl font-bold mb-2" v-text="category.name" />
      <p class="text-gray-600" v-text="category.description || 'Products in this category'" />
    </div>

    <!-- Products Grid -->
    <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <template v-if="products.length">
        <ProductCard
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
          class="transition-transform duration-300 hover:scale-105"
        />
      </template>
      <template v-else>
        <div class="col-span-full text-center py-12">
          <p class="text-gray-500">No products found in this category</p>
        </div>
      </template>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        class="mx-1 px-4 py-2 rounded"
        :class="{
          'bg-blue-600 text-white': currentPage === page,
          'bg-gray-200 hover:bg-gray-300': currentPage !== page
        }"
        v-text="page"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from '~/stores/products'

const route = useRoute()
const config = useRuntimeConfig()

// State
const category = ref<Category | null>(null)
const products = ref<Product[]>([])
const currentPage = ref(1)
const itemsPerPage = 12 // Changed to 12 for better grid layout
const loading = ref(true)

// Computed
const displayedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return products.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() =>
  Math.ceil(products.value.length / itemsPerPage)
)

// Fetch Data
onMounted(async () => {
  loading.value = true
  try {
    const [categoryResponse, productsResponse] = await Promise.all([
      fetch(`${config.public.apiBase}/categories/${route.params.id}`),
      fetch(`${config.public.apiBase}/categories/${route.params.id}/products`)
    ])
    
    if (!categoryResponse.ok || !productsResponse.ok) {
      throw new Error('Failed to fetch data')
    }

    const [categoryData, productsData] = await Promise.all([
      categoryResponse.json(),
      productsResponse.json()
    ])

    category.value = categoryData
    products.value = productsData.map((product: Product) => ({
      ...product,
      images: product.images?.filter(url => url && url.startsWith('http')) || []
    }))
  } catch (error) {
    console.error('Error fetching category data:', error)
  } finally {
    loading.value = false
  }
})
</script>
