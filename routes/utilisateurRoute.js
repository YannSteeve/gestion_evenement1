import express from 'express';
import { inscription, login } from '../controllers/utilisateurController.js';

const router = express.Router();

// Inscription d'un nouvel utilisateur.
router.post('/inscription', inscription);

// Authentification d'un utilisateur.
router.post('/login', login);

export default router;

