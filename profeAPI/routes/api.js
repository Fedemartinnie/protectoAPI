/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var claseFede = require('./api/claseFedeRoute')


router.use('/users', users);
router.use('/claseFede',claseFede)

module.exports = router;
