const express = require('express')
const router = express.Router()
const { 
  getCart, 
  addToCart, 
  updateQuantity, 
  removeFromCart, 
  clearCart 
} = require('../controllers/cartController')
const verifyCustomerToken = require('../middleware/customerAuthMiddleware')

// All routes require customer authentication
router.use(verifyCustomerToken)

// GET /api/cart - Get customer's cart
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
