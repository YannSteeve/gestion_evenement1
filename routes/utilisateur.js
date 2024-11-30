import express from 'express';
import utilisateurController from '../controllers/utilisateurController.js';

const router = express.Router();

// Inscription d'un nouvel utilisateur.
router.post('/inscription', utilisateurController.inscription);

// Authentification d'un utilisateur.
router.post('/login', utilisateurController.login);

export default router;
