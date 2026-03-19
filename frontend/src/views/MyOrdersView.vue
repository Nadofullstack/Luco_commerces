<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900 pt-24 pb-12 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Mes Commandes</h1>
        <p class="text-slate-400 mt-2">Suivez et gérez vos commandes</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3 mb-6">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            activeFilter === filter.value
              ? 'bg-primary text-midnight'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          ]"
        >
          {{ filter.label }}
          <span v-if="filter.count > 0" class="ml-1 opacity-70">({{ filter.count }})</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <span class="material-symbols-outlined text-primary text-4xl animate-spin">sync</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredOrders.length === 0" class="text-center py-16">
        <span class="material-symbols-outlined text-slate-600 text-6xl mb-4">receipt_long</span>
        <h3 class="text-xl font-semibold text-white mb-2">Aucune commande</h3>
        <p class="text-slate-400 mb-6">
          {{ activeFilter === 'all' ? 'Vous n\'avez pas encore passé de commande' : `Aucune commande avec le statut "${activeFilter}"` }}
        </p>
        <router-link
          to="/luxe"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-midnight font-semibold rounded-lg hover:bg-primary/80 transition-colors"
        >
          <span class="material-symbols-outlined">shopping_bag</span>
          Découvrir nos produits
        </router-link>
      </div>

      <!-- Orders Table -->
      <div v-else class="bg-slate-800/50 backdrop-blur-sm border border-navy/50 rounded-2xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-900/50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">N° Commande</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Total</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Statut</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr v-for="order in filteredOrders" :key="order._id" class="hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-white font-medium">#{{ order.orderNumber || order._id.slice(-8).toUpperCase() }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-slate-300">
                  {{ formatDate(order.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-white font-semibold">{{ formatPrice(order.total) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-xs font-medium">
                    {{ getStatusLabel(order.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <router-link
                    :to="`/commande/${order._id}`"
                    class="inline-flex items-center gap-1 text-primary hover:text-gold transition-colors text-sm font-medium"
                  >
                    <span class="material-symbols-outlined text-lg">visibility</span>
                    Voir détails
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const orders = ref([])
const loading = ref(true)
const activeFilter = ref('all')

// Filters
const filters = computed(() => [
  { label: 'Tous', value: 'all', count: orders.value.length },
  { label: 'En attente', value: 'pending', count: orders.value.filter(o => o.status === 'pending').length },
  { label: 'En cours', value: 'processing', count: orders.value.filter(o => o.status === 'processing').length },
  { label: 'Livrés', value: 'delivered', count: orders.value.filter(o => o.status === 'delivered').length },
  { label: 'Annulés', value: 'cancelled', count: orders.value.filter(o => o.status === 'cancelled').length }
])

// Filtered orders
const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeFilter.value)
})

// Load orders
const loadOrders = async () => {
  loading.value = true
  const result = await authStore.fetchOrders()
  
  if (result.success) {
    orders.value = result.orders || []
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
  loadOrders()
})
</script>
