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
          <ProductsTable :products="filteredProducts" :pagination="pagination" />

          <div class="space-y-6">
            <QuickAddProduct />
            <InsightsCard />
          </div>
        </div>
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
import { ref, computed } from 'vue'

const searchQuery = ref('')

const stats = ref([
  {
    icon: 'inventory_2',
    title: 'Total Products',
    value: '2,845',
    change: '+4.2%',
    iconClass: 'bg-blue-500/10 text-blue-500',
    changeClass: 'text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-lg',
  },
  {
    icon: 'check_circle',
    title: 'Active Listings',
    value: '2,798',
    change: '+1.8%',
    iconClass: 'bg-forest/10 flex items-center justify-center text-forest dark:text-sage',
    changeClass: 'text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-lg',
  },
  {
    icon: 'block',
    title: 'Out of Stock',
    value: '47',
    change: '-24%',
    iconClass: 'bg-red-500/10 flex items-center justify-center text-red-500',
    changeClass: 'text-red-500 text-xs font-bold bg-red-500/10 px-2 py-1 rounded-lg',
  },
])

const products = ref([
  {
    name: 'Luxe Horizon Watch',
    sku: 'LUX-4921',
    category: 'Accessories',
    price: '$249.00',
    status: 'In Stock',
    statusClass: 'bg-primary/10 text-primary',
    statusDotClass: 'bg-primary',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDy6XNQK3tafoh0KrDrS3FQIphWvfQs7IcBtXBrGVuf1PdS8ApGlqKXDJIW2Ga2UTQayrzr-GecsAIcZq3fw43w2GLKe7Nem8h_1qv6A5kzrZd6egaGYFNb5gHRhZpr4MKw_3hW-SwiOMYtqnj-5LG5ohvms1KIOSV7V-pAyxMaNn-gq5GrMyVCnab6FJtvcS4G5VZdinzG8aLy2BjBnxFxpkUNgYrrFyB7W4jVsEvvHEUwLGrgBcqWdlMTIn1naDBLqp9CcKNG3S8c',
  },
  {
    name: 'Aura Wireless Pods',
    sku: 'LUX-8832',
    category: 'Electronics',
    price: '$399.00',
    status: 'Low Stock',
    statusClass: 'bg-orange-500/10 text-orange-500',
    statusDotClass: 'bg-orange-500',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAv__LxIcxcKfVH1EsUgC2vVjWDUT9nmFtN9duNm4siYFHjv6ii0gyMMVWqPHNKWryJITqfqg6uPepzYu5qelNG7a9A6Z6i__haaKTYjLs5Q1QBODReth1UNkliHfy61WlAtigIJL8CzItju-qXoBO-IlftdKqEUU6e7hNT-I9y5fsIV1X_N231RrFN_TOjYpIhFQkwgTuq8nHmewGTJiGwAQDQiWgaoJECqaT-AIOMFHxlAuCo-eqt5fEAovtZEX3gX7lDqcbbSM_5',
  },
  {
    name: 'Velvet Essence Serum',
    sku: 'LUX-1029',
    category: 'Beauty',
    price: '$85.00',
    status: 'Out of Stock',
    statusClass: 'bg-red-500/10 text-red-500',
    statusDotClass: 'bg-red-500',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9C5QpaEATeK9AOnPlrZi2DAAOGec29lTpurtEb5eHBXiBqVLdex89J_AK0DqfgoDgE1Va07OJQFOezFECHULg-ddvjz9t99CleEwcOlGwcqjOVJyXSI3aq03x_-vh8mIqc4ZpT3IlKg5oD_gigaCKiLshs_GStkDitbOaDcC0gr2WYcQyWTHfylXGLFAFTms0nsDI1RYbdQmMoPisJaBIGOBdz6cc5RPiZEbYaiFKvSpueJ9PiG9FORr9NpNASvyH81zwXpehIwgI',
  },
  {
    name: 'Neo Speed Trainers',
    sku: 'LUX-7721',
    category: 'Footwear',
    price: '$155.00',
    status: 'In Stock',
    statusClass: 'bg-primary/10 text-primary',
    statusDotClass: 'bg-primary',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWJTXyvi-ybDi_MjglPmMjxqY4rDW7q0_vsy2PZG9wkOE2Slb-bNhLtkw4bGSxkbWCYCJu18GuQG2N1FHsa0ysjdgByY-NtvgsoEjaWYfvPomkD5HXfpz_okaKZHhTwxhAlSe1xlnprc9wdWYDn5_TzSlhdgq7KXXUtSihiUnJLQtvPhnijSpDIBuwlGjfRt6m4Xb1GAZeZ-WiWQqNiElGGH1FCeRzdIwZ61j_XX-PNodZIzcuWzZ_AuqyS9pTNjj0P7CW7-7BwNEJ',
  },
])

const pagination = ref({ from: 1, to: 4, total: 2845 })

const filteredProducts = computed(() => {
  let list = products.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
  }
  return list
})
</script>
