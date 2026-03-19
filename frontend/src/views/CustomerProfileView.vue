<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900 pt-24 pb-12 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Mon Espace Client</h1>
        <p class="text-slate-400 mt-2">Gérez vos informations personnelles et consultez vos statistiques</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-4 mb-8 border-b border-slate-700">
        <button
          @click="activeTab = 'profile'"
          :class="[
            'pb-3 px-4 font-medium transition-colors relative',
            activeTab === 'profile' ? 'text-primary' : 'text-slate-400 hover:text-white'
          ]"
        >
          Mon Profil
          <span v-if="activeTab === 'profile'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
        </button>
        <button
          @click="activeTab = 'stats'"
          :class="[
            'pb-3 px-4 font-medium transition-colors relative',
            activeTab === 'stats' ? 'text-primary' : 'text-slate-400 hover:text-white'
          ]"
        >
          Statistiques
          <span v-if="activeTab === 'stats'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
        </button>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="grid md:grid-cols-3 gap-8">
        <!-- Profile Form -->
        <div class="md:col-span-2">
          <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6">
            <h2 class="text-xl font-semibold text-white mb-6">Informations personnelles</h2>

            <!-- Success Message -->
            <div v-if="successMessage" class="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
              {{ successMessage }}
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleUpdateProfile" class="space-y-5">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-slate-300 mb-2">Nom complet</label>
                <input
                  id="name"
                  v-model="profileForm.name"
                  type="text"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  id="email"
                  v-model="profileForm.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-3 bg-slate-900/30 border border-slate-700/50 rounded-lg text-slate-400 cursor-not-allowed"
                />
                <p class="text-xs text-slate-500 mt-1">L'email ne peut pas être modifié</p>
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-slate-300 mb-2">Téléphone</label>
                <input
                  id="phone"
                  v-model="profileForm.phone"
                  type="tel"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="+229 XX XX XX XX"
                />
              </div>

              <!-- Address -->
              <div>
                <label for="address" class="block text-sm font-medium text-slate-300 mb-2">Adresse</label>
                <textarea
                  id="address"
                  v-model="profileForm.address"
                  rows="3"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Votre adresse de livraison"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-gold hover:from-primary/80 hover:to-gold/80 text-midnight font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                <span v-if="loading" class="material-symbols-outlined animate-spin">sync</span>
                <span>{{ loading ? 'Enregistrement...' : 'Enregistrer les modifications' }}</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Sidebar Info -->
        <div class="space-y-6">
          <!-- Account Info -->
          <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Informations du compte</h3>
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-slate-400">Membre depuis</span>
                <span class="text-white">{{ formatDate(customer?.createdAt) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-slate-400">Statut</span>
                <span class="text-green-400">Actif</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Actions rapides</h3>
            <div class="space-y-3">
              <router-link
                to="/mes-commandes"
                class="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                <span class="material-symbols-outlined text-primary">receipt_long</span>
                <span class="text-white">Mes commandes</span>
              </router-link>
              <router-link
                to="/panier"
                class="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                <span class="material-symbols-outlined text-primary">shopping_cart</span>
                <span class="text-white">Mon panier</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Tab -->
      <div v-if="activeTab === 'stats'" class="grid md:grid-cols-3 gap-6">
        <!-- Orders Count -->
        <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <span class="text-slate-400">Nombre de commandes</span>
            <span class="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
          </div>
          <div class="text-4xl font-bold text-white">{{ stats.totalOrders }}</div>
        </div>

        <!-- Total Spent -->
        <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <span class="text-slate-400">Total dépensé</span>
            <span class="material-symbols-outlined text-gold text-2xl">payments</span>
          </div>
          <div class="text-4xl font-bold text-white">{{ formatPrice(stats.totalSpent) }}</div>
        </div>

        <!-- Average Order -->
        <div class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <span class="text-slate-400">Panier moyen</span>
            <span class="material-symbols-outlined text-green-400 text-2xl">trending_up</span>
          </div>
          <div class="text-4xl font-bold text-white">{{ formatPrice(stats.averageOrder) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const activeTab = ref('profile')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Profile form
const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

// Computed
const customer = computed(() => authStore.customer)

// Load customer data
const loadCustomerData = () => {
  if (customer.value) {
    profileForm.value = {
      name: customer.value.name || '',
      email: customer.value.email || '',
      phone: customer.value.phone || '',
      address: customer.value.address || ''
    }
  }
}

// Watch for customer changes
watch(customer, loadCustomerData, { immediate: true })

// Stats
const stats = ref({
  totalOrders: 0,
  totalSpent: 0,
  averageOrder: 0
})

// Load stats (orders)
const loadStats = async () => {
  const result = await authStore.fetchOrders()
  if (result.success && result.orders) {
    const orders = result.orders
    stats.value.totalOrders = orders.length
    stats.value.totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0)
    stats.value.averageOrder = orders.length > 0 ? stats.value.totalSpent / orders.length : 0
  }
}

// Update profile
const handleUpdateProfile = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  const result = await authStore.updateProfile({
    name: profileForm.value.name,
    phone: profileForm.value.phone,
    address: profileForm.value.address
  })

  if (result.success) {
    successMessage.value = 'Vos informations ont été mises à jour avec succès'
  } else {
    errorMessage.value = result.message
  }

  loading.value = false
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

// Load data on mount
onMounted(async () => {
  await loadStats()
  loadCustomerData()
})
</script>
