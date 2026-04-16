# 🌥️ Configuration Cloudinary - Guide complet

## 📋 Informations nécessaires

Pour configurer Cloudinary, vous avez besoin de 3 informations depuis votre compte Cloudinary :

1. **Cloud Name** (Nom du cloud)
2. **API Key** (Clé API)
3. **API Secret** (Secret API)

## 🔍 Où trouver ces informations ?

### Étape 1: Connectez-vous à Cloudinary
Allez sur https://cloudinary.com et connectez-vous à votre compte.

### Étape 2: Accédez au Dashboard
Une fois connecté, vous arrivez sur le Dashboard. Vous verrez une section **"Account Details"** ou **"Product Environment Credentials"**.

### Étape 3: Copiez les informations
Vous verrez quelque chose comme :

```
Cloud name: votre_cloud_name
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz123456
```

## ⚙️ Configuration du fichier .env

Ouvrez le fichier `backend/.env` et remplacez les valeurs :

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

### Exemple avec de vraies valeurs :

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## ✅ Vérification de la configuration

### 1. Vérifiez que les 3 variables sont définies

Ouvrez `backend/.env` et assurez-vous que vous avez :
- ✅ CLOUDINARY_CLOUD_NAME
- ✅ CLOUDINARY_API_KEY
- ✅ CLOUDINARY_API_SECRET

### 2. Redémarrez le backend

```bash
# Arrêtez le backend (Ctrl+C)
cd backend
npm run dev
```

### 3. Testez l'upload

1. Ouvrez http://localhost:5173
2. Connectez-vous en tant qu'admin
3. Allez dans "Products"
4. Cliquez sur "Add New Product"
5. Remplissez le formulaire et **ajoutez une image**
6. Cliquez sur "Add Product"
7. ✅ L'image devrait être uploadée sur Cloudinary

### 4. Vérifiez sur Cloudinary

1. Allez sur https://cloudinary.com
2. Cliquez sur "Media Library" dans le menu
3. Vous devriez voir un dossier `luco_commerce/products`
4. Vos images uploadées sont dedans !

## 🎯 Avantages de Cloudinary

✅ **Stockage en ligne** - Les images ne sont plus dans votre projet
✅ **Optimisation automatique** - Les images sont compressées automatiquement
✅ **CDN rapide** - Chargement ultra-rapide des images
✅ **Transformations** - Redimensionnement automatique à 800x800px
✅ **Suppression automatique** - Quand vous supprimez un produit, l'image est aussi supprimée

## 📁 Structure des dossiers Cloudinary

Vos images seront organisées comme ceci :

```
Cloudinary
└── luco_commerce
    └── products
        ├── image1.jpg
        ├── image2.png
        └── image3.webp
```

## 🔧 Configuration actuelle

### Taille maximale des images
- **5 MB** par image

### Formats acceptés
- JPG / JPEG
- PNG
- GIF
- WEBP

### Transformations appliquées
- Redimensionnement : 800x800px (limite)
- Qualité : Automatique (optimisée)

## 🐛 Résolution des problèmes

### Erreur "Invalid credentials"

**Cause** : Les informations Cloudinary sont incorrectes.

**Solution** :
1. Vérifiez que vous avez copié les bonnes valeurs depuis Cloudinary
2. Vérifiez qu'il n'y a pas d'espaces avant ou après les valeurs
3. Redémarrez le backend

### Erreur "Upload failed"

**Cause** : Problème de connexion ou fichier trop gros.

**Solution** :
1. Vérifiez votre connexion internet
2. Vérifiez que l'image fait moins de 5 MB
3. Vérifiez que le format est supporté (JPG, PNG, GIF, WEBP)

### Les images ne s'affichent pas

**Cause** : URL Cloudinary incorrecte ou image supprimée.

**Solution** :
1. Ouvrez la console du navigateur (F12)
2. Vérifiez l'URL de l'image
3. Testez l'URL directement dans le navigateur
4. Vérifiez que l'image existe dans Cloudinary Media Library

## 📊 Limites du plan gratuit Cloudinary

Le plan gratuit de Cloudinary offre :
- ✅ 25 crédits/mois (environ 25 GB de stockage)
- ✅ 25 GB de bande passante/mois
- ✅ Transformations illimitées
- ✅ CDN gratuit

C'est largement suffisant pour commencer !

## 🚀 Prochaines étapes

1. ✅ Configurez les 3 variables dans `.env`
2. ✅ Redémarrez le backend
3. ✅ Testez l'upload d'une image
4. ✅ Vérifiez dans Cloudinary Media Library
5. 🎉 Profitez du stockage en ligne !

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez que les 3 variables sont correctement définies
2. Vérifiez qu'il n'y a pas d'espaces dans les valeurs
3. Redémarrez le backend
4. Consultez les logs du backend pour voir les erreurs

---

**Date** : Janvier 2025
**Statut** : ✅ Prêt à configurer
