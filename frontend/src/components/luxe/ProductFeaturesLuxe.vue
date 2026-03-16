<template>
  <div class="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div
      v-for="feature in features"
      :key="feature.title"
      class="bg-navy/40 p-10 rounded-3xl border border-white/5 hover:border-white/10 transition-all"
    >
      <span class="material-symbols-outlined text-primary text-4xl mb-6">{{ feature.icon }}</span>
      <h3 class="text-xl font-bold text-white mb-4">{{ feature.title }}</h3>
      <p class="text-slate-400">{{ feature.description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  features: {
    type: Array,
    default: () => [],
  },
})
</script>
