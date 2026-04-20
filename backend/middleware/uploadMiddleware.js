const multer = require('multer')
const cloudinary = require('../config/cloudinary')
const { Readable } = require('stream')

// Configuration du stockage en mémoire
const storage = multer.memoryStorage()

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024 // Limite à 5MB
  },
  fileFilter: (req, file, cb) => {
    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Type de fichier non autorisé. Utilisez JPG, PNG, GIF ou WEBP.'))
    }
  }
})

// Fonction pour uploader vers Cloudinary
const uploadToCloudinary = (buffer, folder = 'luco_commerce/products') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        transformation: [
          { width: 100, height: 100, crop: 'limit' }, // Réduit à 400x400px max
          { quality: 'auto:eco' }, // Qualité économique pour fichiers plus légers
          { fetch_format: 'auto' } // Format automatique (WebP si supporté)
        ]
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )

    // Convertir le buffer en stream et l'envoyer à Cloudinary
    const readableStream = Readable.from(buffer)
    readableStream.pipe(uploadStream)
  })
}

// Fonction pour supprimer une image de Cloudinary
const deleteFromCloudinary = (publicId) => {
  return cloudinary.uploader.destroy(publicId)
}

module.exports = { upload, uploadToCloudinary, deleteFromCloudinary }
