const Product = require('../models/Product')
const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/uploadMiddleware')

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

exports.createProduct = async (req, res) => {
  try {
    const { name, sku, description, category, price, status } = req.body
    let imageUrl = 'https://via.placeholder.com/400'

    // Upload de l'image vers Cloudinary si un fichier est fourni
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer)
        imageUrl = result.secure_url
      } catch (uploadError) {
        console.error('Erreur upload Cloudinary:', uploadError)
        return res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image.' })
      }
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
      image: imageUrl,
    })

    res.status(201).json({ success: true, product })
  } catch (error) {
    console.error('Erreur création produit:', error)
    res.status(500).json({ error: 'Erreur serveur lors de la création du produit.' })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    
    // Upload de la nouvelle image vers Cloudinary si fournie
    if (req.file) {
      try {
        // Supprimer l'ancienne image si elle existe sur Cloudinary
        const product = await Product.findById(id)
        if (product && product.image && product.image.includes('cloudinary')) {
          // Extraire le public_id de l'URL Cloudinary
          const urlParts = product.image.split('/')
          const publicIdWithExt = urlParts.slice(-2).join('/')
          const publicId = publicIdWithExt.split('.')[0]
          await deleteFromCloudinary(publicId).catch(err => console.log('Erreur suppression:', err))
        }
        
        // Upload de la nouvelle image
        const result = await uploadToCloudinary(req.file.buffer)
        updates.image = result.secure_url
      } catch (uploadError) {
        console.error('Erreur upload Cloudinary:', uploadError)
        return res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image.' })
      }
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true })
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Produit non trouvé.' })
    }
    res.json({ success: true, product: updatedProduct })
  } catch (error) {
    console.error('Erreur mise à jour produit:', error)
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du produit.' })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' })
    }
    
    // Supprimer l'image de Cloudinary si elle existe
    if (product.image && product.image.includes('cloudinary')) {
      try {
        const urlParts = product.image.split('/')
        const publicIdWithExt = urlParts.slice(-2).join('/')
        const publicId = publicIdWithExt.split('.')[0]
        await deleteFromCloudinary(publicId)
      } catch (deleteError) {
        console.log('Erreur suppression image Cloudinary:', deleteError)
      }
    }
    
    await Product.findByIdAndDelete(id)
    res.json({ success: true, message: 'Produit supprimé.' })
  } catch (error) {
    console.error('Erreur suppression produit:', error)
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du produit.' })
  }
}
