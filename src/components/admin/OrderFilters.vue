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
        >Date Range:</span
      >
      <div class="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5">
        <span class="material-symbols-outlined text-slate-400 text-sm mr-2">calendar_today</span>
        <input
          v-model="dateRange"
          class="bg-transparent border-none p-0 text-sm text-slate-700 dark:text-slate-200 focus:ring-0 w-44"
          type="text"
        />
      </div>
    </div>
    <div class="flex-1"></div>
    <button
      @click="$emit('apply')"
      class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
    >
      <span class="material-symbols-outlined">filter_list</span>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  status: { type: String, default: 'All Status' },
  dateRange: { type: String, default: 'Oct 1, 2023 - Oct 31, 2023' },
})
const emit = defineEmits(['update:status', 'update:dateRange', 'apply'])

const status = ref(props.status)
const dateRange = ref(props.dateRange)

watch(status, (v) => emit('update:status', v))
watch(dateRange, (v) => emit('update:dateRange', v))
</script>
