<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900 pt-24 pb-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Back Link -->
      <router-link to="/mes-commandes" class="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
        <span class="material-symbols-outlined">arrow_back</span>
        Retour à mes commandes
      </router-link>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <span class="material-symbols-outlined text-primary text-4xl animate-spin">sync</span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-12">
        <span class="material-symbols-outlined text-red-500 text-6xl mb-4">error</span>
        <h3 class="text-xl font-semibold text-white mb-2">Erreur</h3>
        <p class="text-slate-400">{{ error }}</p>
      </div>

      <!-- Order Details -->
      <div v-else-if="order">
        <!-- Header -->
        <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6 mb-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 class="text-2xl font-bold text-white">Commande #{{ order.orderNumber || order._id.slice(-8).toUpperCase() }}</h1>
              <p class="text-slate-400 mt-1">Passée le {{ formatDate(order.createdAt) }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span :class="getStatusClass(order.status)" class="px-4 py-2 rounded-full text-sm font-medium">
                {{ getStatusLabel(order.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6 mb-6">
          <h3 class="text-lg font-semibold text-white mb-6">Suivi de la commande</h3>
          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>
            
            <!-- Steps -->
            <div class="space-y-6">
              <div v-for="(step, index) in timelineSteps" :key="step.key" class="relative flex items-start gap-4">
                <div :class="[
                  'relative z-10 w-8 h-8 rounded-full flex items-center justify-center',
                  step.completed ? 'bg-primary text-midnight' : 'bg-slate-700 text-slate-400'
                ]">
                  <span v-if="step.completed" class="material-symbols-outlined text-sm">check</span>
                  <span v-else class="text-sm">{{ index + 1 }}</span>
                </div>
                <div class="pt-1">
                  <p :class="step.completed ? 'text-white' : 'text-slate-400'" class="font-medium">{{ step.label }}</p>
                  <p v-if="step.date" class="text-sm text-slate-500">{{ step.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Order Items -->
          <div class="md:col-span-2">
            <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Produits commandés</h3>
              
              <!-- Items List -->
              <div class="divide-y divide-slate-700/50">
                <div v-for="item in order.items" :key="item.product?._id || item.productId" class="py-4 first:pt-0 last:pb-0">
                  <div class="flex gap-4">
                    <!-- Product Image -->
                    <div class="w-20 h-20 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        v-if="item.product?.image"
                        :src="item.product.image"
                        :alt="item.product?.name"
                        class="w-full h-full object-cover"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center">
                        <span class="material-symbols-outlined text-slate-500">image</span>
                      </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="flex-1">
                      <h4 class="text-white font-medium">{{ item.product?.name || 'Produit' }}</h4>
                      <p class="text-slate-400 text-sm">Quantité: {{ item.quantity }}</p>
                    </div>
                    
                    <!-- Price -->
                    <div class="text-right">
                      <p class="text-white font-semibold">{{ formatPrice(item.price * item.quantity) }}</p>
                      <p class="text-slate-400 text-sm">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="border-t border-slate-700/50 mt-4 pt-4 space-y-2">
                <div class="flex justify-between text-slate-400">
                  <span>Sous-total</span>
                  <span>{{ formatPrice(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>Livraison</span>
                  <span>{{ order.shipping > 0 ? formatPrice(order.shipping) : 'Gratuite' }}</span>
                </div>
                <div class="flex justify-between text-white font-semibold text-lg pt-2 border-t border-slate-700/50">
                  <span>Total</span>
                  <span>{{ formatPrice(order.total) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Customer Info -->
            <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Informations</h3>
              <div class="space-y-3">
                <div>
                  <p class="text-slate-400 text-sm">Client</p>
                  <p class="text-white">{{ order.customer?.name || '-' }}</p>
                </div>
                <div>
                  <p class="text-slate-400 text-sm">Email</p>
                  <p class="text-white">{{ order.customer?.email || '-' }}</p>
                </div>
                <div v-if="order.shippingAddress">
                  <p class="text-slate-400 text-sm">Adresse de livraison</p>
                  <p class="text-white">{{ order.shippingAddress }}</p>
                </div>
                <div v-if="order.phone">
                  <p class="text-slate-400 text-sm">Téléphone</p>
                  <p class="text-white">{{ order.phone }}</p>
                </div>
              </div>
            </div>

            <!-- WhatsApp Contact -->
            <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Besoin d'aide ?</h3>
              <p class="text-slate-400 text-sm mb-4">Contactez-nous pour toute question concernant votre commande</p>
              <a
                :href="whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
              >
                <span class="material-symbols-outlined">chat</span>
                Contacter par WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import whatsappService from '../services/whatsappService'

const route = useRoute()
const authStore = useAuthStore()

const order = ref(null)
const loading = ref(true)
const error = ref(null)

// Get order ID from route
const orderId = computed(() => route.params.id)

// Computed
const subtotal = computed(() => {
  if (!order.value?.items) return 0
  return order.value.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const timelineSteps = computed(() => {
  const status = order.value?.status
  return [
    { key: 'pending', label: 'Commande passée', completed: true, date: formatDate(order.value?.createdAt) },
    { key: 'processing', label: 'En cours de traitement', completed: ['processing', 'shipped', 'delivered'].includes(status) },
    { key: 'shipped', label: 'Expédiée', completed: ['shipped', 'delivered'].includes(status) },
    { key: 'delivered', label: 'Livrée', completed: status === 'delivered' }
  ]
})

const whatsappLink = ref('#')
const loadingWhatsapp = ref(true)

const generateWhatsAppLink = async () => {
  loadingWhatsapp.value = true
  try {
    const message = whatsappService.generateOrderMessage(order.value)
    const result = await whatsappService.getWhatsAppLink(message)
    
    if (result.success && result.whatsappUrl) {
      whatsappLink.value = result.whatsappUrl
    } else {
      // Fallback
      whatsappLink.value = whatsappService.generateFallbackWhatsAppLink(message)
    }
  } catch (error) {
    console.error('[OrderDetailView] Erreur WhatsApp:', error)
    const message = whatsappService.generateOrderMessage(order.value)
    whatsappLink.value = whatsappService.generateFallbackWhatsAppLink(message)
  } finally {
    loadingWhatsapp.value = false
  }
}

// Load order
const loadOrder = async () => {
  loading.value = true
  error.value = null
  
  try {
    // First load all orders
    const result = await authStore.fetchOrders()
    
    if (result.success && result.orders) {
      // Find the specific order
      const foundOrder = result.orders.find(o => o._id === orderId.value)
      
      if (foundOrder) {
        order.value = foundOrder
        // Générer le lien WhatsApp une fois la commande chargée
        generateWhatsAppLink()
      } else {
        error.value = 'Commande non trouvée'
      }
    } else {
      error.value = result.message || 'Erreur lors du chargement de la commande'
    }
  } catch (e) {
    error.value = e.message
  }
  
  loading.value = false
}

// Status helpers
const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-400',
    shipped: 'bg-purple-500/20 text-purple-400',
    delivered: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400'
  }
  return classes[status] || 'bg-slate-500/20 text-slate-400'
}

const getStatusLabel = (status) => {
  const labels = {
    pending: 'En attente',
    processing: 'En cours',
    shipped: 'En livraison',
    delivered: 'Livré',
    cancelled: 'Annulé'
  }
  return labels[status] || status
}

// Format helpers
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF'
  }).format(price || 0)
}

// Load on mount
onMounted(() => {
  loadOrder()
})
</script>
