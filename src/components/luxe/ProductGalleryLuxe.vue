<template>
  <div class="flex flex-col gap-6">
    <div class="aspect-[4/5] bg-navy rounded-2xl overflow-hidden relative group">
      <img
        :src="activeImage"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        :alt="product.name"
      />
      <div v-if="product.label" class="absolute top-6 right-6">
        <span
          class="bg-primary/20 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/30 uppercase tracking-widest"
          >{{ product.label }}</span
        >
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <button
        v-for="(img, idx) in product.images"
        :key="idx"
        @click="activeImage = img"
        :class="[
          'aspect-square bg-navy rounded-xl overflow-hidden transition-all',
          { 'border-2 border-primary': activeImage === img },
        ]"
      >
        <img
          :src="img"
          class="w-full h-full object-cover"
          :alt="`${product.name} thumbnail ${idx + 1}`"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  product: { type: Object, required: true },
})
const activeImage = ref(props.product.images[0])
</script>
