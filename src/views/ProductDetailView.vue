<template>
  <div>
    <HeaderLuxe />
    <main class="pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <a class="hover:text-primary transition-colors" href="#">Home</a>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <a class="hover:text-primary transition-colors" href="#">Watches</a>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-slate-100">{{ product.name }}</span>
        </nav>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ProductGalleryLuxe :product="product" />
          <ProductInfoLuxe :product="product" />
        </div>
        <ProductFeaturesLuxe :features="product.features" />
        <RelatedProductsLuxe :product="product" :related="relatedProducts" />
      </div>
    </main>
    <FooterLuxe />
  </div>
</template>

<script setup>
import HeaderLuxe from '../components/luxe/HeaderLuxe.vue'
import FooterLuxe from '../components/luxe/FooterLuxe.vue'
import ProductGalleryLuxe from '../components/luxe/ProductGalleryLuxe.vue'
import ProductInfoLuxe from '../components/luxe/ProductInfoLuxe.vue'
import ProductFeaturesLuxe from '../components/luxe/ProductFeaturesLuxe.vue'
import RelatedProductsLuxe from '../components/luxe/RelatedProductsLuxe.vue'

// simulate data (could fetch by id)
const product = {
  id: 1,
  name: 'Obsidian Chrono - Limited Edition',
  price: '$1,299',
  label: 'Limited Edition',
  description:
    'A masterpiece of engineering and style, featuring a sapphire crystal face and premium Italian leather strap. Designed for those who appreciate the weight of history on their wrist.',
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBoNEG-Ei-EwRQEdPyPK5hVa5lyo5PGX8Lcp_h6rnXd7SBq7hE8ZHEyctZYU7ICdBpbTxozIPxwyJRQtiW_6k9K7oYplIihBormF53Blfw_LdK-Xt-4Zz2xfOT7mXVtXoPJYmryp2l_jtFk2siZLLOZx7rmpiLnkaFS2A7r46BQ72DgN2l8wwOJqoISU1LQvcf9KGO0uOpi8YLMZpK5xuR_cbMXfQ58qPkPzldixIz8157n4EDK137N0ZjeGKGUaqiv6i0A5MhWBuq',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBD1fa5wLdc7JiAtYlaBE2Q6fXU9qv8ltG4EhyybS2h5PTcM5D3e3k6-hYhC_otTL50CgPqUMJqoocFcZhmo9bgWvr74AEvnVVML_ImhzCYW5KuJhhlQz4L_c5ppRpj8cjKwP4YGVvqJPrmsc8zO9rUiC7kGTaljV8aPvJOA3RVvlY5e7jEcdPeOrG8Q7gq0MOsPuLmiZcX77ojQqPfyBoWQsBoIfrwo3rIT0AEFSfuWNR-v8ISZK4NayB4tbDBXRbf89MfB7ukuLIi',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD0uRtEi96QdxoVwJ2aG2fbXinvVyyWjZIkHNZL4LT5okPh9FocS7HHUVP46LJUuuZ_sDSzdMc9O_a0aFg61QqLmm2V73QsjSO9EqrecabeEmQsG-YTuSLfpmmNXDjYxyMWpfVILNIBr_1bI8h6QJUskHCXQw0RYZpn7IwWZygO1t59Y4yQrcyT8v_MT7UZmIbZiF7BTcjDgTCzbf35Okr8aLK1OwoF6EbxYEoESkZzPCJJtJs2mWVnrp8gdZxBPipSC50x9u-RlnyK',
  ],
  features: [
    {
      icon: 'precision_manufacturing',
      title: 'Swiss Movement',
      detail: 'Caliber 5 precision automatic movement',
    },
    { icon: 'water_drop', title: 'Water Resistant', detail: 'Up to 100 meters (10 ATM)' },
    { icon: 'verified', title: '2-Year Warranty', detail: 'International comprehensive coverage' },
  ],
}

const relatedProducts = [
  {
    id: 2,
    name: 'Starlight Diver',
    price: '$950',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD636dMxcEX7DR6lkGKOErNiL8uR4sAa1UB7X3H9DWEQmsFf86HDGlRlm5Z3JqU56efV8LdDeDyWW0vvTqbfC_APV0KF8rjd-JEVTX4PuOwyJBR7orBpMIRT0rNT28Fg2iJrQCKwKxQHass67PLOG99cvBoY7wWBnMbkOdUsdwVcS2X_4T8-l1nk3M0QB7W9-QiNuSDiXDAl5pA5MLqjurmUPrO4En-WmJknvvBKtbJNnHtYIWsAxFWos9cmrh5XeZK7VYmgH3e0y2k',
  },
  {
    id: 3,
    name: 'Azure Executive',
    price: '$1,450',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-kH-dh8oE42Cd1K2ZICkWirSgRHVx-Di9aFyFMkOAUGsClyaLmLNe2kwimFFP4NFa5o-D7qnoJPX1EgMGDEYq_oDwH6wZQKU3f9e9qLKkMzU7Jjo-3LOgaL5ND58OGRNQR3aokLM0HaLHIWMSUUgLJjaip87VXcfZMVWmwFW-dXqTcftANIgUNaWc1bd2orAMpwkuG3cTDE2KUEUILKJ2CP_xmvKw83wfcu8wOv9hNpHB75lUBx7E0kf53cpgdN-9ZBC7Ku4E-jcq',
  },
  {
    id: 4,
    name: 'Gilded Heritage',
    price: '$2,100',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCDKZarlwBlpl2_HUAMyNoDlfEImajF8lHX3T0MgD0S8d-gGLtKI4hz_Kw0HEzCyDPFIyP8csqnlMEaVikbFQ7gQCfLcWjuKuMwygpmluXQQXYuX7zYhsW3370c6OpHz1qK-vVcwj_Hmvdxhfn6T-FuU83ayklZk3PTfXQ2a7oq-Us06SEdw0ElZAzN9adQJBEDQZDwd8tAm08EcWjOe3pMXrA_ZGOYhP7SIg5_5dZPF5cTw1xztaDyf4H1e4UysXHhGSTJ1zXRtTiX',
  },
  {
    id: 5,
    name: 'Stealth Minimalist',
    price: '$780',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsgAPQcCZdNW0Y3eS41pnk4hJw4wRu4djX_izi_3-VZaKAPbmziWw_4z8EvoB5y_CCKsJ2vN1tP3tytcBMABkLaB1QQ2LjU5iJ6yV4hB-04TqWu5lm6gbYm6-DYyuaiZXzqNUaOnD5xmM8MdXCYOvF67S1x7NumS8566CN567ABkBSIRT_4KwJQFfIuhwEYIQR1m6x6W9EUThFaj5935vf1-Qr5XHCq4pU6kmCDMSuje059DVdyt58zW1oXedjfcgKPOlCrgCBClZQ',
  },
]
</script>
