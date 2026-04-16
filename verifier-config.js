const fs = require('fs')
const path = require('path')

console.log('🔍 Vérification de la configuration du projet Luco Commerce\n')

const checks = []

// Vérifier backend/.env
const backendEnvPath = path.join(__dirname, 'backend', '.env')
if (fs.existsSync(backendEnvPath)) {
  const envContent = fs.readFileSync(backendEnvPath, 'utf8')
  checks.push({
    name: 'Backend .env existe',
    status: true,
    details: 'Fichier trouvé'
  })
  
  if (envContent.includes('MONGO_URI=')) {
    checks.push({
      name: 'MONGO_URI configuré',
      status: true,
      details: 'Variable présente'
    })
  } else {
    checks.push({
      name: 'MONGO_URI configuré',
      status: false,
      details: 'Variable manquante'
    })
  }
  
  if (envContent.includes('PORT=')) {
    checks.push({
      name: 'PORT configuré',
      status: true,
      details: 'Variable présente'
    })
  } else {
    checks.push({
      name: 'PORT configuré',
      status: false,
      details: 'Variable manquante'
    })
  }
} else {
  checks.push({
    name: 'Backend .env existe',
    status: false,
    details: 'Fichier manquant'
  })
}

// Vérifier frontend/.env
const frontendEnvPath = path.join(__dirname, 'frontend', '.env')
if (fs.existsSync(frontendEnvPath)) {
  const envContent = fs.readFileSync(frontendEnvPath, 'utf8')
  checks.push({
    name: 'Frontend .env existe',
    status: true,
    details: 'Fichier trouvé'
  })
  
  if (envContent.includes('VITE_API_URL=')) {
    checks.push({
      name: 'VITE_API_URL configuré',
      status: true,
      details: 'Variable présente'
    })
    
    // Vérifier que l'URL est correcte pour le développement
    if (envContent.includes('VITE_API_URL=/api')) {
      checks.push({
        name: 'VITE_API_URL correct (dev)',
        status: true,
        details: 'Utilise le proxy Vite (/api)'
      })
    } else if (envContent.includes('VITE_API_URL=http://localhost:3000/api')) {
      checks.push({
        name: 'VITE_API_URL correct (dev)',
        status: false,
        details: 'Devrait être /api (pas http://localhost:3000/api)'
      })
    }
  } else {
    checks.push({
      name: 'VITE_API_URL configuré',
      status: false,
      details: 'Variable manquante'
    })
  }
} else {
  checks.push({
    name: 'Frontend .env existe',
    status: false,
    details: 'Fichier manquant'
  })
}

// Vérifier les fichiers modifiés
const adminViewPath = path.join(__dirname, 'frontend', 'src', 'views', 'AdminView.vue')
if (fs.existsSync(adminViewPath)) {
  const content = fs.readFileSync(adminViewPath, 'utf8')
  if (content.includes('getApiUrl(`/products?page=')) {
    checks.push({
      name: 'AdminView.vue corrigé (fetchProducts)',
      status: true,
      details: 'Utilise getApiUrl()'
    })
  } else {
    checks.push({
      name: 'AdminView.vue corrigé (fetchProducts)',
      status: false,
      details: 'N\'utilise pas getApiUrl()'
    })
  }
  
  if (content.includes('getApiUrl(`/products/${productToDelete')) {
    checks.push({
      name: 'AdminView.vue corrigé (confirmDelete)',
      status: true,
      details: 'Utilise getApiUrl()'
    })
  } else {
    checks.push({
      name: 'AdminView.vue corrigé (confirmDelete)',
      status: false,
      details: 'N\'utilise pas getApiUrl()'
    })
  }
  
  if (content.includes('InsightsCard')) {
    checks.push({
      name: 'InsightsCard importé',
      status: true,
      details: 'Import présent'
    })
  } else {
    checks.push({
      name: 'InsightsCard importé',
      status: false,
      details: 'Import manquant'
    })
  }
}

// Vérifier InsightsCard.vue
const insightsCardPath = path.join(__dirname, 'frontend', 'src', 'components', 'admin', 'InsightsCard.vue')
if (fs.existsSync(insightsCardPath)) {
  checks.push({
    name: 'InsightsCard.vue existe',
    status: true,
    details: 'Composant créé'
  })
} else {
  checks.push({
    name: 'InsightsCard.vue existe',
    status: false,
    details: 'Composant manquant'
  })
}

// Vérifier les node_modules
const backendNodeModules = path.join(__dirname, 'backend', 'node_modules')
if (fs.existsSync(backendNodeModules)) {
  checks.push({
    name: 'Backend node_modules',
    status: true,
    details: 'Dépendances installées'
  })
} else {
  checks.push({
    name: 'Backend node_modules',
    status: false,
    details: 'Exécuter: cd backend && npm install'
  })
}

const frontendNodeModules = path.join(__dirname, 'frontend', 'node_modules')
if (fs.existsSync(frontendNodeModules)) {
  checks.push({
    name: 'Frontend node_modules',
    status: true,
    details: 'Dépendances installées'
  })
} else {
  checks.push({
    name: 'Frontend node_modules',
    status: false,
    details: 'Exécuter: cd frontend && npm install'
  })
}

// Afficher les résultats
console.log('═══════════════════════════════════════════════════════════\n')

let allPassed = true
checks.forEach(check => {
  const icon = check.status ? '✅' : '❌'
  console.log(`${icon} ${check.name}`)
  console.log(`   ${check.details}\n`)
  if (!check.status) allPassed = false
})

console.log('═══════════════════════════════════════════════════════════\n')

if (allPassed) {
  console.log('🎉 Toutes les vérifications sont passées!')
  console.log('👉 Vous pouvez maintenant démarrer le projet:\n')
  console.log('   1. cd backend && npm run dev')
  console.log('   2. cd frontend && npm run dev\n')
} else {
  console.log('⚠️  Certaines vérifications ont échoué.')
  console.log('👉 Veuillez corriger les problèmes ci-dessus avant de démarrer.\n')
}

console.log('📖 Pour plus d\'informations, consultez:')
console.log('   - GUIDE_DEMARRAGE.md')
console.log('   - CORRECTIONS_PRODUITS.md')
console.log('   - RESUME_MODIFICATIONS.md\n')
