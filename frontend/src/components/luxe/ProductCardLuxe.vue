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
        <span
          v-if="product.status === 'Out of Stock'"
          class="bg-red-600/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ml-2"
          >Rupture</span
        >
      </div>
    </div>
    <div class="p-6">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-white">{{ product.name }}</h3>
        <span class="text-primary font-bold">{{ formatPrice(product.price) }}</span>
      </div>
      <p class="text-sm text-slate-400 mb-6 line-clamp-2">
        {{ product.description }}
      </p>
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="goToProduct"
          class="py-2.5 px-4 text-xs font-semibold text-white border border-white/20 rounded-lg hover:bg-white hover:text-background-dark transition-all"
        >
          Voir Détails
        </button>
        <button
          v-if="product.status !== 'Out of Stock'"
          @click="addToCart"
          class="flex items-center justify-center gap-1 py-2.5 px-4 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary/80 transition-all"
        >
          <span class="material-symbols-outlined text-sm">add_shopping_cart</span>
          Ajouter
        </button>
        <button
          v-else
          disabled
          class="py-2.5 px-4 text-xs font-semibold text-slate-500 bg-slate-700 rounded-lg cursor-not-allowed"
        >
          Indisponible
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])
const router = useRouter()

// Format price
const formatPrice = (price) => {
  if (!price) return '0 €'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// Go to product detail
const goToProduct = () => {
  router.push(`/product/${props.product._id || props.product.id}`)
}

// Add to cart
const addToCart = () => {
  emit('add-to-cart', props.product)
}
</script>
