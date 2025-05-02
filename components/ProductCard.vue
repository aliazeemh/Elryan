<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <NuxtLink :to="`/products/${product.slug}`" class="block">
    <div class="relative aspect-square">
      <NuxtImg
        :src="product.images?.[0] || 'https://placehold.co/600x400'"
        :alt="product.title"
        class="w-full h-full object-cover"
        loading="lazy"
        preset="product"
        placeholder
      />
      <button
        @click.prevent="toggleFavorite"
        class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <Icon
          :name="isFavorite ? 'material-symbols:star' : 'material-symbols:star-outline'"
          class="text-yellow-500 w-6 h-6"
        />
      </button>
    </div>
    <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600">
          {{ product.title }}
        </h3>
        <p class="text-gray-600 text-sm mb-2">{{ product.category?.name || "" }}</p>
        <p class="text-xl font-bold text-blue-600">${{ product.price }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/stores/products";

const props = defineProps<{
  product: {
    id: number
    title: string
    price: number
    category: {
      name: string
    }
    images: string[]
  }
}>()

const store = useProductStore()
const isFavorite = computed(() => 
  store.favorites.some(p => p.id === props.product.id)
)

const toggleFavorite = () => {
  store.toggleFavorite(props.product)
}
</script>
