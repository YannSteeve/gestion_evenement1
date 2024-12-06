import express from 'express';
import { inscription, login, logout } from '../controllers/utilisateurController.js';

const router = express.Router();

// Inscription d'un nouvel utilisateur.
router.post('/inscription', inscription);

// Authentification d'un utilisateur.
router.post('/login', login);

// Déconnexion d'un utilisateur.
router.post('/logout', logout); // Corrigé ici pour utiliser logout

export default router;
