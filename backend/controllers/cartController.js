const Cart = require('../models/Cart')
const Product = require('../models/Product')

// Générer un ID de session unique
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get cart by session ID
exports.getCart = async (req, res) => {
  try {
    const { sessionId } = req.query
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID requis' })
    }

    let cart = await Cart.findOne({ sessionId }).populate('items.product')
    
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] })
    }

    res.json({ success: true, cart })
  } catch (error) {
    console.error('[CartController] Erreur getCart:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { sessionId, productId, quantity = 1 } = req.body

    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'Session ID et Product ID requis' })
    }

    // Vérifier que le produit existe
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' })
    }

    // Trouver ou créer le panier
    let cart = await Cart.findOne({ sessionId })
    
    if (!cart) {
      cart = await Cart.create({
        sessionId,
        items: [{ product: productId, quantity }]
      })
    } else {
      // Vérifier si le produit est déjà dans le panier
      const existingItem = cart.items.find(item => item.product.toString() === productId)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.items.push({ product: productId, quantity })
      }
      
      await cart.save()
    }

    // Populate le panier avant de le retourner
    cart = await Cart.findOne({ sessionId }).populate('items.product')

    res.json({ success: true, cart })
  } catch (error) {
    console.error('[CartController] Erreur addToCart:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Update item quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body

    if (!sessionId || !productId || quantity === undefined) {
      return res.status(400).json({ error: 'Session ID, Product ID et quantity requis' })
    }

    if (quantity < 1) {
      return res.status(400).json({ error: 'La quantité doit être au moins 1' })
    }

    const cart = await Cart.findOne({ sessionId })
    
    if (!cart) {
      return res.status(404).json({ error: 'Panier non trouvé' })
    }

    const item = cart.items.find(item => item.product.toString() === productId)
    
    if (!item) {
      return res.status(404).json({ error: 'Produit non trouvé dans le panier' })
    }

    item.quantity = quantity
    await cart.save()

    const updatedCart = await Cart.findOne({ sessionId }).populate('items.product')

    res.json({ success: true, cart: updatedCart })
  } catch (error) {
    console.error('[CartController] Erreur updateQuantity:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { sessionId } = req.body
    const { productId } = req.params

    if (!sessionId || !productId) {
      return res.status(400).json({ error: 'Session ID et Product ID requis' })
    }

    const cart = await Cart.findOne({ sessionId })
    
    if (!cart) {
      return res.status(404).json({ error: 'Panier non trouvé' })
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId)
    await cart.save()

    const updatedCart = await Cart.findOne({ sessionId }).populate('items.product')

    res.json({ success: true, cart: updatedCart })
  } catch (error) {
    console.error('[CartController] Erreur removeFromCart:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const { sessionId } = req.body

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID requis' })
    }

    const cart = await Cart.findOne({ sessionId })
    
    if (!cart) {
      return res.status(404).json({ error: 'Panier non trouvé' })
    }

    cart.items = []
    await cart.save()

    res.json({ success: true, cart })
  } catch (error) {
    console.error('[CartController] Erreur clearCart:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Generate session ID
exports.generateSession = async (req, res) => {
  try {
    const sessionId = generateSessionId()
    res.json({ success: true, sessionId })
  } catch (error) {
    console.error('[CartController] Erreur generateSession:', error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
