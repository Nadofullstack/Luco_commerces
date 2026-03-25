/**
 * Configuration de l'URL de l'API
 * Utilise la variable d'environnement VITE_API_URL ou '/api' par défaut
 */
export const API_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Helper pour construire une URL complète vers l'API
 * @param {string} endpoint - Le endpoint de l'API (ex: '/products')
 * @returns {string} L'URL complète
 */
export const getApiUrl = (endpoint) => {
  // S'assurer que l'endpoint commence par /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${API_URL}${cleanEndpoint}`
}

export default {
  API_URL,
  getApiUrl
}
