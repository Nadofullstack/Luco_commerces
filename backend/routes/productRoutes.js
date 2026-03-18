const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const verifyAdminToken = require('../middleware/authMiddleware')
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'))
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname.replace(/\s/g, '-')}`
    cb(null, unique)
  },
})

const upload = multer({ storage })

// Public route - no authentication required (for customers)
router.get('/public', getProducts)

// Protected routes - admin only
router.get('/', verifyAdminToken, getProducts)
router.post('/', verifyAdminToken, upload.single('image'), createProduct)
router.put('/:id', verifyAdminToken, upload.single('image'), updateProduct)
router.delete('/:id', verifyAdminToken, deleteProduct)

module.exports = router
