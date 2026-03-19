<template>
  <div class="min-h-screen bg-gradient-to-b from-midnight to-navy pt-24 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-gold">Finaliser votre commande</h1>
        <p class="text-slate-400 mt-2">Remplissez les informations ci-dessous pour passer votre commande</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>

      <!-- Empty Cart Redirect -->
      <div v-else-if="cartItems.length === 0" class="text-center py-20">
        <div class="mb-8">
          <span class="material-symbols-outlined text-8xl text-slate-600">shopping_cart</span>
        </div>
        <h2 class="text-2xl font-serif text-slate-300 mb-4">Votre panier est vide</h2>
        <p class="text-slate-500 mb-8">Ajoutez des produits à votre panier avant de passer commande</p>
        <router-link
          to="/luxe"
          class="inline-flex items-center gap-2 px-8 py-3 bg-primary text-midnight font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300"
        >
          Découvrir la collection
        </router-link>
      </div>

      <!-- Checkout Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Shipping Information -->
          <div class="bg-navy/50 backdrop-blur-sm border border-navy/50 rounded-xl p-6">
            <h2 class="text-xl font-serif font-bold text-gold mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined">local_shipping</span>
              Informations de livraison
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Name -->
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Nom complet *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-midnight/50 border border-slate-600 rounded-lg text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="John Doe"
                  />
                  <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 bg-midnight/50 border border-slate-600 rounded-lg text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                  <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Téléphone *</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 bg-midnight/50 border border-slate-600 rounded-lg text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="+33 6 12 34 56 78"
                  />
                  <p v-if="errors.phone" class="text-red-400 text-sm mt-1">{{ errors.phone }}</p>
                </div>

                <!-- City -->
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Ville *</label>
                  <input
                    v-model="form.city"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-midnight/50 border border-slate-600 rounded-lg text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="Paris"
                  />
                  <p v-if="errors.city" class="text-red-400 text-sm mt-1">{{ errors.city }}</p>
                </div>
              </div>

              <!-- Address -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Adresse complète *</label>
                <textarea
                  v-model="form.address"
                  required
                  rows="2"
                  class="w-full px-4 py-3 bg-midnight/50 border border-slate-600 rounded-lg text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="123 Rue de la Paix, Appartement 4B"
                ></textarea>
                <p v-if="errors.address" class="text-red-400 text-sm mt-1">{{ errors.address }}</p>
              </div>

              <!-- Country -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Pays *</label>
                <select
                  v-model="form.country"
                  required
                  class="w-full px-4 py-3 bg-midnight/50 border border-slate-600 rounded-lg text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                >
                  <option value="">Sélectionnez un pays</option>
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Canada">Canada</option>
                  <option value="Autre">Autre</option>
                </select>
                <p v-if="errors.country" class="text-red-400 text-sm mt-1">{{ errors.country }}</p>
              </div>
            </form>
          </div>

          <!-- Payment Method -->
          <div class="bg-navy/50 backdrop-blur-sm border border-navy/50 rounded-xl p-6">
            <h2 class="text-xl font-serif font-bold text-gold mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined">payment</span>
              Mode de paiement
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                class="relative flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200"
                :class="form.paymentMethod === method.id 
                  ? 'border-primary bg-primary/10' 
                  : 'border-slate-600 hover:border-slate-500'"
              >
                <input
                  v-model="form.paymentMethod"
                  type="radio"
                  :value="method.id"
                  class="sr-only"
                />
                <span class="material-symbols-outlined text-2xl mr-3" :class="form.paymentMethod === method.id ? 'text-primary' : 'text-slate-400'">
                  {{ method.icon }}
                </span>
                <div>
                  <span class="block text-slate-200 font-medium">{{ method.label }}</span>
                  <span class="block text-slate-500 text-sm">{{ method.description }}</span>
                </div>
                <span
                  v-if="form.paymentMethod === method.id"
                  class="absolute top-2 right-2 material-symbols-outlined text-primary"
                >
                  check_circle
                </span>
              </label>
            </div>
          </div>

          <!-- Notes -->
          <div class="bg-navy/50 backdrop-blur-sm border border-navy/50 rounded-xl p-6">
            <h2 class="text-xl font-serif font-bold text-gold mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined">notes</span>
              Notes supplémentaires (optionnel)
            </h2>
            <textarea
              v-model="form.notes"
              rows="3"
              class="w-full px-4 py-3 bg-midnight/50 border border-slate-600 rounded-lg text-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="Instructions spéciales pour la livraison..."
            ></textarea>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-navy/50 backdrop-blur-sm border border-navy/50 rounded-xl p-6 sticky top-24">
            <h2 class="text-xl font-serif font-bold text-gold mb-6">Récapitulatif de commande</h2>

            <!-- Items List -->
            <div class="space-y-4 max-h-64 overflow-y-auto mb-6">
              <div
                v-for="item in cartItems"
                :key="item.product?._id || item.product?.id"
                class="flex gap-3"
              >
                <div class="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-midnight">
                  <img
                    :src="item.product?.image || 'https://via.placeholder.com/150'"
                    :alt="item.product?.name || 'Produit'"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-slate-200 text-sm font-medium truncate">{{ item.product?.name || 'Produit' }}</p>
                  <p class="text-slate-400 text-xs">Qté: {{ item.quantity }}</p>
                  <p class="text-primary text-sm font-medium">
                    {{ formatPrice((item.product?.price || item.price || 0) * item.quantity) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Totals -->
            <div class="space-y-3 pb-6 border-b border-slate-700/50">
              <div class="flex justify-between text-slate-300">
                <span>Sous-total</span>
                <span>{{ formatPrice(cartTotal) }}</span>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Livraison</span>
                <span class="text-green-400">Gratuite</span>
              </div>
            </div>

            <div class="py-6">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-slate-200">Total</span>
                <span class="text-2xl font-bold text-gold">{{ formatPrice(cartTotal) }}</span>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              @click="handleSubmit"
              :disabled="isSubmitting"
              class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-midnight font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting" class="animate-spin rounded-full h-5 w-5 border-2 border-midnight border-t-transparent"></span>
              <span v-else>
                <span class="material-symbols-outlined">lock</span>
                Confirmer la commande
              </span>
            </button>

            <p class="text-slate-500 text-xs text-center mt-4">
              <span class="material-symbols-outlined text-xs align-middle">verified</span>
              Paiement sécurisé. Vos données sont protégées.
            </p>
            
            <!-- WhatsApp Support Link -->
            <div class="mt-4 pt-4 border-t border-slate-700/50">
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 text-green-400 hover:text-green-300 text-sm transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                </svg>
                <span>Une question ?Contactez-nous sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <Transition name="fade">
        <div v-if="showSuccess" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div class="bg-navy border border-gold/30 rounded-2xl p-8 max-w-md w-full text-center">
            <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-5xl text-green-400">check_circle</span>
            </div>
            <h2 class="text-2xl font-serif font-bold text-gold mb-4">Commande confirmée !</h2>
            <p class="text-slate-300 mb-2">Merci pour votre commande</p>
            <p class="text-slate-400 text-sm mb-6">
              Numéro de commande: <span class="text-gold font-mono">{{ orderNumber }}</span>
            </p>
            <p class="text-slate-400 text-sm mb-6">
              Un email de confirmation vous a été envoyé.
            </p>
            <router-link
              to="/mes-commandes"
              class="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-midnight font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300"
            >
              Voir mes commandes
            </router-link>
          </div>
        </div>
      </Transition>

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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import whatsappService from '../services/whatsappService'

const router = useRouter()
const cartStore = useCartStore()

// Computed
const cartItems = computed(() => cartStore.cartItems)
const cartTotal = computed(() => cartStore.cartTotal)
const isLoading = computed(() => cartStore.isLoading)

// API URL
const API_URL = '/api'

// Form state
const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  paymentMethod: 'card',
  notes: ''
})

