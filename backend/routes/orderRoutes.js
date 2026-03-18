const express = require('express')
const router = express.Router()
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController')
const auth = require('../middleware/authMiddleware')

// All routes require authentication
router.use(auth)

// Routes
router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

module.exports = router
