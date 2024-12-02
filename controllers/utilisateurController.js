import Utilisateur from '../models/utilisateur.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// Inscription d'un nouvel utilisateur
export const inscription = async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  // Vérification des erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Erreurs de validation : ", errors.array()); // Afficher les erreurs de validation dans la console
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const utilisateur = await Utilisateur.create({ nom, email, mot_de_passe: hashedPassword });
    
    console.log("Utilisateur créé avec succès : ", utilisateur); // Afficher l'utilisateur créé dans la console
    res.status(201).json({ id: utilisateur.id });
  } catch (error) {
    console.error("Erreur lors de l'inscription : ", error); // Afficher l'erreur dans la console
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

// Authentification d'un utilisateur
export const login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  // Vérification des erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Erreurs de validation : ", errors.array()); // Afficher les erreurs de validation dans la console
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Recherche de l'utilisateur
    const utilisateur = await Utilisateur.findOne({ where: { email } });

    if (utilisateur && await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe)) {
      const token = jwt.sign({ id: utilisateur.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      console.log("Connexion réussie, token généré : ", token); // Afficher le token généré dans la console
      res.json({ token });
    } else {
      console.log("Échec de la connexion : email ou mot de passe incorrect"); // Afficher l'échec de connexion dans la console
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error("Erreur lors de la connexion : ", error); // Afficher l'erreur dans la console
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};
