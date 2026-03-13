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
              <button
                class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90"
              >
                <span class="material-symbols-outlined text-lg">add</span> New Order
              </button>
            </div>
          </div>

          <!-- Overview Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard v-for="stat in stats" :key="stat.title" v-bind="stat" />
          </div>

          <!-- Filters & Table Section -->
          <OrdersTable :orders="filteredOrders" :pagination="pagination" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AdminHeader from '../components/admin/AdminHeader.vue'
import StatsCard from '../components/admin/StatsCard.vue'
import OrdersTable from '../components/admin/OrdersTable.vue'
import { ref, computed } from 'vue'

const searchQuery = ref('')

const stats = ref([
  {
    icon: 'assignment',
    title: 'Total Orders',
    value: '1,284',
    change: '+12.5%',
    iconClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    changeClass:
      'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-xs font-medium px-2 py-1 rounded-full',
  },
  {
    icon: 'pending_actions',
    title: 'Pending Orders',
    value: '156',
    change: 'Active',
    iconClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    changeClass:
      'text-amber-500 bg-amber-100 dark:bg-amber-900/30 text-xs font-medium px-2 py-1 rounded-full',
  },
  {
    icon: 'task_alt',
    title: 'Completed Orders',
    value: '1,128',
    change: '+8.2%',
    iconClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    changeClass:
      'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-xs font-medium px-2 py-1 rounded-full',
  },
  {
    icon: 'payments',
    title: 'Total Revenue',
    value: '$42,560.00',
    change: '+14%',
    iconClass: 'bg-primary/20 text-primary rounded-lg',
    changeClass:
      'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-xs font-medium px-2 py-1 rounded-full',
  },
])

const orders = ref([
  {
    id: '#ORD-8921',
    initials: 'JD',
    customer: 'Jane Doe',
    date: 'Oct 24, 2023',
    total: '$245.99',
    payment: 'Credit Card',
    status: 'Delivered',
    statusClass:
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  {
    id: '#ORD-8922',
    initials: 'MS',
    customer: 'Mark Smith',
    date: 'Oct 24, 2023',
    total: '$120.50',
    payment: 'PayPal',
    status: 'Pending',
    statusClass:
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  },
  {
    id: '#ORD-8923',
    initials: 'RJ',
    customer: 'Robert Johnson',
    date: 'Oct 23, 2023',
    total: '$892.00',
    payment: 'Bank Transfer',
    status: 'Shipped',
    statusClass:
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  },
  {
    id: '#ORD-8924',
    initials: 'AW',
    customer: 'Alice Wong',
    date: 'Oct 23, 2023',
    total: '$54.20',
    payment: 'Credit Card',
    status: 'Processing',
    statusClass:
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  },
  {
    id: '#ORD-8925',
    initials: 'EM',
    customer: 'Eric Miller',
    date: 'Oct 22, 2023',
    total: '$1,020.00',
    payment: 'Stripe',
    status: 'Cancelled',
    statusClass:
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  },
])

const pagination = ref({ from: 1, to: 5, total: 1284 })

const filteredOrders = computed(() => {
  let list = orders.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q),
    )
  }
  return list
})
</script>
