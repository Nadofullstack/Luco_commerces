<template>
  <div>
    <HeroSection
      @primaryClick="onHeroPrimary"
      @secondaryClick="onHeroSecondary"
    />

    <BenefitsSection />

    <CategoriesSection
      :categories="categories"
      :activeId="selectedCategory ? selectedCategory.id : null"
      @select="onCategorySelect"
    />

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

    <WhatsAppButton />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '../components/home/HeroSection.vue'
import BenefitsSection from '../components/home/BenefitsSection.vue'
import CategoriesSection from '../components/home/CategoriesSection.vue'
import FeaturedProducts from '../components/home/FeaturedProducts.vue'
import CTABanner from '../components/home/CTABanner.vue'
import WhatsAppButton from '../components/ui/WhatsAppButton.vue'

const router = useRouter()

// Products from database
const products = ref([])
const isLoading = ref(false)
const error = ref('')

// Static categories for filtering
const categories = ref([
  {
    id: 'horlogerie',
    title: 'Horlogerie',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLiZD0ICqH0wKNadND5NbpiH5qsc-7KTKM12m8k5zmL9rd2cxmVcTXPub3U32cmdkuPuZMMy07hR5NuxWZoLgli5-xD_eP-l48ZxTXMpMkA67NV0zEd07ipuYLen0EAS0b5jUHsk0nDLb9SOhH7TT06yyYvChXPmVbQcBi6Ue44m_taXbxzX4eF6YJJRBk4Jm3W3L2OfPBYpR968TneGujujFYo3eORjL5-TG8AfrbJLfPlit0K0LnUyXXaIaD3XE949z8W',
  },
  {
    id: 'technologie',
    title: 'Technologie',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAc4pNM5llrKDlNcJrtptB17k6oCu4nsJz9dmtWVaL4enxY33dJ1Xoa5dhNn9wsUzaprDgXJgT9OYUiCbks_h6jNH6D9JiZ6apaR2E43VxUX4R7qR8hzbAAKThIx5ij5QXzD6kqP4tmNtcsVZAp8QB-_UEAU2p-LK_vKCrRS-Ty9IbJmtSdz-yB9ct-bWjnGbcI7dd7x3PGDz7CgokfkQ6lyUv35qsDHrrVZwHpx7M7h97QOFtTwSP_sLLq2xhcSZzDnylPyeAKdbdI',
  },
  {
    id: 'mode-homme',
    title: 'Mode Homme',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDhBk2Nygz44mZd6B-xSqsO7UBCbOMCcFuav5SPAoA1hghMk6nyd453n0AX6Ofr1ozuseph8zFQZpT5K9odfvBLRCOgi-N07hyCDX0RqXgC4UhMmgk1aYe_lXMoQzf9ovVq349Jp1uSka6lKyVqTioGNqwxs4wvtZoL4UQyxIXq1hYws02sAq_4jDnMD4dvv9fexwDUpCz0MHzq5-LUVrHtrmyWCsDxvfd0XyTeUBU_79TQeAXC4u6-wyTMQ9NOpgc1ta9n_aPchx7eD',
  },
  {
    id: 'parfumerie',
    title: 'Parfumerie',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu170X_5svL6AyZkFFwQeLrLNsqMYWzlYnIoVKCM_hdZN3pMDr8cyCG0ge-pG3r47kyT8hGWNyukErk60t75Y27ooQveQ0YAFZdbVTE1LPjyE9K5PrXH25WOXYpRXmZHn9aYSKSmTIRhGwEz2Funp5ewYkOozPI5agRsFNZNbsmZuNa4isZhe_vSCf-rMg6mgE0I2USrtm2y3VM-NP4dbxfRbfHQbMK7SGAKa_Y8z8UCCGxScyLIgbtdGZBhCKtvJBEE0HgDxf4MIV',
  },
])

const selectedCategory = ref(null)

// Fetch products from API
const fetchProducts = async () => {
  try {
    isLoading.value = true
    error.value = ''
    const API_URL = import.meta.env.VITE_API_URL || '/api'
    const res = await fetch(`${API_URL}/products`)
    const data = await res.json()
    
    if (!res.ok) {
      throw new Error(data.error || 'Erreur lors du chargement des produits')
    }
    
    // Transform database products to match frontend format
    products.value = data.products.map(p => ({
      id: p._id,
      name: p.name,
      description: p.description || '',
      price: formatPrice(p.price),
      image: p.image,
      category: mapCategory(p.category),
      rawPrice: p.price
    }))
  } catch (err) {
    error.value = err.message
    console.error('Error fetching products:', err)
  } finally {
    isLoading.value = false
  }
}

// Map backend categories to frontend categories
const mapCategory = (category) => {
  const categoryMap = {
    'Electronics': 'technologie',
    'Fashion': 'mode-homme',
    'Beauty': 'parfumerie',
    'Accessories': 'horlogerie',
    'General': 'horlogerie'
  }
  return categoryMap[category] || 'horlogerie'
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
