const Customer = require('../models/Customer')
const Order = require('../models/Order')

// Get all customers (admin only)
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().select('-password').sort({ createdAt: -1 })
    res.json({ customers })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get single customer
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select('-password')
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.json({ customer })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Register new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    
    // Check if customer exists
    const existingCustomer = await Customer.findOne({ email })
    if (existingCustomer) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    
    const customer = new Customer({
      name,
      email,
      password,
      phone
    })
    
    await customer.save()
    
    res.status(201).json({ 
      message: 'Registration successful',
      customer: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        role: customer.role
      }
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Customer login
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body
    
    const customer = await Customer.findOne({ email })
    if (!customer) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    
    const isMatch = await customer.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    
    if (!customer.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' })
    }
    
    // Generate token
    const token = require('jsonwebtoken').sign(
      { id: customer._id, role: customer.role },
      process.env.JWT_SECRET || 'luco-secret-key',
      { expiresIn: '7d' }
    )
    
    res.json({
      message: 'Login successful',
      token,
      customer: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        role: customer.role,
        avatar: customer.avatar
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update customer profile
const updateCustomer = async (req, res) => {
  try {
    const { name, phone, address, avatar } = req.body
    
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    
    if (name) customer.name = name
    if (phone) customer.phone = phone
    if (address) customer.address = address
    if (avatar) customer.avatar = avatar
    
    const updatedCustomer = await customer.save()
    res.json({ 
      customer: {
        _id: updatedCustomer._id,
        name: updatedCustomer.name,
        email: updatedCustomer.email,
        phone: updatedCustomer.phone,
        address: updatedCustomer.address,
        avatar: updatedCustomer.avatar,
        role: updatedCustomer.role
      }
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Delete customer (admin only)
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.json({ message: 'Customer deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get customer orders
const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'customer.email': req.params.email }).sort({ createdAt: -1 })
    res.json({ orders })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  loginCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerOrders
}
