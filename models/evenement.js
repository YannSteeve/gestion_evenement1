import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Evenement = sequelize.define('Evenement', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  lieu: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createur_id: { // Ajout du champ pour le créateur
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Utilisateur', // Nom de la table des utilisateurs
      key: 'id',
    }
  }
}, {
  timestamps: true, // Ajoute createdAt et updatedAt
});

export default Evenement;