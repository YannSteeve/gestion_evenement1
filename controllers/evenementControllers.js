import Evenement from '../models/evenement';
import transporter from '../config/nodemailer';
import { Op } from 'sequelize';

// Créer un nouvel événement (requiert authentification)
export const createEvenement = async (req, res) => {
  const { nom, date, description, lieu } = req.body;

  try {
    const evenement = await Evenement.create({ nom, date, description, lieu });

    // Envoyer une notification par e-mail à l'utilisateur créateur de l'événement.
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: 'Nouvel Événement Créé',
      text: `L'événement "${nom}" a été créé avec succès. Vous pouvez le consulter ici : http://localhost:${process.env.PORT}/api/evenements/${evenement.id}`,
    });

    res.status(201).json(evenement);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
  }
};

// Récupérer tous les événements avec possibilité de filtrage.
export const getAllEvenements = async (req, res) => {
  const { nom, date } = req.query; // Récupérer les paramètres de requête

  const where = {};
  
  if (nom) {
    where.nom = { [Op.like]: `%${nom}%` }; // Filtrage par nom.
  }
  
  if (date) {
    where.date = date; // Filtrage par date.
  }

  try {
    const evenements = await Evenement.findAll({ where });
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
  }
};

// Récupérer un événement par ID et générer un lien partageable.
export const getEvenementById = async (req, res) => {
  try {
    const evenement = await Evenement.findByPk(req.params.id);

    if (!evenement) return res.status(404).json({ message: 'Événement non trouvé' });

    // Générer un lien partageable.
    const shareableLink = `http://localhost:${process.env.PORT}/api/evenements/${evenement.id}`;
    
    res.json({ ...evenement.toJSON(), shareableLink });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement' });
  }
};

// Mettre à jour un événement par ID (requiert authentification).
export const updateEvenementById = async (req, res) => {
  const { nom, date, description, lieu } = req.body;

  try {
    const [updated] = await Evenement.update(
      { nom, date, description, lieu },
      { where: { id: req.params.id } }
    );

    if (!updated) return res.status(404).json({ message: 'Événement non trouvé' });

    const updatedEvenement = await Evenement.findByPk(req.params.id);
    
    res.json(updatedEvenement);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'événement' });
  }
};

// Supprimer un événement par ID (requiert authentification).
export const deleteEvenementById = async (req,res) => {
  try {
    await Evenement.destroy({
      where: { id: req.params.id }
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement' });
  }
};
