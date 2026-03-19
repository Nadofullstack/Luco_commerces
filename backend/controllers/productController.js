const Product = require('../models/Product')

exports.getProducts = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    // Get total count
    const total = await Product.countDocuments()

    // Get paginated products
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        from: skip + 1,
        to: Math.min(skip + limit, total)
      }
    })
  
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des produits.' })
  }
}

// Get single product by ID (public)
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' })
    }
    
    res.json({ success: true, product })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la récupération du produit.' })
  }
}

// exports.createDefaultProducts = async () => {
//   const count = await Product.countDocuments()
//   if (count > 0) return

//   const sample = [
//     { name: 'Luxe Horizon Watch', sku: 'LUX-001', category: 'Accessories', price: 249, status: 'In Stock', image: 'https://via.placeholder.com/80', description: 'Premium watch.' },
//     { name: 'Aura Wireless Pods', sku: 'LUX-002', category: 'Electronics', price: 399, status: 'Low Stock', image: 'https://via.placeholder.com/80', description: 'Noise-cancelling earbuds.' },
//     { name: 'Velvet Essence Serum', sku: 'LUX-003', category: 'Beauty', price: 85, status: 'Out of Stock', image: 'https://via.placeholder.com/80', description: 'Hydrating skin serum.' },
//   ]

//   await Product.insertMany(sample)
// }

exports.createProduct = async (req, res) => {
  try {
    const { name, sku, description, category, price, status } = req.body
    let imageUrl = req.body.image

    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    }

    if (!name || !sku || !price) {
      return res.status(400).json({ error: 'name, sku et price sont requis.' })
    }

    const existing = await Product.findOne({ sku })
    if (existing) {
      return res.status(409).json({ error: 'SKU déjà utilisé.' })
    }

    const product = await Product.create({
      name,
      sku,
      description: description || '',
      category: category || 'General',
      price,
      status: status || 'In Stock',
      image: imageUrl || 'https://via.placeholder.com/80',
    })

    res.status(201).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la création du produit.' })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    
    // Handle image upload
    if (req.file) {
      updates.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    }
    
    const product = await Product.findByIdAndUpdate(id, updates, { new: true })
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' })
    }
    res.json({ success: true, product })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du produit.' })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' })
    }
    res.json({ success: true, message: 'Produit supprimé.' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du produit.' })
  }
}
