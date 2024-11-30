import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Définition du modèle `Evenement`
const Evenement = sequelize.define('Evenement', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  lieu: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Evenement;
