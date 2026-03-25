<template>
  <div class="flex h-screen overflow-hidden">
    <AdminSidebar />

    <main class="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#081225]">
      <AdminHeader v-model="searchQuery" />
      
      <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div class="max-w-7xl mx-auto space-y-8">
          <!-- Header Section -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Customer Management</h2>
              <p class="text-slate-500 dark:text-slate-400 text-sm">
                Manage all registered customers and their information.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button
                class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                <span class="material-symbols-outlined text-lg">file_download</span>
                Export
              </button>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard 
              icon="group" 
              title="Total Customers" 
              :value="customers.length.toString()" 
              change="+12%" 
              iconClass="bg-blue-500/10 text-blue-500"
              changeClass="text-emerald-500 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-lg"
            />
            <StatsCard 
              icon="person_add" 
              title="New This Month" 
              :value="newCustomersThisMonth.toString()" 
              change="Active" 
              iconClass="bg-green-500/10 text-green-500"
              changeClass="text-green-500 text-xs font-bold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg"
            />
            <StatsCard 
              icon="shopping_cart" 
              title="Total Orders" 
              :value="totalOrders.toString()" 
              change="+8%" 
              iconClass="bg-purple-500/10 text-purple-500"
              changeClass="text-emerald-500 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-lg"
            />
            <StatsCard 
              icon="payments" 
              title="Total Revenue" 
              :value="formatPrice(totalRevenue)" 
              change="+15%" 
              iconClass="bg-primary/20 text-primary"
              changeClass="text-emerald-500 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-lg"
            />
          </div>

          <!-- Customers Table -->
          <div class="bg-white dark:bg-midnight rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-200 dark:border-slate-800">
              <h3 class="font-bold text-lg text-slate-900 dark:text-white">All Customers</h3>
            </div>
            
            <!-- Search & Filter -->
            <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4">
              <div class="flex-1 min-w-[200px]">
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Search customers..." 
                    class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <select v-model="statusFilter" class="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                  <tr>
                    <th class="px-6 py-4">Customer</th>
                    <th class="px-6 py-4">Contact</th>
                    <th class="px-6 py-4">Location</th>
                    <th class="px-6 py-4">Orders</th>
                    <th class="px-6 py-4">Total Spent</th>
                    <th class="px-6 py-4">Status</th>
                    <th class="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr 
                    v-for="customer in filteredCustomers" 
                    :key="customer._id"
                    class="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span class="text-primary font-bold text-sm">{{ getInitials(customer.name) }}</span>
                        </div>
                        <div>
                          <p class="text-sm font-bold text-slate-900 dark:text-white">{{ customer.name }}</p>
                          <p class="text-[11px] text-slate-500">Since {{ formatDate(customer.createdAt) }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <p class="text-sm text-slate-600 dark:text-slate-400">{{ customer.email }}</p>
                      <p class="text-[11px] text-slate-500">{{ customer.phone || 'No phone' }}</p>
                    </td>
                    <td class="px-6 py-4">
                      <p class="text-sm text-slate-600 dark:text-slate-400">
                        {{ customer.address?.city || 'N/A' }}, {{ customer.address?.country || '' }}
                      </p>
                    </td>
                    <td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {{ customer.ordersCount || 0 }}
                    </td>
                    <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                      {{ formatPrice(customer.totalSpent || 0) }}
                    </td>
                    <td class="px-6 py-4">
                      <span 
                        :class="customer.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'"
                        class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold uppercase"
                      >
                        {{ customer.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button 
                          @click="viewCustomer(customer)"
                          class="p-1.5 text-slate-400 hover:text-primary transition-colors"
                          title="View Details"
                        >
                          <span class="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button 
                          @click="editCustomer(customer)"
                          class="p-1.5 text-slate-400 hover:text-blue-500 transition-colors"
                          title="Edit"
                        >
                          <span class="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button 
                          @click="deleteCustomer(customer)"
                          class="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <span class="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Empty State -->
            <div v-if="!filteredCustomers.length" class="p-8 text-center text-slate-500 dark:text-slate-400">
              <span class="material-symbols-outlined text-4xl mb-2">person_off</span>
              <p>No customers found</p>
            </div>

            <!-- Pagination -->
            <div class="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <p class="text-sm text-slate-500">
                Showing {{ filteredCustomers.length }} of {{ customers.length }} customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- View/Edit Customer Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-midnight rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            {{ isEditMode ? 'Edit Customer' : 'Customer Details' }}
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600">
            <span class="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        <form class="p-6 space-y-4" @submit.prevent="saveCustomer">
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Full Name</label>
            <input v-model="customerForm.name" type="text" required class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Email</label>
            <input v-model="customerForm.email" type="email" disabled class="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 opacity-50" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Phone</label>
            <input v-model="customerForm.phone" type="tel" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">City</label>
              <input v-model="customerForm.city" type="text" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Country</label>
              <input v-model="customerForm.country" type="text" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Status</label>
            <select v-model="customerForm.isActive" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-primary focus:border-primary">
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="button" @click="closeModal" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100">Cancel</button>
            <button type="submit" class="flex-1 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-blue-600">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-midnight rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <span class="material-symbols-outlined text-2xl text-red-600">warning</span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white text-center mb-2">Confirm Delete</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 text-center mb-6">
          Are you sure you want to delete <span class="font-semibold">"{{ customerToDelete?.name }}"</span>? This action cannot be undone.
        </p>
        <div class="flex gap-3">
          <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold">Cancel</button>
          <button @click="confirmDelete" class="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AdminHeader from '../components/admin/AdminHeader.vue'
import StatsCard from '../components/admin/StatsCard.vue'
import { ref, computed, onMounted } from 'vue'
import { getApiUrl } from '../utils/api'

const searchQuery = ref('')
const statusFilter = ref('all')
const customers = ref([])
const isLoading = ref(false)
const error = ref('')
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditMode = ref(false)
const customerToDelete = ref(null)
const customerForm = ref({
  _id: '',
  name: '',
  email: '',
  phone: '',
  city: '',
  country: '',
  isActive: true
})

const newCustomersThisMonth = computed(() => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  return customers.value.filter(c => new Date(c.createdAt) >= startOfMonth).length
})

const totalOrders = computed(() => {
  return customers.value.reduce((sum, c) => sum + (c.ordersCount || 0), 0)
})

const totalRevenue = computed(() => {
  return customers.value.reduce((sum, c) => sum + (c.totalSpent || 0), 0)
})

const filteredCustomers = computed(() => {
  let list = customers.value
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c => 
      c.name?.toLowerCase().includes(q) || 
      c.email?.toLowerCase().includes(q)
    )
  }
  
  if (statusFilter.value !== 'all') {
    const isActive = statusFilter.value === 'active'
    list = list.filter(c => c.isActive === isActive)
  }
  
  return list
})

