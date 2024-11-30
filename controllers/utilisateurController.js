import Utilisateur from '../models/utilisateur.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// Inscription d'un nouvel utilisateur
export const inscription = async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const utilisateur = await Utilisateur.create({ nom, email, mot_de_passe: hashedPassword });
    res.status(201).json({ id: utilisateur.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

// Authentification d'un utilisateur
export const login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const utilisateur = await Utilisateur.findOne({ where: { email } });

    if (utilisateur && await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe)) {
      const token = jwt.sign({ id: utilisateur.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};
