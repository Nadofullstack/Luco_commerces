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
            :key="order.id"
            class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
          >
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-slate-100"
            >
              {{ order.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div
                  class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400"
                >
                  {{ order.initials }}
                </div>
                <span class="text-sm text-slate-700 dark:text-slate-200">{{ order.customer }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
              {{ order.date }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100"
            >
              {{ order.total }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
              {{ order.payment }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="order.statusClass"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
              <div class="flex items-center justify-end gap-2">
                <button class="text-primary hover:underline font-medium">View Details</button>
                <span class="text-slate-300 dark:text-slate-700">|</span>
                <button class="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
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

const statusFilter = ref('All Status')
const dateRange = ref('Oct 1, 2023 - Oct 31, 2023')

const filteredOrders = computed(() => {
  let list = props.orders
  if (statusFilter.value && statusFilter.value !== 'All Status') {
    list = list.filter((o) => o.status === statusFilter.value)
  }
  // simple date range check could be added here
  return list
})

function applyFilters() {
  // placeholder for actions when the filter button is clicked
  // currently filters are reactive automatically
}
</script>
