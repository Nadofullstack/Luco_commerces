const Cart = require('../models/Cart')
const Product = require('../models/Product')

// Get cart for the authenticated customer
const getCart = async (req, res) => {
  try {
    const customerId = req.customer._id
    
    // Find or create cart for customer
    let cart = await Cart.findOne({ customer: customerId })
      .populate('items.product', 'name price image status category')
    
    // Create empty cart if doesn't exist
    if (!cart) {
      cart = new Cart({
        customer: customerId,
        items: [],
        totalAmount: 0
      })
      await cart.save()
    }
    
    res.json({ cart })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    const customerId = req.customer._id
    
    // Validate product exists
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    // Check stock availability
    if (product.status === 'Out of Stock') {
      return res.status(400).json({ error: 'Product is out of stock' })
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ customer: customerId })
    
    if (!cart) {
      cart = new Cart({
        customer: customerId,
        items: []
      })
    }
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    )
    
    if (existingItemIndex > -1) {
      // Update quantity if already in cart
      const newQuantity = cart.items[existingItemIndex].quantity + quantity
      
      // Check stock
      if (product.status === 'Low Stock' && newQuantity > 10) {
        return res.status(400).json({ error: 'Not enough stock available' })
      }
      
      cart.items[existingItemIndex].quantity = newQuantity
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price // Store snapshot of price
      })
    }
    
    await cart.save()
    
    // Populate product details for response
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price image status category')
    
    res.json({ 
      message: 'Product added to cart',
      cart: populatedCart 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update quantity of an item in cart
const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const customerId = req.customer._id
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' })
    }
    
    const cart = await Cart.findOne({ customer: customerId })
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    )
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' })
    }
    
    // Verify stock availability
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    if (product.status === 'Out of Stock') {
      return res.status(400).json({ error: 'Product is out of stock' })
    }
    
    cart.items[itemIndex].quantity = quantity
    
    await cart.save()
    
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price image status category')
    
    res.json({ 
      message: 'Quantity updated',
      cart: populatedCart 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params
    const customerId = req.customer._id
    
    const cart = await Cart.findOne({ customer: customerId })
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    )
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' })
    }
    
    // Remove item from cart
    cart.items.splice(itemIndex, 1)
    
    await cart.save()
    
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price image status category')
    
    res.json({ 
      message: 'Product removed from cart',
      cart: populatedCart 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const customerId = req.customer._id
    
    const cart = await Cart.findOne({ customer: customerId })
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    
    cart.items = []
    cart.totalAmount = 0
    
    await cart.save()
    
    res.json({ 
      message: 'Cart cleared',
      cart: {
        customer: customerId,
        items: [],
        totalAmount: 0
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart
}
