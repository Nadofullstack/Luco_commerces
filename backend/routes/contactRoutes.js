const express = require('express')
const router = express.Router()
const { generateContactLink, generateCustomContactLink } = require('../services/whatsappService')

// Configuration nodemailer
const nodemailer = require('nodemailer')

// Configuration du transporteur email
const createTransporter = () => {
  // Si les variables d'environnement sont configurées, utiliser SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }
  // Sinon, utiliser un service de simulation (pour le développement)
  return null
}

// Email de l'admin (configurable via variable d'environnement)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@luco-commerce.com'

/**
 * POST /api/contact/send-email
 * Envoie un email à l'administrateur avec le message du formulaire de contact
 * Body:
 *   - name: nom de l'expéditeur
 *   - email: email de l'expéditeur
 *   - subject: sujet du message
 *   - message: contenu du message
 */
router.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    
    // Validation des champs obligatoires
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Tous les champs sont obligatoires',
        message: 'Veuillez remplir tous les champs du formulaire'
      })
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email invalide',
        message: 'Veuillez fournir une adresse email valide'
      })
    }
    
    console.log('[Contact] Nouveau message reçu:')
    console.log(`  - De: ${name} <${email}>`)
    console.log(`  - Sujet: ${subject}`)
    console.log(`  - Message: ${message.substring(0, 100)}...`)
    
    // Créer le transporteur
    const transporter = createTransporter()
    
    // Contenu de l'email
    const mailOptions = {
      from: `"Luco Commerce Contact" <${process.env.SMTP_USER || 'noreply@luco-commerce.com'}>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            Nouveau message de contact - Luco Commerce
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Nom:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0;"><strong>Sujet:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #475569; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              <strong>ℹ️ Information:</strong> Ce message a été envoyé depuis le formulaire de contact de votre site Luco Commerce.
              Vous pouvez répondre directement à cet email pour contacter ${name}.
            </p>
          </div>
        </div>
      `,
      text: `
Nouveau message de contact - Luco Commerce

==============================================

Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}

==============================================
Ce message a été envoyé depuis le formulaire de contact de votre site Luco Commerce.
      `
    }
    
    if (transporter) {
      // Envoyer l'email via SMTP
      await transporter.sendMail(mailOptions)
      console.log('[Contact] Email envoyé avec succès à:', ADMIN_EMAIL)
      
      res.json({
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
      })
    } else {
      // Mode développement: simulate l'envoi
      console.log('[Contact] Mode simulation - Email non envoyé (SMTP non configuré)')
      console.log('[Contact] Email qui aurait été envoyé:')
      console.log(`  À: ${ADMIN_EMAIL}`)
      console.log(`  Sujet: [Contact] ${subject}`)
      
      // Stocker le message en log pour le développement
      res.json({
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
        simulation: true
      })
    }
    
  } catch (error) {
    console.error('[Contact] Erreur lors de l\'envoi de l\'email:', error.message)
    res.status(500).json({
      error: 'Erreur serveur',
      message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.'
    })
  }
})

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
