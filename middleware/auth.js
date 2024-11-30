import jwt from 'jsonwebtoken';

function auth(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.sendStatus(401); // Non autorisé si pas de token
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Interdit si le token est invalide
    }

    req.user = user; // Ajout des informations utilisateur à la requête
    next();
  });
}

export default auth;