// Errors
const errors = ref({})

// Submit state
const isSubmitting = ref(false)
const showSuccess = ref(false)
const orderNumber = ref('')

// Payment methods
const paymentMethods = [
  { id: 'card', label: 'Carte bancaire', description: 'Visa, Mastercard, CB', icon: 'credit_card' },
  { id: 'paypal', label: 'PayPal', description: 'Paiement rapide et sécurisé', icon: 'account_balance_wallet' },
  { id: 'transfer', label: 'Virement bancaire', description: 'IBAN vous sera envoyé par email', icon: 'account_balance' },
  { id: 'delivery', label: 'Paiement à la livraison', description: 'Payez en espèces à la livraison', icon: 'payments' }
]

// Notification
const notification = ref({
  show: false,
  message: '',
  type: 'success'
})

// WhatsApp
const whatsappUrl = ref('#')

const generateWhatsAppLink = async () => {
  try {
    const message = whatsappService.generateContactMessage('une question sur ma commande')
    const result = await whatsappService.getWhatsAppLink(message)
    
    if (result.success && result.whatsappUrl) {
      whatsappUrl.value = result.whatsappUrl
    } else {
      whatsappUrl.value = whatsappService.generateFallbackWhatsAppLink(message)
    }
  } catch (error) {
    console.error('[CheckoutView] Erreur WhatsApp:', error)
    const message = whatsappService.generateContactMessage('une question sur ma commande')
    whatsappUrl.value = whatsappService.generateFallbackWhatsAppLink(message)
  }
}

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

