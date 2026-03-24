/**
 * Service API pour les appels backend admin
 * Gère automatiquement l'authentification et les erreurs
 */

const API_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Récupère le token admin depuis le localStorage
 */
const getAdminToken = () => {
  return localStorage.getItem('adminToken')
}

/**
 * Récupère les informations de l'admin
 */
const getAdminUser = () => {
  const userStr = localStorage.getItem('adminUser')
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
  return null
}

/**
 * Déconnecte l'admin
 */
const logout = () => {
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminUser')
  window.location.href = '/admin/login'
}

/**
 * Vérifie si l'admin est connecté
 */
const isAuthenticated = () => {
  return !!getAdminToken()
}

/**
 * Méthode fetch wrapper qui ajoute automatiquement le token admin
 */
const authenticatedFetch = async (endpoint, options = {}) => {
  const token = getAdminToken()
  
  if (!token) {
    logout()
    throw new Error('Non authentifié')
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    })
    
    // Si token expiré ou invalide
    if (response.status === 401) {
      const data = await response.json()
      if (data.message?.includes('expiré') || data.message?.includes('Token')) {
        console.warn('[API] Token expiré ou invalide, déconnexion...')
        logout()
      }
      throw new Error(data.message || 'Non autorisé')
    }
    
    if (response.status === 403) {
      throw new Error('Accès refusé')
    }
    
    return response
  } catch (error) {
    if (error.message === 'Non authentifié' || error.name === 'TypeError') {
      logout()
    }
    throw error
  }
}

// API Admin - Produits
const products = {
  getAll: async () => {
    const res = await authenticatedFetch('/products')
    return res.json()
  },
  
  getById: async (id) => {
    const res = await authenticatedFetch(`/products/${id}`)
    return res.json()
  },
  
  create: async (productData) => {
    // Pour les requêtes avec fichier (multipart/form-data)
    const token = getAdminToken()
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: productData // productData doit être un FormData
    })
    return response.json()
  },
  
  update: async (id, productData) => {
    const token = getAdminToken()
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: productData
    })
    return response.json()
  },
  
  delete: async (id) => {
    const res = await authenticatedFetch(`/products/${id}`, {
      method: 'DELETE'
    })
    return res.json()
  }
}

// API Admin - Commandes
const orders = {
  getAll: async () => {
    const res = await authenticatedFetch('/orders')
    return res.json()
  },
  
  getById: async (id) => {
    const res = await authenticatedFetch(`/orders/${id}`)
    return res.json()
  },
  
  update: async (id, orderData) => {
    const res = await authenticatedFetch(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData)
    })
    return res.json()
  }
}

// API Admin - Clients
const customers = {
  getAll: async () => {
    const res = await authenticatedFetch('/customers')
    return res.json()
  },
  
  getById: async (id) => {
    const res = await authenticatedFetch(`/customers/${id}`)
    return res.json()
  },
  
  delete: async (id) => {
    const res = await authenticatedFetch(`/customers/${id}`, {
      method: 'DELETE'
    })
    return res.json()
  }
}

export {
  API_URL,
  getAdminToken,
  getAdminUser,
  logout,
  isAuthenticated,
  authenticatedFetch,
  products,
  orders,
  customers
}

export default {
  API_URL,
  getAdminToken,
  getAdminUser,
  logout,
  isAuthenticated,
  authenticatedFetch,
  products,
  orders,
  customers
}
