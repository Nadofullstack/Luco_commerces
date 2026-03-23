<template>
  <div class="min-h-screen bg-midnight">
    
    <main class="pt-24 pb-16">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Hero Section -->
        <div class="text-center py-16">
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-gold mb-4">
            Collection Exclusive
          </h1>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de produits de luxe,crafted pour ceux qui ne connaissent que l'excellence.
          </p>
        </div>

        <!-- Products Grid -->
        <ProductGridLuxe />
      </div>
    </main>

    <FooterLuxe />
  </div>
</template>

<script setup>
import FooterLuxe from '../components/luxe/FooterLuxe.vue'
import ProductGridLuxe from '../components/luxe/ProductGridLuxe.vue'
</script>
