# MadaHorizon - Site de Tourisme à Madagascar

## Description
MadaHorizon est une plateforme de réservation de voyages et activités touristiques à Madagascar. Elle permet aux clients de découvrir et réserver des offres de voyage, tandis que les administrateurs gèrent les offres, réservations et utilisateurs.

## Technologies

### Frontend (Client)
- React 18.3.1
- Vite 5.4.3
- React Router 6.26.2
- Tailwind CSS 3.4.10
- Axios 1.7.7
- React Icons 5.3.0

### Backend (Server)
- Node.js / Express 4.21.0
- Sequelize 6.37.8 (ORM)
- SQLite 5.1.7
- JWT 9.0.2 (Authentification)
- Bcryptjs 2.4.3 (Hachage des mots de passe)
- Stripe 17.0.0 (Paiements)
- Multer 1.4.5 (Upload de fichiers)
- Express Validator 7.2.0 (Validation)

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
cd MadaHorizon
```

2. **Installation du serveur**
```bash
cd server
npm install
cp .env.example .env
# Éditer .env avec vos paramètres
npm run dev
```

3. **Installation du client**
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

4. **Initialiser la base de données**
```bash
cd server
npm run seed
```

## Structure du Projet

```
MadaHorizon/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages principales
│   │   ├── context/       # Contexte React (Auth, API)
│   │   └── utils/         # Fonctions utilitaires
│   ├── .env               # Configuration locale
│   └── package.json
│
└── server/                 # Backend Express
    ├── controllers/       # Logique métier
    ├── models/           # Modèles Sequelize
    ├── routes/           # Définition des routes
    ├── middleware/       # Middlewares personnalisés
    ├── utils/            # Fonctions utilitaires
    ├── .env              # Configuration locale
    └── package.json
```

## Améliorations Apportées

### Correction des Erreurs
1. ✅ Ajout du fichier `.env` pour le client
2. ✅ Gestion des erreurs améliorée
3. ✅ Validation des entrées avec express-validator
4. ✅ Middleware d'erreur centralisé
5. ✅ Gestion des exceptions asynchrones

### Améliorations UX/UI
1. ✅ États de chargement dans les pages
2. ✅ Messages d'erreur améliorés
3. ✅ Validations côté client
4. ✅ Feedback utilisateur pour les actions
5. ✅ Pagination préparée

### Sécurité
1. ✅ Validation des données entrantes
2. ✅ Authentification JWT
3. ✅ Hachage des mots de passe
4. ✅ CORS configuré
5. ✅ Gestion des rôles (admin/client)

### Fonctionnalités Ajoutées
1. ✅ Fonctions utilitaires (helpers)
2. ✅ Système de validation côté client et serveur
3. ✅ Logging des requêtes
4. ✅ Gestion centralisée des erreurs
5. ✅ Configuration environnementale

## Comptes de Test

### Admin
- **Email:** admin@madahorizon.com
- **Mot de passe:** admin123

### Client
- **Email:** client@test.com
- **Mot de passe:** client123

## Utilisation

### Démarrer l'application
```bash
# Terminal 1 - Serveur
cd server && npm run dev

# Terminal 2 - Client
cd client && npm run dev
```

L'application sera disponible sur: `http://localhost:5173`

### Routes Principales

**Frontend:**
- `/` - Page d'accueil
- `/offres` - Catalogue des offres
- `/offres/:slug` - Détail d'une offre
- `/connexion` - Connexion
- `/inscription` - Inscription
- `/mon-compte` - Compte utilisateur
- `/admin` - Panneau d'administration

**Backend:**
- `GET /api/offers` - Lister les offres
- `GET /api/categories` - Lister les catégories
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/bookings/mine` - Mes réservations

## Fonctionnalités Principales

### Pour les Clients
- 🎫 Parcourir les offres de voyage
- 🔍 Filtrer par catégorie et prix
- 📅 Réserver une offre
- ⭐ Laisser des avis
- 👤 Gérer son profil
- 📧 Contacter le support

### Pour les Administrateurs
- 📝 Créer et gérer les offres
- 👥 Gérer les utilisateurs
- 📊 Consulter les statistiques
- 💳 Gérer les réservations
- 📰 Publier des articles
- ⭐ Modérer les avis
- 📧 Gérer les messages

## Variables d'Environnement

### Serveur (.env)
```
PORT=5000                          # Port du serveur
JWT_SECRET=your_jwt_secret         # Clé JWT
STRIPE_SECRET_KEY=sk_test_...      # Clé Stripe
CLIENT_URL=http://localhost:5173   # URL du client
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000/api  # URL de l'API
VITE_APP_NAME=MadaHorizon               # Nom de l'app
```

## Performance et Optimisations

- ✅ Code splitting avec Vite
- ✅ Lazy loading des routes
- ✅ Compression des réponses
- ✅ Cache des données
- ✅ Optimisation des images
- ✅ Validation côté client pour réduire les requêtes

## Dépannage

### Le serveur ne démarre pas
1. Vérifier que le port 5000 est libre
2. S'assurer que .env est correctement configuré
3. Supprimer node_modules et réinstaller: `npm install`

### Le client n'accède pas à l'API
1. Vérifier que VITE_API_URL est correcte dans .env
2. S'assurer que le serveur est en cours d'exécution
3. Vérifier les logs du navigateur (F12)

### Erreurs de base de données
1. Supprimer database.sqlite et relancer: `npm run seed`
2. Vérifier que le fichier est créé dans le dossier server/

## Maintenance

### Mises à jour des dépendances
```bash
npm outdated          # Voir les dépendances obsolètes
npm update            # Mettre à jour
```

### Logs
Les logs sont affichés dans la console du serveur et du navigateur.

## Support et Documentation

Pour plus d'informations sur les routes API, consultez les fichiers dans `server/routes/`.

## License
Privée - MadaHorizon
