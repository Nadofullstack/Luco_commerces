<template>
  <div
    class="group bg-anthracite/40 rounded-2xl border border-white/5 overflow-hidden hover:border-gold/50 transition-all duration-300 flex flex-col cursor-pointer"
    @click="handleSelect"
  >
    <div class="relative overflow-hidden aspect-square">
      <img
        :src="product.image"
        alt="Product"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div class="absolute top-4 right-4">
        <button
          class="bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <span class="material-symbols-outlined text-sm">favorite</span>
        </button>
      </div>
    </div>
    <div class="p-6 flex flex-col grow">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-bold">{{ product.name }}</h3>
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
