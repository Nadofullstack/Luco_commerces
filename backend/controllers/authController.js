const Admin = require('../models/Admin')

const createDefaultAdmin = async () => {
  const existing = await Admin.findOne({ email: 'admin@luco.com' })
  if (!existing) {
    await Admin.create({
      email: 'admin@luco.com',
      password: 'password',
    })
  }
}

exports.login = async (req, res) => {
  // Le frontend n'envoie que { email, password }
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() })
  if (!admin || admin.password !== password) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect.' })
  }

  const token = process.env.ADMIN_TOKEN || 'mock-token-123'
  return res.json({
    success: true,
    user: {  email: admin.email, password: admin.password },
    token,
  })
}

exports.me = async (req, res) => {
  const admin = await Admin.findOne({ email: 'admin@luco.com' })
  if (!admin) {
    return res.status(404).json({ error: 'Admin not found' })
  }
  return res.json({ user: { name: admin.name, email: admin.email } })
}

exports.createDefaultAdmin = createDefaultAdmin
