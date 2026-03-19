<template>
  <div class="min-h-screen bg-gradient-to-b from-midnight to-navy pt-24 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-gold">Votre Panier</h1>
        <p class="text-slate-400 mt-2">{{ cartItemCount }} article{{ cartItemCount !== 1 ? 's' : '' }} dans votre panier</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>

      <!-- Empty Cart -->
      <div v-else-if="cartItems.length === 0" class="text-center py-20">
        <div class="mb-8">
          <span class="material-symbols-outlined text-8xl text-slate-600">shopping_cart</span>
        </div>
        <h2 class="text-2xl font-serif text-slate-300 mb-4">Votre panier est vide</h2>
        <p class="text-slate-500 mb-8">Découvrez notre collection exclusive de produits de luxe</p>
        <router-link
          to="/luxe"
          class="inline-flex items-center gap-2 px-8 py-3 bg-primary text-midnight font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300"
        >
          <span>Découvrir la collection</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </router-link>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.product?._id || item.product?.id || item.product"
            class="bg-navy/50 backdrop-blur-sm border border-navy/50 rounded-xl p-4 md:p-6"
          >
            <div class="flex gap-4 md:gap-6">
              <!-- Product Image -->
              <div class="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-midnight">
                <img
                  :src="item.product?.image || 'https://via.placeholder.com/150'"
                  :alt="item.product?.name || 'Produit'"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start gap-4">
                  <div>
                    <h3 class="text-lg font-semibold text-slate-200">{{ item.product?.name || 'Produit' }}</h3>
                    <p class="text-slate-400 text-sm mt-1">{{ item.product?.category || 'Catégorie' }}</p>
                  </div>
                  <button
                    @click="handleRemoveItem(item.product?._id || item.product?.id)"
                    class="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    title="Supprimer"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>

                <!-- Price & Quantity -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                  <div class="text-primary font-semibold">
                    {{ formatPrice(item.product?.price || item.price || 0) }}
                  </div>

                  <!-- Quantity Controls -->
                  <div class="flex items-center gap-3">
                    <button
                      @click="decreaseQuantity(item)"
                      class="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors"
                      :disabled="item.quantity <= 1"
                    >
                      <span class="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span class="w-12 text-center text-slate-200 font-medium">{{ item.quantity }}</span>
                    <button
                      @click="increaseQuantity(item)"
                      class="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors"
                    >
                      <span class="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>

                <!-- Item Total -->
                <div class="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
                  <span class="text-slate-400 text-sm">Sous-total</span>
                  <span class="text-gold font-semibold text-lg">
                    {{ formatPrice((item.product?.price || item.price || 0) * item.quantity) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-navy/50 backdrop-blur-sm border border-navy/50 rounded-xl p-6 sticky top-24">
            <h2 class="text-xl font-serif font-bold text-gold mb-6">Récapitulatif</h2>

            <div class="space-y-4 pb-6 border-b border-slate-700/50">
              <div class="flex justify-between text-slate-300">
                <span>Sous-total ({{ cartItemCount }} article{{ cartItemCount !== 1 ? 's' : '' }})</span>
                <span>{{ formatPrice(cartTotal) }}</span>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Livraison</span>
                <span class="text-green-400">Gratuite</span>
              </div>
            </div>

            <div class="py-6">
              <div class="flex justify-between items-center">
                <span class="text-xl font-semibold text-slate-200">Total</span>
                <span class="text-2xl font-bold text-gold">{{ formatPrice(cartTotal) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="space-y-3">
              <!-- Commander via WhatsApp -->
              <a
                :href="whatsappOrderUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Commander sur WhatsApp</span>
              </a>

              <router-link
                to="/luxe"
                class="w-full flex items-center justify-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 font-medium rounded-lg hover:border-slate-500 hover:text-white transition-all duration-300"
              >
                <span>Continuer les achats</span>
              </router-link>

              <button
                @click="handleClearCart"
                class="w-full px-6 py-3 text-slate-500 hover:text-red-400 transition-colors text-sm"
              >
                Vider le panier
              </button>
            </div>
          </div>
        </div>
      </div>
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
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

// Computed
const cartItems = computed(() => cartStore.cartItems)
const cartItemCount = computed(() => cartStore.cartItemCount)
const cartTotal = computed(() => cartStore.cartTotal)
const isLoading = computed(() => cartStore.isLoading)

// Generate WhatsApp order link
const whatsappOrderUrl = computed(() => {
  const adminPhone = '+2290140487428'
  
  // Build the message with cart items
  let message = 'Bonjour! Je souhaite commander les produits suivants:\n\n'
  
  cartItems.value.forEach((item) => {
    const product = item.product || {}
    const name = product.name || 'Produit'
    const price = product.price || item.price || 0
    const quantity = item.quantity || 1
    message += `- ${name} (Qty: ${quantity}) - ${formatPrice(price)}\n`
  })
  
  message += `\nTotal: ${formatPrice(cartTotal.value)}`
  message += '\n\nMerci de me contacter pour finaliser la commande.'
  
  // Encode the message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${adminPhone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
})

// Notification state
const notification = ref({
  show: false,
  message: '',
  type: 'success'
})

// Show notification
const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// Increase quantity
const increaseQuantity = async (item) => {
  const productId = item.product?._id || item.product?.id || item.product
  const newQuantity = item.quantity + 1
  await cartStore.updateQuantity(productId, newQuantity)
}

// Decrease quantity
const decreaseQuantity = async (item) => {
  const productId = item.product?._id || item.product?.id || item.product
  if (item.quantity > 1) {
    await cartStore.updateQuantity(productId, item.quantity - 1)
  }
}

// Remove item
const handleRemoveItem = async (productId) => {
  const result = await cartStore.removeFromCart(productId)
  if (result.success) {
    showNotification('Produit supprimé du panier', 'success')
  } else {
    showNotification(result.message, 'error')
  }
}

// Clear cart
const handleClearCart = async () => {
  if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
    await cartStore.clearCart()
    showNotification('Panier vidé', 'success')
  }
}

// Fetch cart on mount
onMounted(async () => {
  await cartStore.fetchCart()
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
