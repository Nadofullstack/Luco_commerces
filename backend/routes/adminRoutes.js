const express = require('express')
const router = express.Router()
const { login, me } = require('../controllers/authController')
const verifyAdminToken = require('../middleware/authMiddleware')

router.post('/login', login)
router.get('/me', verifyAdminToken, me)

module.exports = router
