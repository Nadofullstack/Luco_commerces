<template>
  <div
    class="bg-white dark:bg-midnight p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
  >
    <div class="flex items-center justify-between mb-4">
      <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', iconClass]">
        <span class="material-symbols-outlined">{{ icon }}</span>
      </div>
      <span :class="changeClass">{{ change }}</span>
    </div>
    <h3 class="text-slate-500 dark:text-slate-400 text-sm font-medium">{{ title }}</h3>
    <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">{{ value }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  title: String,
  value: String,
  change: String,
  iconClass: {
    type: String,
    default: 'bg-blue-500/10 text-blue-500',
  },
  changeClass: {
    type: String,
    default: 'text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-lg',
  },
})
</script>
