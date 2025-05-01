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
          
          <div class="flex items-center">
            <NuxtLink
              to="/favorites"
              class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <Icon name="material-symbols:star" class="w-5 h-5 mr-1" />
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
