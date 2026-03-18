<template>
  <div class="flex h-screen overflow-hidden">
    <AdminSidebar />

    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <AdminHeader v-model="searchQuery" />
      <div class="flex-1 overflow-y-auto p-8">
        <div class="max-w-7xl mx-auto space-y-8">
          <!-- Header Section -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Order Management
              </h2>
              <p class="text-slate-500 dark:text-slate-400">
                View and manage all customer transactions from one place.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button
                class="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <span class="material-symbols-outlined text-lg">file_download</span> Export
              </button>
            </div>
          </div>

          <!-- Overview Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard v-for="stat in stats" :key="stat.title" v-bind="stat" />
          </div>

          <!-- Filters & Table Section -->
          <OrdersTable :orders="filteredOrders" :pagination="pagination" @edit="editOrder" @delete="deleteOrder" />
        </div>
      </div>
    </main>

    <!-- Edit Order Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-midnight rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Update Order Status</h3>
          <button @click="closeEditModal" class="text-slate-400 hover:text-slate-600">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Order Status</label>
            <select v-model="editingOrder.status" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white">
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Payment Status</label>
            <select v-model="editingOrder.paymentStatus" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white">
              <option>Pending</option>
              <option>Paid</option>
              <option>Failed</option>
              <option>Refunded</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Notes</label>
            <textarea v-model="editingOrder.notes" rows="2" placeholder="Order notes..." class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"></textarea>
          </div>
          <div class="flex gap-3 pt-2">
            <button @click="closeEditModal" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
            <button @click="saveOrder" class="flex-1 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-blue-600">Save Changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-midnight rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <span class="material-symbols-outlined text-2xl text-red-600 dark:text-red-400">warning</span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white text-center mb-2">Confirm Delete</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 text-center mb-6">
          Are you sure you want to delete order <span class="font-semibold">"{{ orderToDelete?.orderNumber }}"</span>?
        </p>
        <div class="flex gap-3">
          <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold">Cancel</button>
          <button @click="confirmDelete" class="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AdminHeader from '../components/admin/AdminHeader.vue'
import StatsCard from '../components/admin/StatsCard.vue'
import OrdersTable from '../components/admin/OrdersTable.vue'
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const orders = ref([])
const isLoading = ref(false)
const error = ref('')
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingOrder = ref({})
const orderToDelete = ref(null)

const stats = computed(() => {
  const total = orders.value.length
  const pending = orders.value.filter(o => o.status === 'Pending').length
  const completed = orders.value.filter(o => o.status === 'Delivered').length
  const totalRevenue = orders.value.reduce((sum, o) => sum + (o.total || 0), 0)
  
  return [
    {
      icon: 'assignment',
      title: 'Total Orders',
      value: total.toString(),
      change: '+12.5%',
      iconClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      changeClass: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-xs font-medium px-2 py-1 rounded-full',
    },
    {
      icon: 'pending_actions',
      title: 'Pending Orders',
      value: pending.toString(),
      change: 'Active',
      iconClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      changeClass: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30 text-xs font-medium px-2 py-1 rounded-full',
    },
    {
      icon: 'task_alt',
      title: 'Completed Orders',
      value: completed.toString(),
      change: '+8.2%',
      iconClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
      changeClass: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-xs font-medium px-2 py-1 rounded-full',
    },
    {
      icon: 'payments',
      title: 'Total Revenue',
      value: formatPrice(totalRevenue),
      change: '+14%',
      iconClass: 'bg-primary/20 text-primary rounded-lg',
      changeClass: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-xs font-medium px-2 py-1 rounded-full',
    },
  ]
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const pagination = computed(() => {
  const total = orders.value.length
  return { from: 1, to: Math.min(10, total), total }
})

const fetchOrders = async () => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('adminToken')
    const res = await fetch('/api/orders', { 
      headers: { Authorization: `Bearer ${token}` } 
    })
    const data = await res.json()
    isLoading.value = false
    if (!res.ok) {
      throw new Error(data.error || 'Impossible de charger les commandes')
    }
    orders.value = data.orders
  } catch (err) {
    isLoading.value = false
    error.value = err.message || 'Erreur réseau'
  }
}

const filteredOrders = computed(() => {
  let list = orders.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (o) => o.orderNumber.toLowerCase().includes(q) || o.customer?.name?.toLowerCase().includes(q),
    )
  }
  return list
})

const editOrder = (order) => {
  editingOrder.value = {
    _id: order._id,
    status: order.status,
    paymentStatus: order.paymentStatus,
    notes: order.notes || ''
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingOrder.value = {}
}

const saveOrder = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const res = await fetch(`/api/orders/${editingOrder.value._id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({
        status: editingOrder.value.status,
        paymentStatus: editingOrder.value.paymentStatus,
        notes: editingOrder.value.notes
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Impossible de modifier la commande')
    
    const idx = orders.value.findIndex(o => o._id === editingOrder.value._id)
    if (idx > -1) orders.value[idx] = data.order
    closeEditModal()
  } catch (err) {
    error.value = err.message
  }
}

const deleteOrder = (order) => {
  orderToDelete.value = order
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const res = await fetch(`/api/orders/${orderToDelete.value._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Impossible de supprimer la commande')
    orders.value = orders.value.filter(o => o._id !== orderToDelete.value._id)
    showDeleteModal.value = false
    orderToDelete.value = null
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchOrders)
</script>
