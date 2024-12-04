import nodemailer from 'nodemailer'; 
import Evenement from '../models/evenement.js'; 
import { Op } from 'sequelize'; 

// Configuration de Nodemailer 
const transporter = nodemailer.createTransport({ 
  host: process.env.SMTP_HOST, 
  port: process.env.SMTP_PORT || 587, 
  secure: false, // true pour le port 465, false pour d'autres ports 
  auth: { 
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  }, 
});

// Créer un nouvel événement 
export const createEvenement = async (req, res) => { 
  const { nom, date, description, lieu } = req.body; 

  try { 
    // Créer l'événement dans la base de données 
    const evenement = await Evenement.create({ nom, date, description, lieu }); 

    // Vérifier si l'utilisateur est authentifié et a un email 
    if (!req.user || !req.user.email) { 
      return res.status(400).json({ message: "Utilisateur non authentifié ou email manquant." }); 
    }

    // Envoyer un e-mail à l'utilisateur 
    await transporter.sendMail({ 
      from: process.env.EMAIL_USER, 
      to: req.user.email, 
      subject: 'Nouvel Événement Créé', 
      text: `L'événement "${nom}" a été créé avec succès.`, 
    });

    // Répondre avec l'événement créé 
    res.status(201).json(evenement); 

  } catch (error) { 
    console.error('Erreur lors de la création de l\'événement:', error); // Log des erreurs
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement' }); 
  } 
};

// Récupérer tous les événements 
export const getAllEvenements = async (req, res) => { 
  const { nom, date } = req.query; 

  const where = {}; 

  // Filtrage par nom
  if (nom) where.nom = { [Op.like]: `%${nom}%` }; 

  // Filtrage par date
  if (date) where.date = date; 

  try { 
    const evenements = await Evenement.findAll({ where }); 
    res.json(evenements); 

  } catch (error) { 
    console.error('Erreur lors de la récupération des événements:', error); // Log des erreurs
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' }); 
  } 
};

// Récupérer un événement par ID 
export const getEvenementById = async (req, res) => { 
  try { 
    const evenement = await Evenement.findByPk(req.params.id); 

    if (!evenement) { 
      return res.status(404).json({ message: 'Événement non trouvé' }); 
    }

    res.json(evenement); 

  } catch (error) { 
    console.error('Erreur lors de la récupération de l\'événement:', error); // Log des erreurs
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement' }); 
  } 
};

// Fonction pour mettre à jour un événement par ID
export const updateEvenementById = async (req, res) => {
  // Récupération des données du corps de la requête
  const { nom, date, description, lieu } = req.body;

  try {
    // Mise à jour de l'événement dans la base de données
    const [updated] = await Evenement.update(
      { nom, date, description, lieu },
      { where: { id: req.params.id } }
    );

    // Vérification si l'événement a été trouvé et mis à jour
    if (!updated) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    // Récupération de l'événement mis à jour
    const updatedEvenement = await Evenement.findByPk(req.params.id);
    
    // Réponse avec l'événement mis à jour
    res.json(updatedEvenement);

  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'événement' });
  }
}

// Fonction pour supprimer un événement par ID
export const deleteEvenementById = async (req, res) => {
  try {
    // Suppression de l'événement dans la base de données
    const deleted = await Evenement.destroy({
      where: { id: req.params.id }
    });

    // Vérification si l'événement a été trouvé et supprimé
    if (!deleted) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    // Envoi d'un statut 204 No Content pour indiquer une suppression réussie
    res.sendStatus(204);

  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement' });
  }
}