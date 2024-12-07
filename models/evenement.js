import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Définition du modèle Evenement
const Evenement = sequelize.define('Evenement', {
  
  titre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le titre est obligatoire' }
    }
  },

  
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: { msg: 'Format de date invalide' }
    }
  },

  
  heure: {
    type: DataTypes.TIME,
    allowNull: false
  },

  
  type: {
    type: DataTypes.ENUM('Conference', 'Seminaire', 'Atelier', 'Formation', 'Social', 'Autre'),
    defaultValue: 'Autre',
    allowNull: false
  },

  // Lieu de l'événement (obligatoire)
  lieu: {
    type: DataTypes.STRING(200), // Maximum 200 caractères
    allowNull: false
  },

  // Description de l'événement (optionnelle)
  description: {
    type: DataTypes.TEXT, // Texte long
    allowNull: true // Champ optionnel
  },

  // Nombre maximum de participants
  capaciteMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50,
    validate: {
      min: { args: [1], msg: 'La capacité doit être d\'au moins 1 personne' },
      max: { args: [1000], msg: 'La capacité ne peut pas dépasser 1000 personnes' }
    }
  },

  // URL de l'image de l'événement (optionnelle)
  image: {
    type: DataTypes.STRING,
    allowNull: true, // Champ optionnel
    validate: {
      isUrl: { msg: 'L\'URL de l\'image n\'est pas valide' }
    }
  },

  // Lien unique pour partager l'événement
  lienUnique: {
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: { msg: 'Ce lien doit être unique dans la base de données' } // Doit être unique dans la base de données
  },

  // ID de l'utilisateur qui a créé l'événement
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Utilisateurs', // Nom de la table référencée
      key: 'id' // Colonne référencée
    }
  }
}, {
  // Options du modèle
  tableName: 'evenements', // Nom de la table dans la base de données
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Export du modèle pour l'utiliser dans d'autres fichiers
export default Evenement;