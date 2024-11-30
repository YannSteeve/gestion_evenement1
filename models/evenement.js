import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

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
}, {
  timestamps: true,
});

export default Evenement;
