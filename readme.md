DOCUMENTATION API

Introduction

L'API permet de gérer des événements et des utilisateurs, avec des fonctionnalités d'inscription, de connexion, de création, de récupération, de mise à jour et de suppression d'événements. Elle utilise `Sequelize` pour l'interaction avec la base de données MySQL, `nodemailer` pour l'envoi d'e-mails, et `JWT` pour l'authentification des utilisateurs.

Structure du projet

- Controllers
  - `evenementControllers.js`: Contient la logique de création, récupération, mise à jour, et suppression d'événements.
  - `utilisateurController.js`: Contient la logique d'inscription et de connexion des utilisateurs.
  
- Models
  - `evenement.js`: Modèle Sequelize pour la gestion des événements.
  - `utilisateur.js`: Modèle Sequelize pour la gestion des utilisateurs.
  
- Routes
  - `evenementRoutes.js`: Définition des routes pour la gestion des événements.
  - `utilisateurRoute.js`: Définition des routes pour la gestion des utilisateurs.

- Middleware
  - `auth.js`: Middleware pour vérifier l'authentification des utilisateurs via JWT.

Fonctionnalités

1. Utilisateurs

Inscription

- URL: `/api/utilisateurs/inscription`
- Méthode: `POST`
- Paramètres:
  - `nom` (String): Le nom de l'utilisateur.
  - `email` (String): L'email de l'utilisateur.
  - `mot_de_passe` (String): Le mot de passe de l'utilisateur.
  
- Réponse:
  - `201 Created`: ID de l'utilisateur créé avec succès.
  - `400 Bad Request`: Erreurs de validation.

Connexion

- URL: `/api/utilisateurs/login`
- Méthode: `POST`
- Paramètres:
  - `email` (String): L'email de l'utilisateur.
  - `mot_de_passe` (String): Le mot de passe de l'utilisateur.
  
- Réponse:
  - `200 OK`: Retourne un token JWT pour l'authentification future.
  - `401 Unauthorized`: Email ou mot de passe incorrect.
  - `400 Bad Request`: Erreurs de validation.

2. Événements

Créer un événement

- URL: `/api/evenements/`
- Méthode: `POST`
- Paramètres:
  - `nom` (String): Le nom de l'événement.
  - `date` (String, Date): La date de l'événement.
  - `description` (String, optionnel): La description de l'événement.
  - `lieu` (String, optionnel): Le lieu de l'événement.
  
- Réponse:
  - `201 Created`: L'événement a été créé avec succès.
  - `400 Bad Request`: Erreurs de validation ou si l'utilisateur n'est pas authentifiRécupérer tous les événements

- URL: `/api/evenements/`
- Méthode: `GET`
- Paramètres (optionnels):
  - `nom` (String): Filtrer les événements par nom.
  - `date` (String): Filtrer les événements par date.
  
- Répon:
  - `200 OK`: Liste des événements correspondant aux critères de recherche.
  - `500 Internal Server Error`: Erreur lors de la récupération des événements.

Récupérer un événement par ID

U: `/api/evenements/:id`
Métho: `GET`
Répon:
  - `200 OK`: Retourne l'événement avec l'ID spécifié.
  - `404 Not Found`: L'événement n'a pas été trouvé.
  - `500 Internal Server Error`: Erreur lors de la récupération de l'événement.

Mettre à jour un événement

U: `/api/evenements/:id`
Métho: `PUT`
Paramètr:
  - `nom` (String): Le nom de l'événement.
  - `date` (String, Date): La nouvelle date de l'événement.
  - `description` (String, optionnel): La nouvelle description de l'événement.
  - `lieu` (String, optionnel): Le nouveau lieu de l'événement.
  
Répon:
  - `200 OK`: Retourne l'événement mis à jour.
  - `404 Not Found`: L'événement n'a pas été trouvé.
  - `500 Internal Server Error`: Erreur lors de la mise à jour de l'événement.

Supprimer un événement

U: `/api/evenements/:id`
Métho: `DELETE`
Répon:
  - `204 No Content`: L'événement a été supprimé avec succès.
  - `404 Not Found`: L'événement n'a pas été trouvé.
  - `500 Internal Server Error`: Erreur lors de la suppression de l'événement.

Middleware

Authentification (JWT)

- Nom: `authMiddleware`
- Fonction: Vérifie la validité du token JWT dans l'en-tête `Authorization`. Si le token est valide, il ajoute les informations de l'utilisateur à la requête. Sinon, renvoie un statut `401` ou `403`.

Sécurité

- Les mots de passe des utilisateurs sont hachés avant d'être stockés en base de données en utilisant `bcryptjs`.
- Le token JWT est signé avec un secret défini dans les variables d'environnement.

Environnement

Assurez-vous que les variables suivantes sont définies dans votre fichier `.env`:

- `DB_HOST`: Hôte de la base de données MySQL.
- `DB_DATABASE`: Nom de la base de données.
- `DB_USER`: Utilisateur de la base de données.
- `DB_PASSWORD`: Mot de passe de la base de données.
- `EMAIL_USER`: L'adresse email de l'expéditeur pour les notifications.
- `EMAIL_PASSWORD`: Mot de passe de l'email de l'expéditeur.
- `SMTP_HOST`: Hôte du serveur SMTP pour l'envoi des e-mails.
- `SMTP_PORT`: Port du serveur SMTP.
- `JWT_SECRET`: Secret pour signer les tokens JWT.

Conclusion

Cette API permet de gérer efficacement des événements et des utilisateurs, avec des fonctionnalités sécurisées d'authentification, de gestion des données et d'envoi de notifications par e-mail.