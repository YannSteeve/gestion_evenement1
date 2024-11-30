import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

import utilisateursRoutes from './routes/utilisateurs.js';
import evenementsRoutes from './routes/evenements.js';

app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/evenements', evenementsRoutes);

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Serveur démarré sur le port ${PORT}`);
  }
});
