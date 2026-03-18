const Order = require('../models/Order')

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json({ orders })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json({ order })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Create new order
const createOrder = async (req, res) => {
  try {
    const { orderNumber, customer, address, items, subtotal, shipping, total, paymentMethod, paymentStatus, status, notes } = req.body
    
    // Generate order number if not provided
    const finalOrderNumber = orderNumber || `ORD-${Date.now()}`
    
    const order = new Order({
      orderNumber: finalOrderNumber,
      customer,
      address,
      items,
      subtotal,
      shipping: shipping || 0,
      total,
      paymentMethod: paymentMethod || 'Credit Card',
      paymentStatus: paymentStatus || 'Pending',
      status: status || 'Pending',
      notes
    })
    
    const savedOrder = await order.save()
    res.status(201).json({ order: savedOrder })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Update order
const updateOrder = async (req, res) => {
  try {
    const { status, paymentStatus, notes } = req.body
    
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    if (status) order.status = status
    if (paymentStatus) order.paymentStatus = paymentStatus
    if (notes !== undefined) order.notes = notes
    
    const updatedOrder = await order.save()
    res.json({ order: updatedOrder })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json({ message: 'Order deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
}
