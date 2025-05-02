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
  compatibilityDate: '2025-04-26',
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
    registerType: 'prompt',
    manifest: {
      name: 'Elryan E-Shop',
      short_name: 'Elryan',
      description: 'One stop solution for all your needs',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/512x512.png',
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
            },
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 // 24 hours
            }
          }
        },
        {
          urlPattern: 'https://placehold.co/*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
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
      suppressWarnings: false,
      type: 'module',
      navigateFallbackAllowlist: [/^\//]
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
        { name: 'description', content: 'One stop solution for all your needs' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Elryan' }
      ],
      link: [
        { rel: 'apple-touch-icon', href: '/192x192.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://api.escuelajs.co/api/v1'
    }
  },
  css: ['~/assets/css/main.css'],
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
