const express = require('express')
const router = express.Router()
const verifyAdminToken = require('../middleware/authMiddleware')
const { upload } = require('../middleware/uploadMiddleware')
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')

// Public routes - no authentication required (for customers)
router.get('/', getProducts)
router.get('/:id', getProductById)

// Protected routes - admin only
router.post('/', verifyAdminToken, upload.single('image'), createProduct)
router.put('/:id', verifyAdminToken, upload.single('image'), updateProduct)
router.delete('/:id', verifyAdminToken, deleteProduct)

module.exports = router
