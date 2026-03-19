/**
 * Service WhatsApp pour le frontend de Luco Commerce
 * Gère les interactions avec l'API backend pour générer des liens WhatsApp
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Appelle l'API backend pour générer un lien WhatsApp
 * @param {string} message - Message pré-rempli
 * @param {string} product - Nom du produit (optionnel)
 * @param {string} customer - Nom du client (optionnel)
 * @returns {Promise<{success: boolean, whatsappUrl?: string, error?: string}>}
 */
const getWhatsAppLink = async (message = '', product = '', customer = '') => {
  try {
    const params = new URLSearchParams()
    
    if (message) {
      params.append('message', message)
    }
    if (product) {
      params.append('product', product)
    }
    if (customer) {
      params.append('customer', customer)
    }

    const url = `${API_URL}/contact/whatsapp?${params.toString()}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Erreur lors de la génération du lien WhatsApp')
    }

    return {
      success: true,
      whatsappUrl: data.whatsappUrl
    }
  } catch (error) {
    console.error('[WhatsAppService] Erreur:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Ouvre WhatsApp dans un nouvel onglet avec un message pré-rempli
 * @param {string} message - Message à envoyer
 * @param {string} product - Nom du produit (optionnel)
 * @param {string} customer - Nom du client (optionnel)
 */
const openWhatsApp = async (message = '', product = '', customer = '') => {
  try {
    const result = await getWhatsAppLink(message, product, customer)
    
    if (result.success && result.whatsappUrl) {
      window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer')
      return { success: true }
    }
    
    // Fallback: si l'API échoue, utiliser un lien direct
    if (!result.success) {
      console.warn('[WhatsAppService] Utilisation du fallback WhatsApp')
      const fallbackUrl = generateFallbackWhatsAppLink(message)
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer')
      return { success: true, fallback: true }
    }
    
    return { success: false, error: result.error }
  } catch (error) {
    console.error('[WhatsAppService] Erreur lors de l\'ouverture de WhatsApp:', error)
    // Fallback en cas d'erreur
    const fallbackUrl = generateFallbackWhatsAppLink(message)
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer')
    return { success: true, fallback: true }
  }
}

/**
 * Génère un lien WhatsApp direct (fallback si l'API échoue)
 * @param {string} message - Message à envoyer
 * @returns {string} URL WhatsApp
 */
const generateFallbackWhatsAppLink = (message) => {
  // Numéro par défaut ( fallback ) - peut être configuré via les variables d'environnement
  const defaultPhone = import.meta.env.VITE_WHATSAPP_NUMBER || '22967475658'
  const encodedMessage = encodeURIComponent(message || 'Bonjour, je souhaite obtenir des informations sur vos produits.')
  return `https://wa.me/${defaultPhone}?text=${encodedMessage}`
}

/**
 * Formate un message pour une commande
 * @param {Object} order - Objet commande
 * @param {string} customMessage - Message personnalisé additionnel (optionnel)
 * @returns {string} Message formaté
 */
const generateOrderMessage = (order, customMessage = '') => {
  const orderNumber = order?.orderNumber || order?._id?.slice(-8).toUpperCase() || 'N/A'
  
  let message = `Bonjour, j'ai une question concernant ma commande #${orderNumber}`
  
  if (customMessage) {
    message += `. ${customMessage}`
  }
  
  return message
}

/**
 * Formate un message pour une demande d'information sur un produit
 * @param {Object} product - Objet produit
 * @param {string} customMessage - Message personnalisé additionnel (optionnel)
 * @returns {string} Message formaté
 */
const generateProductInquiry = (product, customMessage = '') => {
  const productName = product?.name || 'le produit'
  const productPrice = product?.price ? `${product.price} XOF` : ''
  
  let message = `Bonjour, j'aimerais avoir plus d'informations sur: ${productName}`
  
  if (productPrice) {
    message += `\nPrix: ${productPrice}`
  }
  
  if (customMessage) {
    message += `\n\n${customMessage}`
  }
  
  return message
}

/**
 * Formate un message générique de contact
 * @param {string} topic - Sujet du message (optionnel)
 * @returns {string} Message formaté
 */
const generateContactMessage = (topic = '') => {
  if (topic) {
    return `Bonjour, j'aimerais obtenir des informations concernant: ${topic}`
  }
  return 'Bonjour, j\'aimerais obtenir des informations sur vos produits.'
}

export default {
  getWhatsAppLink,
  openWhatsApp,
  generateOrderMessage,
  generateProductInquiry,
  generateContactMessage,
  generateFallbackWhatsAppLink
}