const fetchCustomers = async () => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('adminToken')
    const res = await fetch(getApiUrl('/customers'), { 
      headers: { Authorization: `Bearer ${token}` } 
    })
    const data = await res.json()
    isLoading.value = false
    if (!res.ok) throw new Error(data.error || 'Failed to load customers')
    customers.value = data.customers
  } catch (err) {
    isLoading.value = false
    error.value = err.message
  }
}

const getInitials = (name) => {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  })
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price || 0)
}

const viewCustomer = (customer) => {
  isEditMode.value = false
  customerForm.value = {
    _id: customer._id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    city: customer.address?.city || '',
    country: customer.address?.country || '',
    isActive: customer.isActive
  }
  showModal.value = true
}

const editCustomer = (customer) => {
  isEditMode.value = true
  customerForm.value = {
    _id: customer._id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    city: customer.address?.city || '',
    country: customer.address?.country || '',
    isActive: customer.isActive
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  customerForm.value = {
    _id: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    isActive: true
  }
}

const saveCustomer = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const res = await fetch(`/api/customers/${customerForm.value._id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({
        name: customerForm.value.name,
        phone: customerForm.value.phone,
        address: {
          city: customerForm.value.city,
          country: customerForm.value.country
        },
        isActive: customerForm.value.isActive
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to update customer')
    
    const idx = customers.value.findIndex(c => c._id === customerForm.value._id)
    if (idx > -1) customers.value[idx] = data.customer
    closeModal()
  } catch (err) {
    error.value = err.message
  }
}

const deleteCustomer = (customer) => {
  customerToDelete.value = customer
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const res = await fetch(`/api/customers/${customerToDelete.value._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to delete customer')
    customers.value = customers.value.filter(c => c._id !== customerToDelete.value._id)
    showDeleteModal.value = false
    customerToDelete.value = null
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchCustomers)
</script>
