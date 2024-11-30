// utilisateur.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Utilisez l'instance de sequelize pour définir le modèle
const Utilisateur = sequelize.define('Utilisateur', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Utilisateur;
