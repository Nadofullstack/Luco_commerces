# Guide de démarrage rapide - Test des corrections

## Étape 1: Tester la connexion à la base de données

Ouvrez un terminal dans le dossier `backend` et exécutez:

```bash
cd backend
node test-db.js
```

Vous devriez voir:
```
✅ Connexion MongoDB réussie!
📦 Nombre de produits dans la base: X
✨ Tous les tests sont passés avec succès!
```

## Étape 2: Démarrer le backend

Dans le même terminal (ou un nouveau):

```bash
cd backend
npm run dev
```

Attendez de voir:
```
✅ MongoDB connecté
Server running on port 3000
```

## Étape 3: Démarrer le frontend

Ouvrez un NOUVEAU terminal dans le dossier `frontend`:

```bash
cd frontend
npm run dev
```

Le frontend devrait démarrer sur `http://localhost:5173`

## Étape 4: Tester l'ajout de produits

1. Ouvrez votre navigateur sur `http://localhost:5173`
2. Connectez-vous en tant qu'admin
3. Allez dans la section "Products"
4. Cliquez sur "Add New Product"
5. Remplissez le formulaire:
   - Name: Test Product
   - SKU: TEST-001
   - Description: Ceci est un test
   - Price: 50000
   - Category: Electronics
   - Status: In Stock
6. Cliquez sur "Add Product"

## Étape 5: Vérifier la persistance

1. Actualisez la page (F5)
2. Le produit "Test Product" doit toujours être visible
3. Si c'est le cas, ✅ le problème est résolu!

## Étape 6: Vérifier dans la base de données (optionnel)

Si vous avez accès à MongoDB Compass ou MongoDB Atlas:

1. Connectez-vous avec l'URI: `mongodb+srv://nadegedjossou299_db_user:***@cluster0.6ppwjrt.mongodb.net/`
2. Sélectionnez la base de données "Luco_commerce"
3. Ouvrez la collection "products"
4. Vous devriez voir tous vos produits, y compris "Test Product"

## Résolution des problèmes

### Le backend ne démarre pas
- Vérifiez que MongoDB Atlas est accessible
- Vérifiez que le fichier `.env` contient bien `MONGO_URI`
- Vérifiez que toutes les dépendances sont installées: `npm install`

### Le frontend ne se connecte pas au backend
- Vérifiez que le backend tourne sur le port 3000
- Vérifiez que le fichier `frontend/.env` contient: `VITE_API_URL=http://localhost:3000/api`
- Redémarrez le frontend après modification du `.env`

### Les produits disparaissent toujours
- Ouvrez la console du navigateur (F12)
- Vérifiez s'il y a des erreurs réseau
- Vérifiez que le token admin est présent dans localStorage
- Vérifiez que les requêtes API pointent vers `http://localhost:3000/api/products`

### Erreur CORS
- Vérifiez que `FRONTEND_URL=http://localhost:5173` est dans `backend/.env`
- Redémarrez le backend

## Commandes utiles

### Voir les logs du backend
Les logs s'affichent dans le terminal où vous avez lancé `npm run dev`

### Nettoyer et réinstaller les dépendances
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Vérifier que les ports sont libres
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5173

# Si un port est occupé, tuez le processus ou changez le port
```

## Prochaines étapes

Une fois que tout fonctionne:
1. Testez la modification d'un produit
2. Testez la suppression d'un produit
3. Testez la pagination
4. Testez le filtrage par catégorie
5. Testez la recherche de produits

Tous ces tests doivent fonctionner correctement maintenant! 🎉
