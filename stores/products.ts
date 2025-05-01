import { defineStore } from 'pinia'

export interface Product {
  id: number
  title: string
  description?: string
  price: number
  images: string[]
  category: {
    id?: number
    name: string
    image?: string
  }
}

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    lastVisited: [] as Product[],
    favorites: [] as Product[]
  }),

  actions: {
    async fetchProducts() {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products')
        const data = await response.json()
        this.products = data
      } catch (error) {
        console.error('Error fetching products:', error)
        throw error
      }
    },

    addToLastVisited(product: Product) {
      const index = this.lastVisited.findIndex(p => p.id === product.id)
      if (index !== -1) {
        this.lastVisited.splice(index, 1)
      }
      this.lastVisited.unshift(product)
      if (this.lastVisited.length > 5) {
        this.lastVisited.pop()
      }
    },

    toggleFavorite(product: Product) {
      const index = this.favorites.findIndex(p => p.id === product.id)
      if (index !== -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(product)
      }
    },

    isFavorite(productId: number) {
      return this.favorites.some(p => p.id === productId)
    }
  }
})
