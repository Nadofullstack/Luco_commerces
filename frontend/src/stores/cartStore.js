import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const API_URL = 'http://localhost:3000/api'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  
  // Getters
  const cartItems = computed(() => items.value)
  
  const cartItemCount = computed(() => {
    return items.value.reduce((total, item) => total + (item.quantity || 1), 0)
  })
  
  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      const price = item.product?.price || item.price || 0
      const quantity = item.quantity || 1
      return total + (price * quantity)
    }, 0)
  })
  
  const totalAmount = computed(() => cartTotal.value)
  
  // Helper pour récupérer le token
  const getToken = () => {
    return localStorage.getItem('customerToken') || localStorage.getItem('token')
  }
  
  // Helper pour les requêtes API
  const apiRequest = async (endpoint, options = {}) => {
    const token = getToken()
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
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
  
  // Charger le panier depuis le localStorage (fallback pour utilisateurs non connectés)
  const loadLocalCart = () => {
    try {
      const localCart = localStorage.getItem('luco_local_cart')
      if (localCart) {
        items.value = JSON.parse(localCart)
      }
    } catch (e) {
      console.error('Error loading local cart:', e)
    }
  }
  
  // Sauvegarder le panier dans le localStorage
  const saveLocalCart = () => {
    try {
      localStorage.setItem('luco_local_cart', JSON.stringify(items.value))
    } catch (e) {
      console.error('Error saving local cart:', e)
    }
  }
  
  // Actions
  
  // Récupérer le panier (API)
  async function fetchCart() {
    const token = getToken()
    
    // Si pas de token, charger depuis localStorage
    if (!token) {
      loadLocalCart()
      return
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const data = await apiRequest('/cart')
      if (data.cart && data.cart.items) {
        items.value = data.cart.items
      }
    } catch (e) {
      error.value = e.message
      // Fallback vers localStorage en cas d'erreur
      loadLocalCart()
    } finally {
      isLoading.value = false
    }
  }
  
  // Ajouter un produit au panier
  async function addToCart(product, quantity = 1) {
    const token = getToken()
    
    // Si pas de token, utiliser localStorage
    if (!token) {
      const existingIndex = items.value.findIndex(
        item => item.product?._id === product._id || item.product === product._id
      )
      
      if (existingIndex > -1) {
        items.value[existingIndex].quantity += quantity
      } else {
        items.value.push({
          product: product,
          quantity: quantity,
          price: product.price
        })
      }
      
      saveLocalCart()
      return { success: true, message: 'Produit ajouté au panier' }
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const data = await apiRequest('/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          productId: product._id || product.id,
          quantity
        })
      })
      
      if (data.cart && data.cart.items) {
        items.value = data.cart.items
      }
      
      return { success: true, message: data.message || 'Produit ajouté au panier' }
    } catch (e) {
      error.value = e.message
      return { success: false, message: e.message }
    } finally {
      isLoading.value = false
    }
  }
  
  // Supprimer un produit du panier
  async function removeFromCart(productId) {
    const token = getToken()
    
    // Si pas de token, utiliser localStorage
    if (!token) {
      items.value = items.value.filter(
        item => item.product?._id !== productId && item.product !== productId
      )
      saveLocalCart()
      return { success: true, message: 'Produit supprimé du panier' }
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const data = await apiRequest(`/cart/remove/${productId}`, {
        method: 'DELETE'
      })
      
      if (data.cart && data.cart.items) {
        items.value = data.cart.items
      }
      
      return { success: true, message: data.message || 'Produit supprimé du panier' }
    } catch (e) {
      error.value = e.message
      return { success: false, message: e.message }
    } finally {
      isLoading.value = false
    }
  }
  
  // Mettre à jour la quantité
  async function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      return removeFromCart(productId)
    }
    
    const token = getToken()
    
    // Si pas de token, utiliser localStorage
    if (!token) {
      const item = items.value.find(
        item => item.product?._id === productId || item.product === productId
      )
      if (item) {
        item.quantity = quantity
        saveLocalCart()
      }
      return { success: true, message: 'Quantité mise à jour' }
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const data = await apiRequest('/cart/update', {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity })
      })
      
      if (data.cart && data.cart.items) {
        items.value = data.cart.items
      }
      
      return { success: true, message: data.message || 'Quantité mise à jour' }
    } catch (e) {
      error.value = e.message
      return { success: false, message: e.message }
    } finally {
      isLoading.value = false
    }
  }
  
  // Vider le panier
  async function clearCart() {
    const token = getToken()
    
    // Si pas de token, utiliser localStorage
    if (!token) {
      items.value = []
      saveLocalCart()
      return { success: true, message: 'Panier vidé' }
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      await apiRequest('/cart/clear', {
        method: 'DELETE'
      })
      
      items.value = []
      
      return { success: true, message: 'Panier vidé' }
    } catch (e) {
      error.value = e.message
      return { success: false, message: e.message }
    } finally {
      isLoading.value = false
    }
  }
  
  // Synchroniser le panier local avec le serveur (lors de la connexion)
  async function syncCartWithServer() {
    const token = getToken()
    if (!token || items.value.length === 0) {
      await fetchCart()
      return
    }
    
    // Ajouter chaque item au serveur
    for (const item of items.value) {
      const productId = item.product?._id || item.product
      if (productId) {
        try {
          await apiRequest('/cart/add', {
            method: 'POST',
            body: JSON.stringify({
              productId,
              quantity: item.quantity
            })
          })
        } catch (e) {
          console.error('Error syncing item:', e)
        }
      }
    }
    
    // Récupérer le panier fusionné
    await fetchCart()
    
    // Vider le localStorage
    localStorage.removeItem('luco_local_cart')
  }
  
  return {
    // State
    items,
    isLoading,
    error,
    // Getters
    cartItems,
    cartItemCount,
    cartTotal,
    totalAmount,
    // Actions
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    syncCartWithServer,
    loadLocalCart,
    saveLocalCart
  }
})
