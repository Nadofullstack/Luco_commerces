require('dotenv').config()
const cloudinary = require('./config/cloudinary')

console.log('🔍 Test de la configuration Cloudinary\n')

// Vérifier que les variables d'environnement sont définies
const checks = []

if (process.env.CLOUDINARY_CLOUD_NAME) {
  checks.push({ name: 'CLOUDINARY_CLOUD_NAME', status: true, value: process.env.CLOUDINARY_CLOUD_NAME })
} else {
  checks.push({ name: 'CLOUDINARY_CLOUD_NAME', status: false, value: 'Non défini' })
}

if (process.env.CLOUDINARY_API_KEY) {
  checks.push({ name: 'CLOUDINARY_API_KEY', status: true, value: process.env.CLOUDINARY_API_KEY })
} else {
  checks.push({ name: 'CLOUDINARY_API_KEY', status: false, value: 'Non défini' })
}

if (process.env.CLOUDINARY_API_SECRET) {
  checks.push({ name: 'CLOUDINARY_API_SECRET', status: true, value: '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) })
} else {
  checks.push({ name: 'CLOUDINARY_API_SECRET', status: false, value: 'Non défini' })
}

console.log('═══════════════════════════════════════════════════════════\n')

let allDefined = true
checks.forEach(check => {
  const icon = check.status ? '✅' : '❌'
  console.log(`${icon} ${check.name}: ${check.value}`)
  if (!check.status) allDefined = false
})

console.log('\n═══════════════════════════════════════════════════════════\n')

if (!allDefined) {
  console.log('❌ Configuration incomplète !')
  console.log('\n📖 Consultez GUIDE_CLOUDINARY.md pour configurer Cloudinary.\n')
  console.log('👉 Vous devez définir ces 3 variables dans backend/.env :')
  console.log('   - CLOUDINARY_CLOUD_NAME')
  console.log('   - CLOUDINARY_API_KEY')
  console.log('   - CLOUDINARY_API_SECRET\n')
  process.exit(1)
}

// Test de connexion à Cloudinary
console.log('🔄 Test de connexion à Cloudinary...\n')

cloudinary.api.ping()
  .then(result => {
    console.log('✅ Connexion à Cloudinary réussie !')
    console.log(`📊 Statut: ${result.status}\n`)
    console.log('🎉 Cloudinary est correctement configuré !')
    console.log('👉 Vous pouvez maintenant uploader des images.\n')
  })
  .catch(error => {
    console.log('❌ Erreur de connexion à Cloudinary')
    console.log(`📝 Message: ${error.message}\n`)
    console.log('🔍 Vérifications à faire :')
    console.log('   1. Les valeurs dans .env sont-elles correctes ?')
    console.log('   2. Avez-vous copié les bonnes informations depuis Cloudinary ?')
    console.log('   3. Y a-t-il des espaces avant ou après les valeurs ?\n')
    console.log('📖 Consultez GUIDE_CLOUDINARY.md pour plus d\'aide.\n')
  })
