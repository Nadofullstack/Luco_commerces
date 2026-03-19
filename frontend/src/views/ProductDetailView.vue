<template>
  <div>
    <main class="pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <p class="text-red-500 mb-4">{{ error }}</p>
          <router-link to="/luxe" class="text-primary hover:underline">
            Retour à la boutique
          </router-link>
        </div>

        <!-- Product Details -->
        <div v-else-if="product">
          <!-- Breadcrumbs -->
          <nav class="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <router-link class="hover:text-primary transition-colors" to="/">Accueil</router-link>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
            <router-link class="hover:text-primary transition-colors" to="/luxe">Boutique</router-link>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
            <span class="text-slate-100">{{ product.name }}</span>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <!-- Gallery -->
            <ProductGalleryLuxe :product="product" />
            
            <!-- Info -->
            <div>
              <h1 class="text-3xl font-bold text-white mb-2">{{ product.name }}</h1>
              <p class="text-sm text-slate-400 mb-4">SKU: {{ product.sku }}</p>
              
              <!-- Price -->
              <p class="text-4xl font-bold text-primary mb-6">
                {{ formatPrice(product.price) }}
              </p>
              
              <!-- Description -->
              <p class="text-slate-300 mb-6">
                {{ product.description || 'Aucune description disponible.' }}
              </p>
              
              <!-- Category & Status -->
              <div class="flex gap-4 mb-8">
                <span class="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
                  {{ product.category }}
                </span>
                <span :class="getStatusClass(product.status)" class="px-3 py-1 rounded-full text-sm">
                  {{ product.status }}
                </span>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex flex-col gap-4">
                <!-- Add to Cart -->
                <button
                  @click="addToCart"
                  :disabled="product.status === 'Out of Stock'"
                  class="w-full py-4 bg-primary text-midnight font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined">add_shopping_cart</span>
                    Ajouter au panier
                  </span>
                </button>
                
                <!-- Commander via WhatsApp -->
                <a
                  :href="whatsappOrderUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors text-center"
                >
                  <span class="flex items-center justify-center gap-2">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Commander sur WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>

          <!-- Related Products -->
          <div class="mt-20">
            <h2 class="text-2xl font-bold text-white mb-8">Produits similaires</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                v-for="related in relatedProducts"
                :key="related._id"
                class="bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
              >
                <router-link :to="`/product/${related._id}`">
                  <div class="aspect-square overflow-hidden">
                    <img
                      :src="related.image"
                      :alt="related.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold text-white truncate">{{ related.name }}</h3>
                    <p class="text-primary font-bold mt-1">{{ formatPrice(related.price) }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <FooterLuxe />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FooterLuxe from '../components/luxe/FooterLuxe.vue'
import ProductGalleryLuxe from '../components/luxe/ProductGalleryLuxe.vue'
import whatsappService from '../services/whatsappService'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(null)
const relatedProducts = ref([])
const loading = ref(true)
const error = ref('')
const whatsappOrderUrl = ref('#')

// Format price in XAF
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Get status CSS class
const getStatusClass = (status) => {
  const classes = {
    'In Stock': 'bg-green-500/20 text-green-400',
    'Low Stock': 'bg-yellow-500/20 text-yellow-400',
    'Out of Stock': 'bg-red-500/20 text-red-400'
  }
  return classes[status] || 'bg-slate-700 text-slate-300'
}

// Handle image error
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/400'
}

// Fetch product by ID
const fetchProduct = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const productId = route.params.id
    
    // Fetch single product by ID
    const res = await fetch(`/api/products/public/${productId}`)
    const data = await res.json()
    
    if (!res.ok) {
      throw new Error(data.error || 'Erreur lors du chargement du produit')
    }
    
    product.value = data.product
    
    // Fetch related products (same category)
    const allRes = await fetch('/api/products/public')
    const allData = await allRes.json()
    
    if (allRes.ok) {
      relatedProducts.value = (allData.products || [])
        .filter(p => p._id !== productId && p.category === product.value.category)
        .slice(0, 4)
    }
    
    // Generate WhatsApp order link
    generateWhatsAppOrderLink()
    
  } catch (err) {
    error.value = err.message || 'Erreur réseau'
    console.error('[ProductDetailView] Erreur:', err)
  } finally {
    loading.value = false
  }
}

// Generate WhatsApp order link
const generateWhatsAppOrderLink = () => {
  try {
    const message = `Bonjour! Je souhaite commander le produit:
- Nom: ${product.value.name}
- Prix: ${formatPrice(product.value.price)}
- SKU: ${product.value.sku}

Merci de me contacter pour finaliser la commande.`
    
    const url = whatsappService.generateFallbackWhatsAppLink(message)
    whatsappOrderUrl.value = url
  } catch (err) {
    console.error('[ProductDetailView] Erreur WhatsApp:', err)
    whatsappOrderUrl.value = '#'
  }
}

// Add to cart
const addToCart = () => {
  cartStore.addItem({
    _id: product.value._id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
    sku: product.value.sku
  })
  
  // Show success message
  alert('Produit ajouté au panier!')
}

// Fetch on mount
onMounted(() => {
  fetchProduct()
})
</script>
