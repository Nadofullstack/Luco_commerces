require('dotenv').config()
const mongoose = require('mongoose')
const Admin = require('./models/Admin')

const updateAdminName = async () => {
  try {
    console.log('🔄 Connexion à MongoDB...')
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('✅ Connexion réussie!\n')

    // Trouver l'admin existant
    const admin = await Admin.findOne({ email: 'admin@luco.com' })
    
    if (!admin) {
      console.log('❌ Aucun admin trouvé avec l\'email admin@luco.com')
      console.log('👉 Créez un admin d\'abord en démarrant le serveur.\n')
      return
    }

    console.log('📋 Admin actuel:')
    console.log(`   Email: ${admin.email}`)
    console.log(`   Nom: ${admin.name || 'Non défini'}`)
    console.log(`   ID: ${admin._id}\n`)

    // Mettre à jour le nom
    admin.name = 'Nadège Djossou'
    await admin.save()
    console.log('✅ Nom de l\'admin mis à jour: Nadège Djossou\n')

    console.log('🎉 Terminé!')
    console.log('👉 Reconnectez-vous pour voir le changement.\n')

  } catch (error) {
    console.error('❌ Erreur:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Connexion fermée')
  }
}

updateAdminName()
