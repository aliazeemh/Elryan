<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">My Favorites</h1>

    <template v-if="favorites.length">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in favorites" :key="product.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-16 w-16 flex-shrink-0">
                    <NuxtImg
                      :src="product.images[0]"
                      :alt="product.title"
                      class="h-16 w-16 object-cover rounded"
                    />
                  </div>
                  <div class="ml-4">
                    <NuxtLink
                      :to="`/products/${product.id}`"
                      class="text-sm font-medium text-blue-600 hover:underline"
                    >
                      {{ product.title }}
                    </NuxtLink>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <NuxtLink
                  :to="`/categories/${product.category.id}`"
                  class="text-sm text-gray-900 hover:underline"
                >
                  {{ product.category.name }}
                </NuxtLink>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  ${{ product.price }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button
                  @click="removeFromFavorites(product)"
                  class="text-red-600 hover:text-red-800"
                >
                <Icon
                  name="material-symbols:delete-outline"
                  class="text-red-500 w-6 h-6"
                />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    
    <template v-else>
      <div class="text-center py-12">
        <Icon name="material-symbols:star-outline" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
        <p class="text-gray-500">Start adding products to your favorites by clicking the star icon.</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Browse Products
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/stores/products'
import { useProductStore } from "~/stores/products";

const store = useProductStore()
const favorites = computed(() => store.favorites)

const removeFromFavorites = (product: Product) => {
  store.toggleFavorite(product)
}
</script>
