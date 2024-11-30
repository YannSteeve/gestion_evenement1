import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Utilisation directe d'express.json()

import utilisateursRoutes from './routes/utilisateurRoute.js';
import evenementsRoutes from './routes/evenementRoutes.js';

app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/evenements', evenementsRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose s\'est mal passé !');
});

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

const PORT = process.env.PORT || 9500;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Serveur démarré sur le port ${PORT}`);
  }
});
