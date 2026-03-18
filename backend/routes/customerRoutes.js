const express = require('express')
const router = express.Router()
const { getCustomers, getCustomerById, createCustomer, loginCustomer, updateCustomer, deleteCustomer, getCustomerOrders } = require('../controllers/customerController')
const auth = require('../middleware/authMiddleware')

// Public routes
router.post('/register', createCustomer)
router.post('/login', loginCustomer)

// Protected routes (require authentication)
router.use(auth)

// Admin routes
router.get('/', getCustomers)
router.get('/:id', getCustomerById)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)
router.get('/orders/:email', getCustomerOrders)

module.exports = router