// Validate form
const validateForm = () => {
  errors.value = {}
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Le nom est requis'
  }
  
  if (!form.value.email.trim()) {
    errors.value.email = 'L\'email est requis'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Email invalide'
  }
  
  if (!form.value.phone.trim()) {
    errors.value.phone = 'Le téléphone est requis'
  }
  
  if (!form.value.address.trim()) {
    errors.value.address = 'L\'adresse est requise'
  }
  
  if (!form.value.city.trim()) {
    errors.value.city = 'La ville est requise'
  }
  
  if (!form.value.country) {
    errors.value.country = 'Le pays est requis'
  }
  
  return Object.keys(errors.value).length === 0
}

// Get token
const getToken = () => {
  return localStorage.getItem('customerToken') || localStorage.getItem('token')
}

// Handle submit
const handleSubmit = async () => {
  if (!validateForm()) {
    showNotification('Veuillez remplir tous les champs obligatoires', 'error')
    return
  }

  isSubmitting.value = true

  try {
    const token = getToken()
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }

    // Préparer les données de la commande
    const orderData = {
      customer: {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone
      },
      address: {
        street: form.value.address,
        city: form.value.city,
        country: form.value.country
      },
      items: cartItems.value.map(item => ({
        product: item.product?._id || item.product?.id || item.product,
        name: item.product?.name || 'Produit',
        quantity: item.quantity,
        price: item.product?.price || item.price || 0
      })),
      subtotal: cartTotal.value,
      shipping: 0,
      total: cartTotal.value,
      paymentMethod: form.value.paymentMethod,
      paymentStatus: 'Pending',
      status: 'Pending',
      notes: form.value.notes
    }

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la création de la commande')
    }

    // Afficher le succès
    orderNumber.value = data.order?.orderNumber || `ORD-${Date.now()}`
    showSuccess.value = true

    // Vider le panier
    await cartStore.clearCart()

  } catch (error) {
    console.error('Order error:', error)
    showNotification(error.message || 'Erreur lors de la commande. Veuillez réessayer.', 'error')
  } finally {
    isSubmitting.value = false
  }
}

// Redirect if cart is empty
onMounted(async () => {
  // Générer le lien WhatsApp
  generateWhatsAppLink()
  
  await cartStore.fetchCart()
  
  // Pré-remplir les infos client si connecté
  const token = getToken()
  if (token) {
    try {
      const response = await fetch(`${API_URL}/customers/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        if (data.customer) {
          form.value.name = data.customer.name || ''
          form.value.email = data.customer.email || ''
          form.value.phone = data.customer.phone || ''
          form.value.address = data.customer.address?.street || ''
          form.value.city = data.customer.address?.city || ''
          form.value.country = data.customer.address?.country || ''
        }
      }
    } catch (e) {
      console.error('Error fetching customer data:', e)
    }
  }
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

/* Custom scrollbar */
.max-h-64::-webkit-scrollbar {
  width: 4px;
}

.max-h-64::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
}

.max-h-64::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 2px;
}
</style>
