const express = require('express');
const router = express.Router();
const verificarToken = require('../../Middleware/authMiddleware')
const controladorProfesor = require('../../controllers/controladorProfesor')

router.post('/obtenerPorId', controladorProfesor.obtenerProfesorPorId);