const express = require('express')
const router = express.Router()
const { 
  getCart, 
  addToCart, 
  updateQuantity, 
  removeFromCart, 
  clearCart,
  generateSession
} = require('../controllers/cartController')

// GET /api/cart/session - Generate new session ID
router.get('/session', generateSession)

// GET /api/cart - Get cart by session ID
router.get('/', getCart)

// POST /api/cart/add - Add product to cart
router.post('/add', addToCart)

// PUT /api/cart/update - Update item quantity
router.put('/update', updateQuantity)

// DELETE /api/cart/remove/:productId - Remove product from cart
router.delete('/remove/:productId', removeFromCart)

// DELETE /api/cart/clear - Clear entire cart
router.delete('/clear', clearCart)

module.exports = router
