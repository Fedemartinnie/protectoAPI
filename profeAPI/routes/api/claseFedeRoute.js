var express = require('express')
var router = express.Router()
var ClaseFedeController = require('../../controllers/claseFedeController');
var Authorization = require('../../auth/authorization');

router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/claseFedeRoute');
  });

router.post('/createClaseFede/:claseId?',Authorization, ClaseFedeController.createClase)
router.get("/getClasesProfesor", Authorization, ClaseFedeController.getClasesProfesor)
router.get("/getClases",ClaseFedeController.getClases) //filtrar clases no logeado
router.get('/getClaseId/:claseId', ClaseFedeController.getClaseById); // Nueva ruta para obtener una clase por _id
router.put('/putComentario/:claseId',ClaseFedeController.addComentario)
router.put('/createAlumno/:claseId',ClaseFedeController.createAlumno) //crear contrato
router.get('/getContratos/:claseId',Authorization,ClaseFedeController.getContratos); //ver contratos de una clase
router.put("/updateEstadoContrato/:claseId/alumnos/:alumnoId", Authorization, ClaseFedeController.updateEstadoContrato)
router.delete("/finalizarContrato/:claseId/alumnos/:alumnoId", Authorization, ClaseFedeController.deleteContrato)
router.put('/cambiarEstadoClase', Authorization, ClaseFedeController.cambiarEstadoClase)
router.delete('/deleteClase/:claseId',Authorization,ClaseFedeController.deleteClase)

// Export the Router
module.exports = router;


