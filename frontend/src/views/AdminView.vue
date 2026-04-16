<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Mobile Overlay -->
    <div 
      v-if="sidebarOpen" 
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    ></div>
    
    <!-- Sidebar -->
    <div 
      class="fixed lg:relative z-50 transition-transform duration-300 lg:transform-none"
      :class="[
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
      ]"
    >
      <AdminSidebar :isCollapsed="sidebarCollapsed" @toggle="handleSidebarToggle" @link-click="handleLinkClick" />
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#081225]">
      <AdminHeader v-model="searchQuery" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

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
              @click="openAddModal"
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
        <div>
          <div class="xl:col-span-2">
            <ProductsTable :products="filteredProducts" :pagination="pagination" @edit="editProduct" @delete="deleteProduct" @page-change="handlePageChange" />
          </div>

          
        </div>
        <div v-if="error" class="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">{{ error }}</div>
      </div>
    </main>

    <!-- Add/Edit Product Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-midnight rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        <form class="p-6 space-y-4" @submit.prevent="submitProductForm">
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Product Name</label>
            <input v-model="newProduct.name" type="text" required placeholder="e.g. Minimalist Lamp" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">SKU</label>
            <input v-model="newProduct.sku" type="text" :required="!isEditMode" placeholder="SKU-001" :disabled="isEditMode" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white disabled:opacity-50" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Description</label>
            <textarea v-model="newProduct.description" rows="3" placeholder="Brief details..." class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Price (FCFA)</label>
              <input v-model="newProduct.price" type="number" min="0" step="0.01" required placeholder="0.00" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Category</label>
              <select v-model="newProduct.category" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white">
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Beauty</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Stock Status</label>
            <select v-model="newProduct.status" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white">
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Image Upload</label>
            <input type="file" @change="onImageSelected" accept="image/*" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" />
            <div v-if="newProduct.previewImage || newProduct.image" class="mt-2">
              <img :src="newProduct.previewImage || newProduct.image" alt="Preview" class="h-20 rounded-lg object-cover border border-slate-200" />
            </div>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="button" @click="closeModal" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Cancel</button>
            <button type="submit" class="flex-1 px-4 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-all">{{ isEditMode ? 'Update Product' : 'Add Product' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-midnight rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <span class="material-symbols-outlined text-2xl text-red-600 dark:text-red-400">warning</span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white text-center mb-2">Confirm Delete</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 text-center mb-6">
          Are you sure you want to delete <span class="font-semibold text-slate-900 dark:text-white">"{{ productToDelete?.name }}"</span>? This action cannot be undone.
        </p>
        <div class="flex gap-3">
          <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Cancel</button>
          <button @click="confirmDelete" class="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition-all">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AdminHeader from '../components/admin/AdminHeader.vue'
import StatsCard from '../components/admin/StatsCard.vue'
import ProductsTable from '../components/admin/ProductsTable.vue'

import { ref, computed, onMounted } from 'vue'
import { getApiUrl } from '../utils/api'

const searchQuery = ref('')
const products = ref([])
const isLoading = ref(false)
const error = ref('')
const sidebarCollapsed = ref(false)
const currentPage = ref(1)
const paginationInfo = ref({ page: 1, limit: 10, total: 0, totalPages: 0, from: 1, to: 10 })
const sidebarOpen = ref(false)

const handleSidebarToggle = (type) => {
  if (type === 'mobile') {
    sidebarOpen.value = false
  } else {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
}

const handleLinkClick = () => {
  // Fermer le sidebar en mobile quand on clique sur un lien
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
}

// Modal state
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditMode = ref(false)
const editingProductId = ref(null)
const productToDelete = ref(null)
const newProduct = ref({
  name: '',
  sku: '',
  description: '',
  price: '',
  category: 'Electronics',
  status: 'In Stock',
  imageFile: null,
  previewImage: '',
  image: ''
})

const closeModal = () => {
  showModal.value = false
  isEditMode.value = false
  editingProductId.value = null
  // Reset form
  newProduct.value = {
    name: '',
    sku: '',
    description: '',
    price: '',
    category: 'Electronics',
    status: 'In Stock',
    imageFile: null,
    previewImage: '',
    image: ''
  }
}

const openAddModal = () => {
  isEditMode.value = false
  editingProductId.value = null
  newProduct.value = {
    name: '',
    sku: '',
    description: '',
    price: '',
    category: 'Electronics',
    status: 'In Stock',
    imageFile: null,
    previewImage: '',
    image: ''
  }
  showModal.value = true
}

const cancelEdit = () => {
  isEditMode.value = false
  editingProductId.value = null
  newProduct.value = {
    name: '',
    sku: '',
    description: '',
    price: '',
    category: 'Electronics',
    status: 'In Stock',
    imageFile: null,
    previewImage: '',
    image: ''
  }
}

const onImageSelected = (event) => {
  const file = event.target.files[0]
  if (!file) return
  newProduct.value.imageFile = file
  newProduct.value.previewImage = URL.createObjectURL(file)
}

const submitProductForm = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const form = new FormData()
    form.append('name', newProduct.value.name)
    form.append('sku', newProduct.value.sku)
    form.append('description', newProduct.value.description || '')
    form.append('category', newProduct.value.category)
    form.append('price', newProduct.value.price)
    form.append('status', newProduct.value.status)
    
    // Handle image - send new file if uploaded, otherwise keep existing
    if (newProduct.value.imageFile) {
      form.append('image', newProduct.value.imageFile)
    } else if (newProduct.value.image) {
      // Keep existing image URL
      form.append('image', newProduct.value.image)
    }

    let res
    let data

    if (isEditMode.value) {
      // Update existing product
      res = await fetch(getApiUrl(`/products/${editingProductId.value}`), {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Impossible de modifier le produit')
      const idx = products.value.findIndex((p) => p._id === editingProductId.value)
      if (idx > -1) products.value[idx] = data.product
    } else {
      // Create new product
      res = await fetch(getApiUrl('/products'), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Impossible de créer le produit')
      products.value.unshift(data.product)
    }
    
    updateStats()
    closeModal()
  } catch (err) {
    error.value = err.message
  }
}

const stats = ref([
  { icon: 'inventory_2', title: 'Total Products', value: '0', change: '+0.0%', iconClass: 'bg-blue-500/10 text-blue-500', changeClass: 'text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-lg' },
  { icon: 'check_circle', title: 'Active Listings', value: '0', change: '+0.0%', iconClass: 'bg-forest/10 flex items-center justify-center text-forest dark:text-sage', changeClass: 'text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-lg' },
  { icon: 'block', title: 'Out of Stock', value: '0', change: '-0%', iconClass: 'bg-red-500/10 flex items-center justify-center text-red-500', changeClass: 'text-red-500 text-xs font-bold bg-red-500/10 px-2 py-1 rounded-lg' },
])

const fetchProducts = async (page = 1) => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('adminToken')
    const res = await fetch(getApiUrl(`/products?page=${page}&limit=10`), { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    isLoading.value = false
    if (!res.ok) {
      throw new Error(data.error || 'Impossible de charger les produits')
    }
    products.value = data.products
    paginationInfo.value = data.pagination
    currentPage.value = page
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

const deleteProduct = (item) => {
  productToDelete.value = item
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const res = await fetch(getApiUrl(`/products/${productToDelete.value._id}`), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Impossible de supprimer le produit')
    products.value = products.value.filter((p) => p._id !== productToDelete.value._id)
    updateStats()
    showDeleteModal.value = false
    productToDelete.value = null
  } catch (err) {
    error.value = err.message
  }
}

const editProduct = (item) => {
  isEditMode.value = true
  editingProductId.value = item._id
  newProduct.value = {
    name: item.name || '',
    sku: item.sku || '',
    description: item.description || '',
    price: item.price || '',
    category: item.category || 'Electronics',
    status: item.status || 'In Stock',
    imageFile: null,
    previewImage: '',
    image: item.image || ''
  }
  showModal.value = true
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

// Handle page change from ProductsTable component
const handlePageChange = (page) => {
  fetchProducts(page)
}

const pagination = computed(() => {
  return paginationInfo.value
})

</script>
