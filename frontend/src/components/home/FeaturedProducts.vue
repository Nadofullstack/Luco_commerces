<template>
  <section class="py-24 bg-white/5" id="products">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Nos Produits Vedettes</h2>
        <p class="text-slate-400 max-w-xl mx-auto">
          Une sélection rigoureuse de nos meilleurs articles, alliant design intemporel et
          technologie de pointe.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard
          v-for="p in products"
          :key="p.id"
          :product="p"
          @order="orderWhatsApp"
          @select="viewProduct"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['order', 'view'])

function orderWhatsApp(product) {
  emit('order', product)
}

function viewProduct(product) {
  emit('view', product)
}
</script>
