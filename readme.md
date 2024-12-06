# Gestion d'Événements - Backend API

Application de gestion d'événements développée avec Node.js, Express et MySQL.

## Technologies Utilisées

- Node.js v20.15.0
- Express.js
- MySQL
- Sequelize (ORM)
- JWT (Authentication)
- Bcrypt

## Configuration

1. **Variables d'environnement**
```env
PORT=9500
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=yannsteeve_gestion_evenement
JWT_SECRET=votre_secret_jwt
BASE_URL=http://localhost:9500
```

2. **Installation**
```bash
npm install
node sync-db.js
npm start
```

## Authentification

Utilisateur de test :
- Email: admin@test.com
- Mot de passe: password123

Pour les routes protégées, ajoutez le header :
```
Authorization: Bearer votre_token_jwt
```

## API Endpoints

### Utilisateurs
- POST `/api/utilisateurs/inscription` : Inscription
- POST `/api/utilisateurs/login` : Connexion
- POST `/api/utilisateurs/logout` : Déconnexion

### Événements
- POST `/api/evenements` : Créer un événement
- GET `/api/evenements` : Liste des événements
- GET `/api/evenements/:id` : Détails d'un événement
- PUT `/api/evenements/:id` : Modifier un événement
- DELETE `/api/evenements/:id` : Supprimer un événement

## Types d'événements
- Conference
- Seminaire
- Atelier
- Formation
- Social
- Autre

## Structure du Projet
```
gestion_evenement/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
├── package.json
├── server.js
└── sync-db.js