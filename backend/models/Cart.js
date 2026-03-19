const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false })

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Calculer le total avant chaque sauvegarde
cartSchema.pre('save', function(next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
  next()
})

module.exports = mongoose.model('Cart', cartSchema)
