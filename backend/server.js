const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
// Importer la fonction de connexion à la base de données
const connectDB = require('./config/db')
const adminRoutes = require('./routes/adminRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const customerRoutes = require('./routes/customerRoutes')
const contactRoutes = require('./routes/contactRoutes')
const cartRoutes = require('./routes/cartRoutes')
const { createDefaultAdmin } = require('./controllers/authController')
// const { createDefaultProducts } = require('./controllers/productController')

const PORT = process.env.PORT || 3000
//création d'une instance de express
const app = express()
//cores
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
//middlewares pour parser le json
app.use(express.json())

app.use('/api/admin', adminRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/cart', cartRoutes)
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.json({ message: 'Luco Commerce Backend is running.' })
})

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectDB()

    console.log("MongoDB connecté")

    await createDefaultAdmin().catch(err => {
      console.log("Admin skipped:", err.message)
    })

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (error) {
    console.error("DB connection failed:", error.message)

    // ⚠️ IMPORTANT : on ne crash PAS Render
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running WITHOUT DB on port ${PORT}`)
    })
  }
}
startServer()