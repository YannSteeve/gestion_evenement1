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
router.post('/', authMiddleware, validateEvenement, createEvenement);
router.get('/', getAllEvenements);
router.get('/:id', getEvenementById);
router.put('/:id', authMiddleware, validateEvenement, updateEvenementById);
router.delete('/:id', authMiddleware, deleteEvenementById);

export default router;
