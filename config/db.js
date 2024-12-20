
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Chargez les variables d'environnement
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

// Exportez sequelize pour l'utiliser ailleurs
export default sequelize;
