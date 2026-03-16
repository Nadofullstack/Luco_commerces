const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: token missing' })
  }

  const token = authHeader.split(' ')[1]
  const expectedToken = process.env.ADMIN_TOKEN || 'mock-token-123'
  if (token !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized: token invalid' })
  }

  next()
}

module.exports = verifyAdminToken
