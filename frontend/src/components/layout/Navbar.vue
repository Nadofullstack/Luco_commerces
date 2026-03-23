<template>
  <nav class="fixed top-0 w-full z-50 glass-nav border-b border-navy/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <div class="flex items-center gap-2">
          <router-link to="/" class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-3xl">diamond</span>
            <span class="text-xl font-bold tracking-tight text-gold">Luco</span>
          </router-link>
        </div>

        <div class="hidden md:flex items-center gap-10">
          <router-link class="text-sm font-medium text-slate-200 hover:text-gold transition-colors" to="/">Accueil</router-link>
          <router-link class="text-sm font-medium text-slate-200 hover:text-gold transition-colors" :to="{ path: '/', hash: 'products' }">Produits</router-link>
          <router-link class="text-sm font-medium text-slate-200 hover:text-primary transition-colors" to="/contact">Contact</router-link>
        </div>

        <div class="flex items-center gap-5">
          <!-- Cart Link -->
          <router-link to="/panier" class="relative p-2 text-slate-200 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">shopping_cart</span>
            <span
              v-if="cartItemCount > 0"
              class="absolute top-0 right-0 bg-primary text-midnight text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              >{{ cartItemCount > 99 ? '99+' : cartItemCount }}</span
            >
          </router-link>

          <!-- Admin Link (only visible if logged in as admin) -->
          <router-link
            v-if="isAdminLoggedIn"
            to="/admin/products"
            class="text-sm font-medium text-slate-200 hover:text-gold transition-colors"
          >
            Dashboard
          </router-link>

          <button class="md:hidden text-slate-200" @click="mobileOpen = !mobileOpen">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </div>

    <!-- mobile menu -->
    <div v-if="mobileOpen" class="md:hidden bg-navy/90">
      <div class="px-4 py-2 space-y-2">
        <router-link class="block text-slate-200 hover:text-gold" to="/" @click="mobileOpen = false">Accueil</router-link>
        <router-link class="block text-slate-200 hover:text-gold" :to="{ path: '/', hash: 'products' }" @click="mobileOpen = false">Produits</router-link>
        <router-link class="block text-slate-200 hover:text-primary" to="/contact" @click="mobileOpen = false">Contact</router-link>
        <router-link class="block text-slate-200 hover:text-primary" to="/panier" @click="mobileOpen = false">Panier ({{ cartItemCount }})</router-link>
        <router-link 
          v-if="isAdminLoggedIn" 
          class="block text-slate-200 hover:text-gold" 
          to="/admin/products" 
          @click="mobileOpen = false"
        >
          Dashboard
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../../stores/cartStore'

const cartStore = useCartStore()

const mobileOpen = ref(false)

// Computed
const cartItemCount = computed(() => cartStore.cartItemCount)
const isAdminLoggedIn = computed(() => !!localStorage.getItem('adminToken'))

onMounted(async () => {
  await cartStore.fetchCart()
})

onUnmounted(() => {
})
</script>
