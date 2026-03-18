<template>
  <div
    class="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
  >
    <OrderFilters
      v-model:status="statusFilter"
      v-model:dateRange="dateRange"
      @apply="applyFilters"
    />

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold tracking-wider"
          >
            <th class="px-6 py-4">Order ID</th>
            <th class="px-6 py-4">Customer Name</th>
            <th class="px-6 py-4">Date</th>
            <th class="px-6 py-4">Total Amount</th>
            <th class="px-6 py-4">Payment</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr
            v-for="order in filteredOrders"
            :key="order._id"
            class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
          >
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-slate-100"
            >
              {{ order.orderNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div
                  class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400"
                >
                  {{ getInitials(order.customer?.name) }}
                </div>
                <span class="text-sm text-slate-700 dark:text-slate-200">{{ order.customer?.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
              {{ formatDate(order.createdAt) }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100"
            >
              {{ formatPrice(order.total) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
              {{ order.paymentMethod }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="getStatusClass(order.status)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
              <div class="flex items-center justify-end gap-2">
                <button class="text-primary hover:underline font-medium">View Details</button>
                <span class="text-slate-300 dark:text-slate-700">|</span>
                <button @click="$emit('edit', order)" class="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                  Update
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between"
    >
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
      </p>
      <div class="flex gap-2">
        <button
          class="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm disabled:opacity-50"
          :disabled="pagination.from === 1"
        >
          Previous
        </button>
        <button class="px-3 py-1 bg-primary text-white rounded text-sm">1</button>
        <button
          class="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          2
        </button>
        <button
          class="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          3
        </button>
        <button
          class="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import OrderFilters from './OrderFilters.vue'
import { ref, computed } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    default: () => [],
  },
  pagination: {
    type: Object,
    default: () => ({ from: 1, to: 5, total: 1284 }),
  },
})

defineEmits(['edit'])

const statusFilter = ref('All Status')
const dateRange = ref('')

const filteredOrders = computed(() => {
  let list = props.orders
  
  // Filter by status
  if (statusFilter.value && statusFilter.value !== 'All Status') {
    list = list.filter((o) => o.status === statusFilter.value)
  }
  
  // Filter by date range
  if (dateRange.value) {
    const [startStr, endStr] = dateRange.value.split(' - ')
    if (startStr && endStr) {
      const start = new Date(startStr)
      const end = new Date(endStr)
      list = list.filter((o) => {
        const orderDate = new Date(o.createdAt)
        return orderDate >= start && orderDate <= end
      })
    }
  }
  
  return list
})

function applyFilters() {
  // Filters are applied automatically through computed property
}

const getInitials = (name) => {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price || 0)
}

const getStatusClass = (status) => {
  const classes = {
    'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    'Processing': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
    'Shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    'Delivered': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
  }
  return classes[status] || 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
}
</script>
