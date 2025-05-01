# NuxtStore - E-commerce Website

A modern e-commerce website built with Nuxt.js 3, featuring product listings, categories, favorites, and more.

## Features

- **Home Page**
  - Product search functionality
  - Category listings
  - Recently viewed products
  - Latest products grid with pagination

- **Categories Page**
  - List of all categories
  - Products by category with pagination

- **Product Details**
  - Product images gallery
  - Product information
  - Add/Remove from favorites

- **Favorites Page**
  - Table view of favorite products
  - Quick remove functionality

## Technical Stack

- Nuxt.js 3
- Pinia for state management
- Tailwind CSS for styling
- Nuxt Image for optimized images
- Platzi Fake Store API

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open (http://localhost:3000) in your browser

## State Management

- Uses Pinia for managing application state
- Persists favorites and recently viewed products
- Handles search query state

## API Integration

The application uses the Platzi Fake Store API (https://api.escuelajs.co/api/v1/) for:
- Product listings
- Category management
- Product details

## Performance Optimizations

- Lazy loading of images
- Pagination for product listings
- State persistence for better user experience
- Optimized API calls

## PWA 

1. Run the build command
   ```bash
   npm run build
   ```
2. Run the preview command
   ```bash
   PORT=3100 npm run preview
   ```
3. Open (http://localhost:3100) in your browser

4. Installation icon will appear on Chrome location bar on right.