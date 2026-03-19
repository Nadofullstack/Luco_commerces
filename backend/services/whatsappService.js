/**
 * Service WhatsApp pour les notifications de l'application Luco Commerce
 * Utilise l'API URL de WhatsApp (wa.me) sans API tierce payante
 */

const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP

/**
 * Formate un numéro de téléphone pour WhatsApp (enlève les caractères non numériques)
 * @param {string} phone - Numéro de téléphone
 * @returns {string} Numéro formaté
 */
const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  // Enlever tous les caractères non numériques
  return phone.replace(/\D/g, '')
}

/**
 * Encode un message pour URL
 * @param {string} message - Message à encoder
 * @returns {string} Message encodé
 */
const encodeMessage = (message) => {
  return encodeURIComponent(message)
}

/**
 * Génère l'URL WhatsApp pour un numéro et un message donné
 * @param {string} phoneNumber - Numéro de téléphone (avec ou sans +)
 * @param {string} message - Message à envoyer
 * @returns {string} URL WhatsApp
 */
const generateWhatsAppUrl = (phoneNumber, message) => {
  const formattedPhone = formatPhoneNumber(phoneNumber)
  const encodedMessage = encodeMessage(message)
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`
}

/**
 * Formate les articles de la commande pour le message WhatsApp
 * @param {Array} items - Articles de la commande
 * @returns {string} Articles formatés
 */
const formatOrderItems = (items) => {
  if (!items || items.length === 0) return 'Aucun article'
  
  return items.map((item, index) => {
    const name = item.name || item.product?.name || 'Produit'
    const quantity = item.quantity || 1
    const price = item.price || 0
    return `${index + 1}. ${name} x${quantity} - ${price.toLocaleString('fr-FR')} XAF`
  }).join('\n')
}

/**
 * Formate le message de notification de nouvelle commande
 * @param {Object} order - Objet commande
 * @returns {string} Message formaté
 */
const formatOrderNotificationMessage = (order) => {
  const itemsList = formatOrderItems(order.items)
  
  const message = `🛒 *NOUVELLE COMMANDE - LUCO COMMERCE*
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *Détails de la commande:*
• Numéro: *${order.orderNumber}*
• Date: ${new Date(order.createdAt || Date.now()).toLocaleString('fr-FR')}

👤 *Client:*
• Nom: ${order.customer?.name || 'Non spécifié'}
• Email: ${order.customer?.email || 'Non spécifié'}
• Téléphone: ${order.customer?.phone || 'Non spécifié'}

📦 *Articles commandés:*
${itemsList}

💰 *Montant:*
• Sous-total: ${(order.subtotal || 0).toLocaleString('fr-FR')} XAF
• Livraison: ${(order.shipping || 0).toLocaleString('fr-FR')} XAF
• *Total: ${(order.total || 0).toLocaleString('fr-FR')} XAF*

💳 *Paiement:*
• Méthode: ${order.paymentMethod || 'Non spécifié'}
• Statut: ${order.paymentStatus || 'En attente'}

📍 *Adresse de livraison:*
${order.address?.street || 'Non spécifiée'}
${order.address?.city ? `${order.address.city}, ${order.address.state || ''} ${order.address.zipCode || ''}` : ''}
${order.address?.country || 'Cameroun'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
Merci de traiter cette commande rapidement!`

  return message
}

/**
 * Envoie une notification WhatsApp pour une nouvelle commande à l'admin
 * @param {Object} order - Objet commande
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
const sendNewOrderNotification = async (order) => {
  try {
    // Vérifier si le numéro admin est configuré
    if (!ADMIN_WHATSAPP) {
      console.warn('[WhatsApp] ADMIN_WHATSAPP non configuré dans les variables d\'environnement')
      return { success: false, error: 'ADMIN_WHATSAPP non configuré' }
    }

    // Formater le message
    const message = formatOrderNotificationMessage(order)
    
    // Générer l'URL WhatsApp
    const whatsappUrl = generateWhatsAppUrl(ADMIN_WHATSAPP, message)
    
    // Logger la tentative d'envoi
    console.log(`[WhatsApp] Notification de commande ${order.orderNumber} envoyée à ${ADMIN_WHATSAPP}`)
    console.log(`[WhatsApp] URL générée: ${whatsappUrl.substring(0, 100)}...`)
    
    // Retourner l'URL (le client WhatsApp sera ouvert côté client)
    return { 
      success: true, 
      url: whatsappUrl,
      message: 'Notification WhatsApp générée avec succès'
    }
  } catch (error) {
    console.error('[WhatsApp] Erreur lors de l\'envoi de la notification:', error.message)
    return { 
      success: false, 
      error: error.message 
    }
  }
}

/**
 * Génère un lien de contact WhatsApp pour le client
 * @param {string} prefillMessage - Message pré-rempli (optionnel)
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
const generateContactLink = async (prefillMessage = '') => {
  try {
    // Vérifier si le numéro admin est configuré
    if (!ADMIN_WHATSAPP) {
      console.warn('[WhatsApp] ADMIN_WHATSAPP non configuré dans les variables d\'environnement')
      return { success: false, error: 'ADMIN_WHATSAPP non configuré' }
    }

    // Message par défaut si aucun message n'est fourni
    const message = prefillMessage || 'Bonjour, je souhaite obtenir des informations sur vos produits.'
    
    // Générer l'URL WhatsApp
    const whatsappUrl = generateWhatsAppUrl(ADMIN_WHATSAPP, message)
    
    console.log(`[WhatsApp] Lien de contact généré: ${whatsappUrl.substring(0, 100)}...`)
    
    return { 
      success: true, 
      url: whatsappUrl 
    }
  } catch (error) {
    console.error('[WhatsApp] Erreur lors de la génération du lien de contact:', error.message)
    return { 
      success: false, 
      error: error.message 
    }
  }
}

/**
 * Génère un lien de contact WhatsApp avec un message personnalisé
 * @param {Object} params - Paramètres du message
 * @param {string} params.productName - Nom du produit (optionnel)
 * @param {string} params.customerName - Nom du client (optionnel)
 * @param {string} params.customMessage - Message personnalisé (optionnel)
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
const generateCustomContactLink = async ({ productName, customerName, customMessage }) => {
  try {
    if (!ADMIN_WHATSAPP) {
      return { success: false, error: 'ADMIN_WHATSAPP non configuré' }
    }

    let message = customMessage || ''
    
    // Si pas de message personnalisé, construire un message par défaut
    if (!message) {
      if (productName) {
        message = `Bonjour, je suis intéressé(e) par le produit: ${productName}`
      } else {
        message = 'Bonjour, je souhaite obtenir des informations sur vos produits.'
      }
    }

    // Ajouter le nom du client si fourni
    if (customerName && !message.includes(customerName)) {
      message = `${customerName}: ${message}`
    }

    const whatsappUrl = generateWhatsAppUrl(ADMIN_WHATSAPP, message)
    
    return { 
      success: true, 
      url: whatsappUrl 
    }
  } catch (error) {
    console.error('[WhatsApp] Erreur lors de la génération du lien personnalisé:', error.message)
    return { 
      success: false, 
      error: error.message 
    }
  }
}

module.exports = {
  sendNewOrderNotification,
  generateContactLink,
  generateCustomContactLink,
  generateWhatsAppUrl,
  formatPhoneNumber,
  formatOrderNotificationMessage
}
