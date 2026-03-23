const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

const createDefaultAdmin = async () => {
  const existing = await Admin.findOne({ email: 'admin@luco.com' })
  if (!existing) {
    await Admin.create({
      email: 'admin@luco.com',
      password: 'password',
    })
  }
}

// Génère un token JWT pour l'admin
const generateAdminToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      role: 'admin'
    },
    process.env.JWT_SECRET || 'luco-admin-secret-key',
    { expiresIn: '24h' } // Token expire après 24h
  )
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required.',
        message: 'Veuillez remplir tous les champs.'
      })
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() })
    
    if (!admin) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect.',
        message: 'Identifiants invalides.'
      })
    }
    
    // Vérifier le mot de passe
    if (admin.password !== password) {
      return res.status(401).json({ 
        error: 'Email ou mot de passe incorrect.',
        message: 'Identifiants invalides.'
      })
    }

    // Générer le token JWT
    const token = generateAdminToken(admin)
    
    return res.json({
      success: true,
      user: { 
        id: admin._id,
        email: admin.email,
        name: admin.name || 'Administrateur'
      },
      token,
      expiresIn: '24h'
    })
  } catch (error) {
    console.error('[AuthController] Erreur de connexion admin:', error)
    return res.status(500).json({ 
      error: 'Erreur serveur',
      message: 'Une erreur est survenue lors de la connexion.'
    })
  }
}

exports.me = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: 'admin@luco.com' })
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' })
    }
    return res.json({ user: { name: admin.name, email: admin.email } })
  } catch (error) {
    console.error('[AuthController] Erreur:', error)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}

exports.createDefaultAdmin = createDefaultAdmin
