<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Search Bar -->
    <div class="mb-8">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="w-full max-w-xl px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @input="handleSearch"
      />
    </div>

    <!-- Loading State -->
    <template v-if="loading">
      <!-- Categories Skeleton -->
      <div class="mb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <SkeletonLoader
          v-for="n in 6"
          :key="n"
          type="category"
        />
      </div>

      <!-- Products Skeleton -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <SkeletonLoader
          v-for="n in 10"
          :key="n"
          type="product"
        />
      </div>
    </template>


    <!-- Recently Viewed Products -->
    <section v-if="lastVisited.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Recently Viewed</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ProductCard
          v-for="product in [...lastVisited].reverse().slice(0, 5)"
          :key="product.id"
          :product="product"
          class="transition-transform duration-300 hover:scale-105"
        />
      </div>
    </section>

    
    <!-- Favorites -->
    <section v-if="favorites.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Favorites</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ProductCard
          v-for="product in [...favorites].reverse().slice(0, 5)"
          :key="product.id"
          :product="product"
          class="transition-transform duration-300 hover:scale-105"
        />
      </div>
    </section>
    
    <!-- Categories -->
    <section v-if="!loading && categories.length" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Categories</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/products/category/${category.slug}`"
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
          <div class="p-2 text-center">
            <h3 class="font-medium text-gray-800">{{ category.name }}</h3>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Products Grid -->
    <section v-if="!loading && products.length" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">All Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
          class="transition-transform duration-300 hover:scale-105"
        />
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
    </section>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  title: string
  description: string
  price: number
  images: string[]
  category: Category
}

interface Category {
  id: number
  name: string
  image: string
  slug: string
}

import { useProductStore } from '~/stores/products'
import { useCategoryStore } from '~/stores/categories'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const categories = ref<Category[]>([])
const products = ref<Product[]>([])
const loading = ref(true)

// Computed
const lastVisited = computed(() => productStore.lastVisited)
const favorites = computed(() => productStore.favorites)
const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage))

const searchResults = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const displayedProducts = computed(() => {
  const filtered = searchResults.value
  const start = (currentPage.value - 1) * itemsPerPage
  return filtered.slice(start, start + itemsPerPage)
})

// Already declared above
// const totalPages = computed(() =>
//   Math.ceil(searchResults.value.length / itemsPerPage)
// )

// Methods
const handleSearch = () => {
  productStore.searchQuery = searchQuery.value
  currentPage.value = 1
}

watchEffect(() => {
  productStore.searchQuery = searchQuery.value
})

// Fetch Data
onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      categoryStore.fetchCategories(),
      productStore.fetchProducts()
    ])

    categories.value = categoryStore.categories
    products.value = productStore.products
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Add your scoped styles here */
</style>
