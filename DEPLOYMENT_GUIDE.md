# Guide de Déploiement - Luco Commerce

## 📋 Modifications Effectuées

### Frontend (Vercel)
**URL de production:** https://shopluco.vercel.app/

#### Fichiers modifiés/créés :

1. **`frontend/.env`** (nouveau)
   - Configuration pour le développement local
   - Contient : `VITE_API_URL=https://shop-luco.onrender.com/api`

2. **`frontend/.env.production`** (nouveau)
   - Configuration pour la production sur Vercel
   - Contient : `VITE_API_URL=https://shop-luco.onrender.com/api`

3. **`frontend/src/utils/api.js`** (nouveau)
   - Fichier utilitaire centralisé pour la configuration de l'API
   - Exporte `API_URL` et `getApiUrl()` pour construire les URLs d'API

4. **`frontend/src/services/api.js`**
   - Modifié la ligne 6 : `const API_URL = import.meta.env.VITE_API_URL || '/api'`
   - Utilise maintenant la variable d'environnement pour l'URL de l'API

5. **Tous les composants et vues utilisant l'API** (modifiés)
   - `frontend/src/components/luxe/ProductGridLuxe.vue`
   - `frontend/src/components/luxe/ContactForm.vue`
   - `frontend/src/views/HomeView.vue`
   - `frontend/src/views/ProductDetailView.vue`
   - `frontend/src/views/AdminLoginView.vue`
   - `frontend/src/views/CustomersView.vue`
   - `frontend/src/views/OrdersView.vue`
   - `frontend/src/views/AdminView.vue`
   - Tous importent et utilisent `getApiUrl()` de `utils/api.js`

6. **`frontend/vite.config.js`**
   - Ajout de la configuration de build pour la production
   - Configuration du répertoire de sortie et des sourcemaps

7. **`frontend/.gitignore`**
   - Ajout des règles pour ignorer `.env` et `.env.local`
   - Permet de commiter `.env.exmaple` pour Vercel

8. **`frontend/vercel.json`** (nouveau)
   - Configuration pour le routage SPA (Single Page Application)
   - Configuration des headers CORS pour les appels API

### Backend (Render)
**URL de production:** https://shop-luco.onrender.com/

#### Fichiers modifiés :

1. **`backend/.env`**
   - Modifié `FRONTEND_URL=https://shopluco.vercel.app`
   - Cette URL est utilisée pour la configuration CORS dans `server.js`

## 🚀 Étapes de Redéploiement

### Sur Vercel (Frontend)

1. **Configurer les variables d'environnement sur Vercel :**
   - Aller sur le dashboard Vercel : https://vercel.com/dashboard
   - Sélectionner votre projet
   - Aller dans **Settings** > **Environment Variables**
   - Ajouter : `VITE_API_URL` = `https://shop-luco.onrender.com/api`

2. **Redéployer le frontend :**
   ```bash
   cd frontend
   git add .
   git commit -m "Configure production environment"
   git push
   ```
   
   Ou via le dashboard Vercel :
   - Aller dans **Deployments**
   - Cliquer sur **Redeploy**

### Sur Render (Backend)

1. **Configurer les variables d'environnement sur Render :**
   - Aller sur le dashboard Render : https://dashboard.render.com/
   - Sélectionner votre service backend
   - Aller dans **Environment**
   - Vérifier/Ajouter : `FRONTEND_URL` = `https://shopluco.vercel.app`

2. **Redéployer le backend :**
   - Le backend se redéploiera automatiquement si vous avez configuré le déploiement automatique
   - Ou manuellement via le dashboard Render : **Manual Deploy** > **Deploy latest commit**

## ✅ Vérifications Post-Déploiement

### 1. Tester la connexion Frontend-Backend
- Ouvrir https://shopluco.vercel.app/
- Ouvrir la console du navigateur (F12)
- Vérifier qu'il n'y a pas d'erreurs CORS
- Tester la navigation sur le site

### 2. Tester les fonctionnalités principales
- ✅ Affichage des produits
- ✅ Ajout au panier
- ✅ Processus de commande
- ✅ Connexion admin (https://shopluco.vercel.app/admin/login)
- ✅ Gestion des produits (admin)
- ✅ Gestion des commandes (admin)

### 3. Vérifier les appels API
Dans la console du navigateur, vérifier que les appels API pointent vers :
```
https://shop-luco.onrender.com/api/...
```

## 🔧 Configuration CORS

Le backend est configuré pour accepter les requêtes depuis :
- `https://shopluco.vercel.app` (production)
- `http://localhost:5173` (développement local)

Configuration dans [`backend/server.js`](backend/server.js:21) :
```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
```

## 📝 Notes Importantes

1. **Variables d'environnement sensibles :**
   - Ne jamais commiter le fichier `backend/.env` avec les vraies valeurs
   - Toujours configurer les variables d'environnement directement sur les plateformes de déploiement

2. **Fichiers statiques (uploads) :**
   - Les images uploadées sur Render peuvent être perdues lors des redéploiements
   - Considérer l'utilisation d'un service de stockage cloud (AWS S3, Cloudinary, etc.)

3. **Base de données :**
   - Votre MongoDB Atlas est déjà configuré : `mongodb+srv://...`
   - Assurez-vous que l'IP de Render est autorisée dans MongoDB Atlas

4. **Performance :**
   - Render peut mettre en veille les services gratuits après 15 minutes d'inactivité
   - Le premier appel après la mise en veille peut prendre 30-60 secondes

## 🐛 Dépannage

### Erreur CORS
Si vous voyez des erreurs CORS dans la console :
1. Vérifier que `FRONTEND_URL` est correctement configuré sur Render
2. Redémarrer le service backend sur Render
3. Vider le cache du navigateur

### API non accessible
Si les appels API échouent :
1. Vérifier que le backend est bien déployé : https://shop-luco.onrender.com/
2. Vérifier les logs sur Render
3. Vérifier que MongoDB Atlas autorise les connexions depuis Render

### Images non affichées
Si les images des produits ne s'affichent pas :
1. Vérifier que les URLs des images pointent vers `https://shop-luco.onrender.com/uploads/...`
2. Vérifier que le dossier `uploads` existe sur Render
3. Considérer l'utilisation d'un service de stockage externe

## 📞 Support

Pour toute question ou problème :
- Vérifier les logs sur Vercel : https://vercel.com/dashboard
- Vérifier les logs sur Render : https://dashboard.render.com/
- Consulter la documentation : 
  - Vercel : https://vercel.com/docs
  - Render : https://render.com/docs
