<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="container mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center">
              <img src="~/assets/images/ar-elryan-logo-mobile.svg" alt="Elryan Logo" class="h-12">
            </NuxtLink>
          </div>
          
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink
              to="/"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/categories"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Categories
            </NuxtLink>
            <NuxtLink
              to="/favorites"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Favorites
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-12">
      <div class="container mx-auto px-4 py-6">
        <p class="text-center text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} NuxtStore. Built with Nuxt 3.
        </p>
      </div>
    </footer>
  </div>
</template>
