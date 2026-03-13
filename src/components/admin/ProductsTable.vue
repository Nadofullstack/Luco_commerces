<template>
  <div
    class="xl:col-span-2 bg-white dark:bg-midnight rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col"
  >
    <div
      class="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4"
    >
      <h3 class="font-bold text-lg text-slate-900 dark:text-white">Inventory Overview</h3>
      <div class="flex items-center gap-2">
        <div class="relative">
          <span
            class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
            >filter_list</span
          >
          <select
            v-model="selectedCategory"
            class="pl-9 pr-8 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 focus:ring-primary appearance-none"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home Decor">Home Decor</option>
          </select>
        </div>
        <button class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white">
          <span class="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead
          class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider font-bold"
        >
          <tr>
            <th class="px-6 py-4">Product</th>
            <th class="px-6 py-4">Category</th>
            <th class="px-6 py-4">Price</th>
            <th class="px-6 py-4">Stock Status</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody v-if="filteredProducts.length" class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr
            v-for="item in filteredProducts"
            :key="item.sku"
            class="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img 
                    :src="item.image" 
                    :alt="item.name" 
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ item.name }}</p>
                  <p class="text-[11px] text-slate-500">SKU: {{ item.sku }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
              {{ item.category }}
            </td>
            <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
              {{ formatPrice(item.price) }}
            </td>
            <td class="px-6 py-4">
              <span
                :class="getStatusClass(item.status)"
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase"
              >
                <span :class="getStatusDotClass(item.status)" class="w-1.5 h-1.5 rounded-full"></span>
                {{ item.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button 
                  @click="$emit('edit', item)"
                  class="p-1.5 text-slate-400 hover:text-blue-500 transition-colors"
                  :title="`Edit ${item.name}`"
                >
                  <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button 
                  @click="$emit('delete', item)"
                  class="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                  :title="`Delete ${item.name}`"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
             <div v-else class="p-8 text-center text-slate-500 dark:text-slate-400">
        <p>No products to display</p>
      </div>
      </table>
      
 
    </div>
    
    <div
      class="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-white/5 flex items-center justify-between"
    >
      <p class="text-xs text-slate-500">
        Showing <span class="font-bold">{{ pagination.from }}-{{ pagination.to }}</span> of
        <span class="font-bold">{{ pagination.total }}</span> products
      </p>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="p-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="material-symbols-outlined text-sm leading-none">chevron_left</span>
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="p-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="material-symbols-outlined text-sm leading-none">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  products: {
    type: Array,
    default: () => [
      {
        sku: 'PRD-001',
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 299.99,
        status: 'In Stock',
        image: 'https://via.placeholder.com/40',
      },
      {
        sku: 'PRD-002',
        name: 'Leather Jacket',
        category: 'Fashion',
        price: 599.99,
        status: 'Low Stock',
        image: 'https://via.placeholder.com/40',
      },
      {
        sku: 'PRD-003',
        name: 'Minimalist Watch',
        category: 'Fashion',
        price: 249.99,
        status: 'Out of Stock',
        image: 'https://via.placeholder.com/40',
      },
      {
        sku: 'PRD-004',
        name: 'Table Lamp',
        category: 'Home Decor',
        price: 89.99,
        status: 'In Stock',
        image: 'https://via.placeholder.com/40',
      },
    ],
  },
  pagination: {
    type: Object,
    default: () => ({ from: 1, to: 4, total: 2845 }),
  },
})

// Émits
const emit = defineEmits(['edit', 'delete', 'page-change', 'filter-change'])

// État local
const selectedCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 4

// Computed pour les produits filtrés
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return props.products
  }
  return props.products.filter(p => p.category === selectedCategory.value)
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(props.pagination.total / itemsPerPage)
})

// Méthodes
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const getStatusClass = (status) => {
  const classes = {
    'In Stock': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    'Low Stock': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    'Out of Stock': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    'On Sale': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
  }
  return classes[status] || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
}

const getStatusDotClass = (status) => {
  const classes = {
    'In Stock': 'bg-green-500',
    'Low Stock': 'bg-yellow-500',
    'Out of Stock': 'bg-red-500',
    'On Sale': 'bg-blue-500'
  }
  return classes[status] || 'bg-slate-500'
}

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/40'
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emit('page-change', currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    emit('page-change', currentPage.value)
  }
}

// Watcher pour le changement de catégorie
watch(selectedCategory, (newValue) => {
  emit('filter-change', newValue)
  currentPage.value = 1
})
</script>

<style scoped>
/* Optionnel : pour améliorer l'apparence du select */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;
  padding-right: 2rem;
}
</style>