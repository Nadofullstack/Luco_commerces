const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: String, default: 'General' },
  price: { type: Number, required: true },
  status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'], default: 'In Stock' },
  image: { type: String, default: 'https://via.placeholder.com/80' },
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)
