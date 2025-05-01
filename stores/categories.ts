import { defineStore } from 'pinia'

interface Category {
  id: number
  name: string
  image: string
}

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[]
  }),

  actions: {
    async fetchCategories() {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories')
        const data = await response.json()
        this.categories = data
      } catch (error) {
        console.error('Error fetching categories:', error)
        throw error
      }
    }
  }
})
