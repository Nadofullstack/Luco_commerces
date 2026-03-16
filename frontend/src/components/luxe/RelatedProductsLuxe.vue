<template>
  <section class="mt-32">
    <div class="flex items-end justify-between mb-12">
      <div>
        <h2 class="text-3xl font-black text-white mb-2">Complete Your Collection</h2>
        <p class="text-slate-400">
          Hand-selected timepieces that complement the {{ product.name }}.
        </p>
      </div>
      <button class="flex items-center gap-2 text-primary font-bold hover:underline transition-all">
        View All Collections <span class="material-symbols-outlined">trending_flat</span>
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="item in related" :key="item.id" class="group cursor-pointer">
        <div class="aspect-square bg-navy rounded-2xl overflow-hidden mb-4 relative">
          <img
            class="w-full h-full object-cover transition-transform group-hover:scale-110"
            :src="item.image"
            :alt="item.name"
          />
          <div
            class="absolute inset-0 bg-background-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <span class="bg-white text-background-dark font-bold px-4 py-2 rounded-full text-sm"
              >Quick View</span
            >
          </div>
        </div>
        <h4 class="text-white font-bold group-hover:text-primary transition-colors">
          {{ item.name }}
        </h4>
        <p class="text-slate-500">{{ item.price }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  related: {
    type: Array,
    default: () => [],
  },
})
</script>
