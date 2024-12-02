import express from 'express';
import {
  createEvenement,
  getAllEvenements,
  getEvenementById,
  updateEvenementById,
  deleteEvenementById,
  validateEvenement
} from '../controllers/evenementControllers.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Routes pour les événements
router.post('/', createEvenement);
router.get('/', getAllEvenements);
router.get('/:id', getEvenementById);
router.put('/:id', updateEvenementById);
router.delete('/:id', deleteEvenementById);

export default router;
