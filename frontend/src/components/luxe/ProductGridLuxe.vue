<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-400">{{ error }}</p>
      <button
        @click="fetchProducts"
        class="mt-4 px-4 py-2 bg-primary text-midnight rounded-lg hover:bg-primary/90"
      >
        Réessayer
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <ProductCardLuxe
        v-for="product in products"
        :key="product._id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && !error && products.length === 0" class="text-center py-20">
      <p class="text-slate-400">Aucun produit disponible pour le moment</p>
    </div>

    <!-- Toast Notification -->
    <Transition name="fade">
      <div
        v-if="notification.show"
        class="fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-xl z-50"
        :class="notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
      >
        <p class="text-white font-medium">{{ notification.message }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCardLuxe from './ProductCardLuxe.vue'
import { useCartStore } from '../../stores/cartStore'

const cartStore = useCartStore()
const products = ref([])
const isLoading = ref(true)
const error = ref(null)

const notification = ref({
  show: false,
  message: '',
  type: 'success'
})

const API_URL = 'http://localhost:3000/api'

// Fetch products from API
const fetchProducts = async () => {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch(`${API_URL}/products/public`)
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des produits')
    }
    
    const data = await response.json()
    products.value = data.products || data || []
  } catch (e) {
    console.error('Error fetching products:', e)
    error.value = e.message || 'Impossible de charger les produits'
  } finally {
    isLoading.value = false
  }
}

// Handle add to cart
const handleAddToCart = async (product) => {
  const result = await cartStore.addToCart(product, 1)
  
  if (result.success) {
    showNotification('Produit ajouté au panier', 'success')
  } else {
    showNotification(result.message || 'Erreur lors de l\'ajout au panier', 'error')
  }
}

// Show notification
const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
