// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    build: {
      target: 'esnext',
      sourcemap: false
    },
    worker: {
      format: 'es'
    },
    optimizeDeps: {
      exclude: ['fsevents']
    }
  },
  compatibilityDate: '2025-05-01',
  modules: [
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }],
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Elryan E-Shop',
      short_name: 'Elryan',
      theme_color: '#ffffff',
      icons: [
        {
          src: '192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: 'https://api.escuelajs.co/api/v1/*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      type: 'module'
    }
  },
  nitro: {
    routeRules: {
      '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000' } }
    }
  },
  experimental: {
    payloadExtraction: false
  },
  app: {
    head: {
      title: 'Elryan E-Commerce',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A modern e-commerce website built with Nuxt 3' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://api.escuelajs.co/api/v1'
    }
  },
  image: {
    provider: 'ipx',
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 80,
          height: 80
        }
      },
      product: {
        modifiers: {
          format: 'webp',
          width: 400,
          height: 400
        }
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          width: 200,
          height: 200
        }
      }
    }
  },
  devtools: { enabled: true }
})
