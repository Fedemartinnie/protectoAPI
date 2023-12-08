const jwt = require('jsonwebtoken');
const config = require('../config/config');

function verificarToken(req, res, next) {
  const token = req.header('Authorization');

  try {
    if (token){
    const decoded = jwt.verify(token, config.secretKey);
    req.id_profesor = decoded.id_profesor;
    }
    next();
  } catch (error) {
    res.status(400).send('Token inválido.');
  }
}

module.exports = verificarToken;
