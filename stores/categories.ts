import { defineStore } from 'pinia'

export interface Category {
  id: number
  name: string
  image: string
  slug: string
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
        this.categories = data.map((category: Category) => ({
          ...category,
          slug: category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }))
      } catch (error) {
        console.error('Error fetching categories:', error)
        throw error
      }
    }
  }
})
