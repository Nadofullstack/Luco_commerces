import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const API_URL = 'http://localhost:3000/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const customer = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Initialize from localStorage
  const initAuth = () => {
    const storedToken = localStorage.getItem('customerToken')
    const storedCustomer = localStorage.getItem('customer')
    
    if (storedToken) {
      token.value = storedToken
    }
    
    if (storedCustomer) {
      try {
        customer.value = JSON.parse(storedCustomer)
      } catch (e) {
        console.error('Error parsing customer from localStorage:', e)
      }
    }
  }

  // Getters
  const currentCustomer = computed(() => customer.value)
  
  const isLoggedIn = computed(() => !!token.value && !!customer.value)

  // Helper pour les requêtes API
  const apiRequest = async (endpoint, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token.value && { Authorization: `Bearer ${token.value}` }),
      ...options.headers
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Une erreur est survenue')
    }
    
    return data
  }

  // Actions
  
  // Login
  async function login(email, password) {
    loading.value = true
    error.value = null
    
    try {
      const data = await apiRequest('/customers/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      
      // Save token and customer
      token.value = data.token
      customer.value = data.customer
      
      // Persist to localStorage
      localStorage.setItem('customerToken', data.token)
      localStorage.setItem('customer', JSON.stringify(data.customer))
      
      return { success: true, message: data.message }
    } catch (e) {
      error.value = e.message
      return { success: false, message: e.message }
    } finally {
      loading.value = false
    }
  }

  // Register
  async function register(customerData) {
    loading.value = true
    error.value = null
    
    try {
      const data = await apiRequest('/customers/register', {
        method: 'POST',
        body: JSON.stringify(customerData)
      })
      
      return { success: true, message: data.message }
    } catch (e) {
      error.value = e.message
      return { success: false, message: e.message }
    } finally {
      loading.value = false
    }
  }

  // Logout
  function logout() {
    token.value = null
    customer.value = null
    localStorage.removeItem('customerToken')
    localStorage.removeItem('customer')
  }

  // Fetch profile
  async function fetchProfile() {
    if (!customer.value?._id) {
      return { success: false, message: 'Aucun client connecté' }
    }
    
    loading.value = true
    error.value = null
    
    try {
      const data = await apiRequest(`/customers/${customer.value._id}`)
      customer.value = data.customer
      localStorage.setItem('customer', JSON.stringify(data.customer))
      return { success: true }
    } catch (e) {
      error.value = e.message
      return { success: false, message: e.message }
    } finally {
      loading.value = false
    }
  }

  // Update profile
  async function updateProfile(data) {
    if (!customer.value?._id) {
      return { success: false, message: 'Aucun client connecté' }
    }
    
    loading.value = true
    error.value = null
    
    try {
      const result = await apiRequest(`/customers/${customer.value._id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      
      customer.value = result.customer
      localStorage.setItem('customer', JSON.stringify(result.customer))
      
      return { success: true, message: 'Profil mis à jour avec succès' }
    } catch (e) {
      error.value = e.message
      return { success: false, message: e.message }
    } finally {
      loading.value = false
    }
  }

  // Fetch orders
  async function fetchOrders() {
    if (!customer.value?.email) {
      return { success: false, message: 'Aucun client connecté', orders: [] }
    }
    
    loading.value = true
    error.value = null
    
    try {
      const data = await apiRequest(`/customers/orders/${customer.value.email}`)
      return { success: true, orders: data.orders }
    } catch (e) {
      error.value = e.message
      return { success: false, message: e.message, orders: [] }
    } finally {
      loading.value = false
    }
  }

  // Initialize on store creation
  initAuth()

  return {
    // State
    customer,
    token,
    loading,
    error,
    // Getters
    currentCustomer,
    isLoggedIn,
    // Actions
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    fetchOrders,
    initAuth
  }
})
