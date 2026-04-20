<template>
  <div
    class="group bg-anthracite/40 rounded-2xl border border-white/5 overflow-hidden hover:border-gold/50 transition-all duration-300 flex flex-col cursor-pointer"
  >
    <div class="relative overflow-hidden aspect-square bg-navy/50" @click="handleSelect">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-700"
      />
    </div>
    <div class="p-6 flex flex-col grow">
      <h3 class="text-lg font-bold line-clamp-2" @click="handleSelect">{{ product.name }}</h3>
      <p v-if="product.description" class="text-slate-400 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
      <div class="mt-auto">
        <p class="text-2xl font-bold text-primary mb-4">{{ product.price }}</p>
        <button
          @click="handleSelect"
          class="w-full px-4 py-3 bg-primary text-midnight font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
        >
          <span>Voir le produit</span>
          <span class="material-symbols-outlined text-lg">arrow_forward</span>
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
const emit = defineEmits(['order','select'])

function handleSelect() {
  emit('select', props.product)
}
</script>
