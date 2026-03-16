<template>
  <div>
    <HeaderLuxe />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <SidebarLuxe />
        <div class="flex-1">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-bold text-white">Premium Watches</h2>
              <p class="text-sm text-slate-400">Showing 24 of 142 products</p>
            </div>
            <div class="flex items-center gap-4">
              <select class="bg-navy border-none text-sm text-white rounded-lg focus:ring-primary">
                <option>Sort by: Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>
          <ProductGridLuxe />
          <!-- pagination omitted for brevity -->
        </div>
      </div>
    </main>
    <FooterLuxe />
  </div>
</template>

<script setup>
import HeaderLuxe from '../components/luxe/HeaderLuxe.vue'
import SidebarLuxe from '../components/luxe/SidebarLuxe.vue'
import ProductGridLuxe from '../components/luxe/ProductGridLuxe.vue'
import FooterLuxe from '../components/luxe/FooterLuxe.vue'
</script>
