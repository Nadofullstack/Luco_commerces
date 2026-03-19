const express = require('express')
const router = express.Router()
const { generateContactLink, generateCustomContactLink } = require('../services/whatsappService')

/**
 * GET /api/contact/whatsapp
 * Génère un lien WhatsApp pour le contact avec un message pré-rempli
 * Query params:
 *   - message: message personnalisé (optionnel)
 *   - product: nom du produit (optionnel)
 *   - customer: nom du client (optionnel)
 */
router.get('/whatsapp', async (req, res) => {
  try {
    const { message, product, customer } = req.query
    
    let result
    
    // Si un message personnalisé est fourni ou des paramètres de produit/client
    if (message || product || customer) {
      result = await generateCustomContactLink({
        productName: product,
        customerName: customer,
        customMessage: message
      })
    } else {
      // Message par défaut
      result = await generateContactLink('Bonjour, je souhaite obtenir des informations sur vos produits.')
    }
    
    if (!result.success) {
      return res.status(400).json({ 
        error: result.error,
        message: 'Impossible de générer le lien WhatsApp'
      })
    }
    
    res.json({
      success: true,
      whatsappUrl: result.url,
      message: 'Lien WhatsApp généré avec succès'
    })
  } catch (error) {
    console.error('[ContactRoutes] Erreur:', error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
