<template>
  <div
    class="group bg-navy/30 border border-white/5 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
  >
    <div class="relative aspect-square overflow-hidden bg-navy">
      <img
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        :src="product.image"
        :alt="product.name"
      />
      <div class="absolute top-4 left-4">
        <span
          v-if="product.label"
          class="bg-primary/90 text-background-dark text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider"
          >{{ product.label }}</span
        >
      </div>
    </div>
    <div class="p-6">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-white">{{ product.name }}</h3>
        <span class="text-primary font-bold">{{ product.price }}</span>
      </div>
      <p class="text-sm text-slate-400 mb-6 line-clamp-2">
        {{ product.description }}
      </p>
      <div class="grid grid-cols-2 gap-3">
        <button
          class="py-2.5 px-4 text-xs font-semibold text-white border border-white/20 rounded-lg hover:bg-white hover:text-background-dark transition-all"
        >
          Voir Détails
        </button>
        <button
          class="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary/80 transition-all"
        >
          <span class="material-symbols-outlined text-sm">chat</span>
          WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
