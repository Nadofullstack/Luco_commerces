<template>
  <nav class="fixed top-0 w-full z-50 glass-nav border-b border-navy/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-3xl">diamond</span>
          <span class="text-xl font-bold tracking-tight text-gold">PremiumMarket</span>
        </div>

        <div class="hidden md:flex items-center gap-10">
          <router-link class="text-sm font-medium text-slate-200 hover:text-gold transition-colors" to="/">Home</router-link>
          <router-link class="text-sm font-medium text-slate-200 hover:text-gold transition-colors" :to="{ path: '/', hash: 'products' }">Products</router-link>
          <router-link class="text-sm font-medium text-slate-200 hover:text-primary transition-colors" to="/contact">Contact</router-link>
          <router-link class="text-sm font-medium text-slate-200 hover:text-gold transition-colors" to="/admin/login">Admin</router-link>
        </div>

        <div class="flex items-center gap-5">
          <button class="relative p-2 text-slate-200 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">shopping_cart</span>
            <span
              class="absolute top-0 right-0 bg-primary text-midnight text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              >2</span
            >
          </button>
          <button class="md:hidden text-slate-200" @click="mobileOpen = !mobileOpen">
            <span class="material-symbols-outlined">menu</span>
          </button>
          <div
            class="hidden md:block w-10 h-10 rounded-full border-2 border-primary/30 overflow-hidden"
          >
            <img
              alt="Profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0khJ5mgT1Cv_E9R0gRRPKiKUNYX6HLKB1ZG4FnKBtBb4Ha4PVT5F6vfZ9J8VyxgE2OojzbwiwYSV_kI7TXXks6bwgOWza1L6Q15mf3IZtkYuuXYPRDCTuv-yaXFTxteivtMyH30HbbBaYsIYYvw959aVum8us3cSRqyQH8aT2a9cP2r6wcfJGH7fUEmdUVyjh0dKh5R1n5c4tSo1PO9zs6x8ynRCQRgP62iF4UTFrJYXTc-tFXI7627GQuAlMxhwo7HNXDSbaY85G"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- mobile menu -->
    <div v-if="mobileOpen" class="md:hidden bg-navy/90">
      <div class="px-4 py-2 space-y-2">
        <router-link class="block text-slate-200 hover:text-gold" to="/">Home</router-link>
        <router-link class="block text-slate-200 hover:text-primary" :to="{ path: '/', hash: 'products' }">Products</router-link>
        <router-link class="block text-slate-200 hover:text-primary" to="/contact">Contact</router-link>        <router-link class="block text-slate-200 hover:text-gold" to="/admin/login">Admin</router-link>      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const mobileOpen = ref(false)
</script>
