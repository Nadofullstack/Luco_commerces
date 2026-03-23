const jwt = require('jsonwebtoken')

const verifyAdminToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Token manquant. Veuillez vous connecter.' 
      })
    }

    const token = authHeader.split(' ')[1]
    
    // Vérifier le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'luco-admin-secret-key')
    
    // Vérifier que c'est bien un token admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'Accès réservé aux administrateurs.' 
      })
    }
    
    // Token valide, continuer
    req.admin = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Session expirée. Veuillez vous reconnecter.' 
      })
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Token invalide.' 
      })
    }
    
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Erreur d\'authentification.' 
    })
  }
}

module.exports = verifyAdminToken
