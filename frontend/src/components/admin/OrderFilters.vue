<template>
  <div
    class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4"
  >
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap"
        >Filter Status:</span
      >
      <select
        v-model="status"
        class="bg-slate-100 dark:bg-slate-800 border-none text-sm rounded-lg focus:ring-primary/50 text-slate-700 dark:text-slate-200 py-1.5 pl-3 pr-8"
      >
        <option>All Status</option>
        <option>Pending</option>
        <option>Processing</option>
        <option>Shipped</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap"
        >From:</span
      >
      <input
        v-model="startDate"
        type="date"
        class="bg-slate-100 dark:bg-slate-800 border-none text-sm rounded-lg focus:ring-primary/50 text-slate-700 dark:text-slate-200 py-1.5 px-2"
      />
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap"
        >To:</span
      >
      <input
        v-model="endDate"
        type="date"
        class="bg-slate-100 dark:bg-slate-800 border-none text-sm rounded-lg focus:ring-primary/50 text-slate-700 dark:text-slate-200 py-1.5 px-2"
      />
    </div>
    <div class="flex-1"></div>
    <button
      @click="applyFilters"
      class="px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600"
    >
      Apply
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  status: { type: String, default: 'All Status' },
  dateRange: { type: String, default: '' },
})
const emit = defineEmits(['update:status', 'update:dateRange', 'apply'])

const status = ref(props.status)
const startDate = ref('')
const endDate = ref('')

watch(status, (v) => emit('update:status', v))

function applyFilters() {
  const dateRangeValue = startDate.value && endDate.value 
    ? `${startDate.value} - ${endDate.value}` 
    : ''
  emit('update:dateRange', dateRangeValue)
  emit('apply')
}
</script>
