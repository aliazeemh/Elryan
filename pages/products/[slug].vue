<template>
  <div v-if="product" class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Images -->
      <div class="relative">
        <div class="aspect-square mb-4">
          <NuxtImg
            :src="product.images?.[selectedImage] || 'https://placehold.co/600x400'"
            :alt="product.title"
            class="w-full h-full object-cover rounded-lg"
            preset="product"
            placeholder
          />
        </div>
        <div class="grid grid-cols-4 gap-4">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImage = index"
            class="aspect-square rounded-lg overflow-hidden border-2"
            :class="selectedImage === index ? 'border-blue-500' : 'border-transparent'"
          >
            <NuxtImg
              :src="image || 'https://placehold.co/300x200'"
              :alt="`${product.title} - Image ${index + 1}`"
              class="w-full h-full object-cover"
              preset="thumbnail"
              placeholder
            />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
        <div class="flex items-center justify-between mb-6">
          <p class="text-2xl font-bold text-blue-600">${{ product.price }}</p>
          <button
            @click="toggleFavorite"
            class="flex items-center gap-2 px-4 py-2 rounded-lg"
            :class="isFavorite ? 'bg-yellow-100' : 'bg-gray-100'"
          >
            <Icon
              :name="isFavorite ? 'material-symbols:star' : 'material-symbols:star-outline'"
              class="text-yellow-500 w-6 h-6"
            />
            <span>{{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}</span>
          </button>
        </div>
        
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">Category</h2>
          <NuxtLink
            :to="`/products/category/${product.category.slug}`"
            class="inline-flex items-center text-blue-600 hover:underline"
          >
            {{ product.category.name }}
          </NuxtLink>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-2">Description</h2>
          <p class="text-gray-600">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/stores/products'
import { useProductStore } from '~/stores/products'

const route = useRoute()
const config = useRuntimeConfig()
const store = useProductStore()

// State
const product = ref<Product | null>(null)
const selectedImage = ref(0)

// Computed
const isFavorite = computed(() =>
  store.favorites.some(p => p.id === product.value?.id)
)

// Methods
const toggleFavorite = () => {
  if (product.value) {
    store.toggleFavorite(product.value)
  }
}

// Fetch Data
onMounted(async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/products/slug/${route.params.slug}`)
    product.value = await response.json()
    
    if (product.value) {
      store.addToLastVisited(product.value)
    }
  } catch (error) {
    console.error('Error fetching product data:', error)
  }
})
</script>
