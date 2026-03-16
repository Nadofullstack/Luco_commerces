<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#081225]">
      <AdminHeader v-model="searchQuery" />

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <!-- Page Title -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Product Management</h2>
            <p class="text-slate-500 dark:text-slate-400 text-sm">
              Efficiently manage your inventory and catalog items.
            </p>
          </div>
          <div class="flex gap-3">
            <button
              class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-all"
            >
              <span class="material-symbols-outlined text-lg">file_download</span>
              Export
            </button>
            <button
              class="flex items-center gap-2 px-6 py-2 bg-primary text-midnight rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              <span class="material-symbols-outlined text-lg">add</span>
              Add New Product
            </button>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard v-for="stat in stats" :key="stat.title" v-bind="stat" />
        </div>

        <!-- Main Grid Layout -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div class="xl:col-span-2">
            <ProductsTable :products="filteredProducts" :pagination="pagination" @edit="editProduct" @delete="deleteProduct" />
          </div>

          <div class="space-y-6 xl:col-span-1">
            <QuickAddProduct @create="createProduct" />
            <InsightsCard />
          </div>
        </div>
        <div v-if="error" class="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">{{ error }}</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AdminHeader from '../components/admin/AdminHeader.vue'
import StatsCard from '../components/admin/StatsCard.vue'
import ProductsTable from '../components/admin/ProductsTable.vue'
import QuickAddProduct from '../components/admin/QuickAddProduct.vue'
import InsightsCard from '../components/admin/InsightsCard.vue'
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const products = ref([])
const isLoading = ref(false)
const error = ref('')

const stats = ref([
  { icon: 'inventory_2', title: 'Total Products', value: '0', change: '+0.0%', iconClass: 'bg-blue-500/10 text-blue-500', changeClass: 'text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-lg' },
  { icon: 'check_circle', title: 'Active Listings', value: '0', change: '+0.0%', iconClass: 'bg-forest/10 flex items-center justify-center text-forest dark:text-sage', changeClass: 'text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-lg' },
  { icon: 'block', title: 'Out of Stock', value: '0', change: '-0%', iconClass: 'bg-red-500/10 flex items-center justify-center text-red-500', changeClass: 'text-red-500 text-xs font-bold bg-red-500/10 px-2 py-1 rounded-lg' },
])

const fetchProducts = async () => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('adminToken')
    const res = await fetch('/api/products', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    isLoading.value = false
    if (!res.ok) {
      throw new Error(data.error || 'Impossible de charger les produits')
    }
    products.value = data.products
    updateStats()
  } catch (err) {
    isLoading.value = false
    error.value = err.message || 'Erreur réseau'
  }
}

const updateStats = () => {
  const total = products.value.length
  const outOfStock = products.value.filter((p) => p.status === 'Out of Stock').length
  stats.value[0].value = total
  stats.value[1].value = products.value.filter((p) => p.status === 'In Stock').length
  stats.value[2].value = outOfStock
}

const createProduct = async (payload) => {
  try {
    const token = localStorage.getItem('adminToken')
    const form = new FormData()
    form.append('name', payload.name)
    form.append('sku', payload.sku)
    form.append('description', payload.description || '')
    form.append('category', payload.category)
    form.append('price', payload.price)
    form.append('status', payload.status)
    if (payload.imageFile) form.append('image', payload.imageFile)

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Impossible de créer le produit')
    products.value.unshift(data.product)
    updateStats()
  } catch (err) {
    error.value = err.message
  }
}

const deleteProduct = async (item) => {
  try {
    const token = localStorage.getItem('adminToken')
    const res = await fetch(`/api/products/${item._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Impossible de supprimer le produit')
    products.value = products.value.filter((p) => p._id !== item._id)
    updateStats()
  } catch (err) {
    error.value = err.message
  }
}

const editProduct = async (item) => {
  const name = window.prompt('Nom du produit', item.name)
  if (!name) return
  const price = window.prompt('Prix', item.price)
  if (!price) return
  try {
    const token = localStorage.getItem('adminToken')
    const res = await fetch(`/api/products/${item._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, price: Number(price) }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Impossible de modifier le produit')
    const idx = products.value.findIndex((p) => p._id === item._id)
    if (idx > -1) products.value[idx] = data.product
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchProducts)

const filteredProducts = computed(() => {
  let list = products.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
  }
  return list
})

const pagination = ref({ from: 1, to: 10, total: 10 })

</script>
