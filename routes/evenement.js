import express from 'express';
import evenementController from '../controllers/evenementController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Créer un nouvel événement (requiert authentification).
router.post('/', authMiddleware ,evenementController.createEvenement);

// Récupérer tous les événements avec possibilité de filtrage.
router.get('/', evenementController.getAllEvenements);

// Récupérer un événement par ID.
router.get('/:id', evenementController.getEvenementById);

// Mettre à jour un événement par ID.
router.put('/:id', authMiddleware ,evenementController.updateEvenementById);

// Supprimer un événement par ID.
router.delete('/:id', authMiddleware ,evenementController.deleteEvenementById);

export default router;
