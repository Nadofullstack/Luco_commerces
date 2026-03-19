<template>
  <div class="flex flex-col gap-6">
    <!-- Main Image -->
    <div class="aspect-[4/5] bg-navy rounded-2xl overflow-hidden relative group">
      <img
        :src="activeImage"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        :alt="product.name"
        @error="handleImageError"
      />
    </div>
    
    <!-- Thumbnail Images -->
    <div v-if="productImages.length > 1" class="grid grid-cols-4 gap-4">
      <button
        v-for="(img, idx) in productImages"
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
          @error="handleImageError"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  product: { type: Object, required: true },
})

// Handle both array of images and single image
const productImages = computed(() => {
  if (props.product.images && Array.isArray(props.product.images)) {
    return props.product.images
  }
  if (props.product.image) {
    return [props.product.image]
  }
  return ['https://via.placeholder.com/400']
})

// Use first image as default
const activeImage = ref(productImages.value[0])

// Watch for product changes
watch(() => props.product, () => {
  activeImage.value = productImages.value[0]
}, { immediate: true })

// Handle image error
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/400'
}
</script>
