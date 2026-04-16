# 🔧 Guide de débogage - Erreur "Unexpected token '<'"

## 🎯 Problème

Erreur: `Unexpected token '<', "<!doctype "... is not valid JSON`

Cette erreur signifie que le frontend reçoit une page HTML au lieu d'une réponse JSON de l'API.

## ✅ Solution appliquée

### 1. Correction du fichier `.env`

**Avant**:
```env
VITE_API_URL=http://localhost:3000/api
```

**Après**:
```env
VITE_API_URL=/api
```

**Pourquoi ?** 
- En développement, Vite utilise un proxy configuré dans `vite.config.js`
- Le proxy redirige `/api` vers `http://localhost:3000`
- Utiliser l'URL complète cause des problèmes de CORS et de routing

## 🚀 Étapes pour tester

### 1. Arrêter le frontend (si en cours d'exécution)
Appuyez sur `Ctrl+C` dans le terminal où le frontend tourne.

### 2. Redémarrer le frontend
```bash
cd frontend
npm run dev
```

**IMPORTANT**: Vite doit être redémarré pour prendre en compte les changements du fichier `.env`

### 3. Vérifier que le backend tourne
Dans un autre terminal:
```bash
cd backend
npm run dev
```

Vous devriez voir:
```
✅ MongoDB connecté
Server running on port 3000
```

### 4. Tester l'ajout de produit

1. Ouvrez http://localhost:5173
2. Connectez-vous en tant qu'admin
3. Allez dans "Products"
4. Cliquez sur "Add New Product"
5. Remplissez le formulaire:
   - Name: Test Product 2
   - SKU: TEST-002
   - Price: 75000
   - Category: Electronics
   - Status: In Stock
6. Cliquez sur "Add Product"
7. **Actualisez la page (F5)**
8. ✅ Le produit doit être visible !

## 🔍 Vérification des URLs

### En développement (localhost)

Quand vous êtes sur `http://localhost:5173`, les requêtes doivent être:

```javascript
// ✅ CORRECT
fetch('/api/products')
// Vite proxy redirige vers: http://localhost:3000/api/products

// ❌ INCORRECT
fetch('http://localhost:3000/api/products')
// Cause des problèmes de CORS
```

### En production (Vercel/Render)

Quand vous déployez, les requêtes doivent être:

```javascript
// ✅ CORRECT
fetch('https://shop-luco.onrender.com/api/products')
// URL complète du backend en production
```

## 🛠️ Configuration Vite

Le fichier `vite.config.js` contient:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

Cela signifie:
- Toutes les requêtes vers `/api/*` sont redirigées vers `http://localhost:3000/api/*`
- Le proxy gère automatiquement les CORS
- Pas besoin d'URL complète en développement

## 📝 Fichiers de configuration

### `.env` (développement)
```env
VITE_API_URL=/api
```

### `.env.production` (production)
```env
VITE_API_URL=https://shop-luco.onrender.com/api
```

## 🐛 Débogage

### Ouvrir la console du navigateur (F12)

1. Allez dans l'onglet "Network"
2. Essayez d'ajouter un produit
3. Regardez les requêtes HTTP

**Ce que vous devriez voir**:

```
Request URL: http://localhost:5173/api/products
Status: 201 Created
Response: { "success": true, "product": {...} }
```

**Si vous voyez**:

```
Request URL: http://localhost:5173/api/products
Status: 404 Not Found
Response: <!doctype html>...
```

Cela signifie que le proxy ne fonctionne pas. Solutions:
1. Redémarrez le frontend
2. Vérifiez que le backend tourne sur le port 3000
3. Vérifiez `vite.config.js`

## ✅ Checklist de vérification

- [ ] Backend tourne sur le port 3000
- [ ] Frontend tourne sur le port 5173
- [ ] Fichier `.env` contient `VITE_API_URL=/api`
- [ ] Frontend redémarré après modification du `.env`
- [ ] Pas d'erreur dans la console du backend
- [ ] Pas d'erreur dans la console du navigateur

## 🎯 Test final

Exécutez ce script pour vérifier:

```bash
# Dans le dossier racine
node verifier-config.js
```

Vous devriez voir:
```
✅ Frontend .env existe
✅ VITE_API_URL configuré
```

## 📞 Si le problème persiste

1. **Vérifiez les logs du backend**
   - Regardez le terminal où le backend tourne
   - Cherchez des erreurs

2. **Vérifiez la console du navigateur**
   - Ouvrez F12
   - Onglet "Console" pour les erreurs JavaScript
   - Onglet "Network" pour les requêtes HTTP

3. **Testez l'API directement**
   ```bash
   # Dans un terminal
   curl http://localhost:3000/api/products
   ```
   
   Vous devriez recevoir une réponse JSON avec les produits.

4. **Nettoyez le cache**
   - Fermez tous les onglets du navigateur
   - Redémarrez le frontend
   - Ouvrez un nouvel onglet en navigation privée

## 🚀 Commandes de redémarrage complet

```bash
# 1. Arrêter tout (Ctrl+C dans chaque terminal)

# 2. Backend
cd backend
npm run dev

# 3. Frontend (nouveau terminal)
cd frontend
npm run dev

# 4. Ouvrir http://localhost:5173
```

---

**Date**: Janvier 2025
**Statut**: ✅ Corrigé
