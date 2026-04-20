<template>
  <div>
    <HeroSection
      @primaryClick="onHeroPrimary"
      @secondaryClick="onHeroSecondary"
    />

    <BenefitsSection />

   

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-500">{{ error }}</p>
      <button @click="fetchProducts" class="mt-4 px-4 py-2 bg-primary text-white rounded">Réessayer</button>
    </div>

    <!-- Products from database -->
    <FeaturedProducts
      v-else
      :products="filteredProducts"
      @order="handleOrder"
      @view="handleView"
    />

    <CTABanner @contact="onContact" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '../components/home/HeroSection.vue'
import BenefitsSection from '../components/home/BenefitsSection.vue'
import FeaturedProducts from '../components/home/FeaturedProducts.vue'
import CTABanner from '../components/home/CTABanner.vue'

const router = useRouter()

// Products from database
const products = ref([])
const isLoading = ref(false)
const error = ref('')

const selectedCategory = ref(null)

// Fetch products from API
const fetchProducts = async () => {
  try {
    isLoading.value = true
    error.value = ''
    const API_URL = import.meta.env.VITE_API_URL || '/api'
    console.log('Fetching from:', `${API_URL}/products`)
    const res = await fetch(`${API_URL}/products`)
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }
    
    const data = await res.json()
    
    // Transform database products to match frontend format
    products.value = data.products.map(p => ({
      id: p._id,
      name: p.name,
      description: p.description || '',
      price: formatPrice(p.price),
      image: p.image,
      rawPrice: p.price
    }))
  } catch (err) {
    error.value = err.message
    console.error('Error fetching products:', err)
  } finally {
    isLoading.value = false
  }
}


// Format price to CFA
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0
  }).format(price)
}

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value
  return products.value.filter((p) => p.category === selectedCategory.value.id)
})

function onCategorySelect(cat) {
  selectedCategory.value = cat
}

function handleOrder(product) {
  const phone = '22900000000' // placeholder
  const text = encodeURIComponent(`Bonjour, je souhaite commander : ${product.name} - ${product.price}`)
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
}

function handleView(product) {
  router.push(`/product/${product.id}`)
}

function onHeroPrimary() {
  const el = document.getElementById('products')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function onHeroSecondary() {
  router.push('/contact')
}

function onContact() {
  router.push('/contact')
}

// Fetch products on component mount
onMounted(fetchProducts)
</script>
