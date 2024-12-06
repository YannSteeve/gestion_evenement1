import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Utilisateur = sequelize.define('Utilisateur', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Utilisateurs',
    timestamps: true
});

export default Utilisateur;