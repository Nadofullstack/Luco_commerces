const mongoose = require('mongoose')
require('dotenv').config()

const Product = require('./models/Product')

const testConnection = async () => {
  try {
    console.log('🔄 Test de connexion à MongoDB...')
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('✅ Connexion MongoDB réussie!')

    // Test: Compter les produits existants
    const count = await Product.countDocuments()
    console.log(`📦 Nombre de produits dans la base: ${count}`)

    // Test: Récupérer tous les produits
    const products = await Product.find().limit(5)
    console.log(`\n📋 Premiers produits:`)
    products.forEach(p => {
      console.log(`  - ${p.name} (${p.sku}) - ${p.price} FCFA - ${p.status}`)
    })

    // Test: Créer un produit de test
    console.log('\n🧪 Test de création d\'un produit...')
    const testProduct = await Product.create({
      name: 'Produit Test',
      sku: `TEST-${Date.now()}`,
      description: 'Ceci est un produit de test',
      category: 'Electronics',
      price: 99999,
      status: 'In Stock',
      image: 'https://via.placeholder.com/80'
    })
    console.log(`✅ Produit créé: ${testProduct.name} (ID: ${testProduct._id})`)

    // Test: Récupérer le produit créé
    const foundProduct = await Product.findById(testProduct._id)
    console.log(`✅ Produit récupéré: ${foundProduct.name}`)

    // Test: Supprimer le produit de test
    await Product.findByIdAndDelete(testProduct._id)
    console.log(`✅ Produit de test supprimé`)

    console.log('\n✨ Tous les tests sont passés avec succès!')
    console.log('👉 Votre base de données fonctionne correctement.')

  } catch (error) {
    console.error('❌ Erreur:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('\n🔌 Connexion fermée')
  }
}

testConnection()
