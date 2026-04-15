<template>
  <nav class="fixed top-0 w-full z-50 glass-nav border-b border-navy/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 flex-shrink-0">
          <span class="material-symbols-outlined text-primary text-3xl">diamond</span>
          <span class="text-xl font-bold tracking-tight text-gold">Luco</span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-8">
          <router-link 
            class="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-gold transition-colors" 
            to="/"
          >
            <span class="material-symbols-outlined text-lg">home</span>
            <span>Accueil</span>
          </router-link>
          <router-link 
            class="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-gold transition-colors" 
            to="/"
            @click="scrollToProducts"
          >
            <span class="material-symbols-outlined text-lg">shopping_bag</span>
            <span>Produits</span>
          </router-link>
          <router-link 
            class="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-primary transition-colors" 
            to="/contact"
          >
            <span class="material-symbols-outlined text-lg">mail</span>
            <span>Contact</span>
          </router-link>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          <!-- Cart -->
          <router-link 
            to="/panier" 
            class="relative p-2 text-slate-200 hover:text-primary transition-colors"
          >
            <span class="material-symbols-outlined text-2xl">shopping_cart</span>
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-primary text-midnight text-xs font-bold min-w-[20px] h-5 flex items-center justify-center px-1.5 rounded-full"
            >
              {{ cartItemCount > 99 ? '99+' : cartItemCount }}
            </span>
          </router-link>

          <!-- Admin Dashboard -->
          <router-link
            v-if="isAdminLoggedIn"
            to="/admin/products"
            class="hidden md:flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold hover:bg-gold/20 rounded-lg transition-colors text-sm font-medium"
          >
            <span class="material-symbols-outlined text-lg">admin_panel_settings</span>
            <span>Dashboard</span>
          </router-link>

          <!-- Mobile Menu Button -->
          <button 
            class="md:hidden p-2 text-slate-200 hover:text-gold transition-colors" 
            @click="mobileOpen = !mobileOpen"
            :aria-label="mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          >
            <span class="material-symbols-outlined text-2xl">{{ mobileOpen ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden bg-navy/95 backdrop-blur-lg border-t border-navy/50">
        <div class="px-4 py-4 space-y-1">
          <router-link 
            class="flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-gold/10 hover:text-gold rounded-lg transition-all" 
            to="/" 
            @click="mobileOpen = false"
          >
            <span class="material-symbols-outlined text-xl">home</span>
            <span class="font-medium">Accueil</span>
          </router-link>
          
          <router-link 
            class="flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-gold/10 hover:text-gold rounded-lg transition-all" 
            to="/" 
            @click="scrollToProducts"
          >
            <span class="material-symbols-outlined text-xl">shopping_bag</span>
            <span class="font-medium">Produits</span>
          </router-link>
          
          <router-link 
            class="flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-primary/10 hover:text-primary rounded-lg transition-all" 
            to="/contact" 
            @click="mobileOpen = false"
          >
            <span class="material-symbols-outlined text-xl">mail</span>
            <span class="font-medium">Contact</span>
          </router-link>
          
          <router-link 
            class="flex items-center justify-between px-4 py-3 text-slate-200 hover:bg-primary/10 hover:text-primary rounded-lg transition-all" 
            to="/panier" 
            @click="mobileOpen = false"
          >
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-xl">shopping_cart</span>
              <span class="font-medium">Panier</span>
            </div>
            <span 
              v-if="cartItemCount > 0" 
              class="bg-primary text-midnight text-xs font-bold min-w-[24px] h-6 flex items-center justify-center px-2 rounded-full"
            >
              {{ cartItemCount }}
            </span>
          </router-link>
          
          <router-link 
            v-if="isAdminLoggedIn" 
            class="flex items-center gap-3 px-4 py-3 text-gold hover:bg-gold/10 rounded-lg transition-all border border-gold/30" 
            to="/admin/products" 
            @click="mobileOpen = false"
          >
            <span class="material-symbols-outlined text-xl">admin_panel_settings</span>
            <span class="font-medium">Dashboard Admin</span>
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cartStore'

const cartStore = useCartStore()
const router = useRouter()

const mobileOpen = ref(false)

// Computed
const cartItemCount = computed(() => cartStore.cartItemCount)
const isAdminLoggedIn = computed(() => !!localStorage.getItem('adminToken'))

const scrollToProducts = async (e) => {
  e.preventDefault()
  mobileOpen.value = false
  
  // Si on n'est pas sur la page d'accueil, y aller d'abord
  if (router.currentRoute.value.path !== '/') {
    await router.push('/')
    // Attendre que la page soit chargée
    setTimeout(() => {
      const el = document.getElementById('products')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  } else {
    // Déjà sur la page d'accueil, juste scroller
    const el = document.getElementById('products')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  await cartStore.fetchCart()
})

onUnmounted(() => {
})
</script>
