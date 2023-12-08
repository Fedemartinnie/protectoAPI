/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
var jwt = require('jsonwebtoken');
var config = require('../config').config();
const revokedTokens = [];

var authorization = function (req, res, next) {

    var token = req.headers['x-access-token'];
    console.log("token",token);

    // Verifica si la ruta es de logout y realiza las acciones correspondientes
    if (req.path === '/logout') {
        // Invalida el token y responde con éxito
        const decoded = jwt.decode(token, { complete: true });
        revokedTokens.push(decoded);

        return res.json({ message: 'Logout exitoso' });
    }

    var msg = {auth: false, message: 'No token provided.'};
    if (!token)
        res.status(500).send(msg);

    let sec = process.env.SECRET;
    console.log("secret",sec)
    jwt.verify(token, sec, function (err, decoded) {
        var msg = {auth: false, message: 'Failed to authenticate token.'};
        if (err)
        res.status(500).send(msg);
        req.userId = decoded.id;
        next();
    });
}

module.exports = authorization;

