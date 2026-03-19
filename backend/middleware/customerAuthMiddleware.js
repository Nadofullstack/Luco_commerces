const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')

const verifyCustomerToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: token missing' })
    }

    const token = authHeader.split(' ')[1]
    
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'luco-secret-key')
    
    // Find customer by id
    const customer = await Customer.findById(decoded.id).select('-password')
    
    if (!customer) {
      return res.status(401).json({ error: 'Customer not found' })
    }
    
    if (!customer.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' })
    }
    
    // Attach customer to request
    req.customer = customer
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: token invalid' })
  }
}

module.exports = verifyCustomerToken
