import { defineNuxtPlugin } from '#app'
import { useProductStore } from "~/stores/products";
import type { Product } from '~/stores/products'

export default defineNuxtPlugin(() => {
  if (process.client) {
    const productStore = useProductStore()
    
    // Load stored data
    const storedFavorites = localStorage.getItem('favorites')
    const storedLastVisited = localStorage.getItem('lastVisited')
    
    if (storedFavorites) {
      productStore.favorites = JSON.parse(storedFavorites) as Product[]
    }
    if (storedLastVisited) {
      productStore.lastVisited = JSON.parse(storedLastVisited) as Product[]
    }
    
    // Watch for changes and store them
    watch(() => productStore.favorites, (newFavorites) => {
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }, { deep: true })
    
    watch(() => productStore.lastVisited, (newLastVisited) => {
      localStorage.setItem('lastVisited', JSON.stringify(newLastVisited))
    }, { deep: true })
  }
})
