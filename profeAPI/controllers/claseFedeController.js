const jwt = require('jsonwebtoken');
const ClaseFedeService = require('../services/claseFedeService');
const multer = require('multer');

// Configuración de multer para gestionar la carga de archivos
const storage = multer.memoryStorage(); // Almacena los archivos en memoria
const upload = multer({ storage: storage });

_this = this;

exports.createClase = async (req, res) => {
  try {
    let profesorId;
    const token = req.headers['x-access-token'];
    if (token){
      try {
        const decoded = jwt.verify(token, process.env.SECRET);
        profesorId = decoded.id;
        console.log("profesorId: "+profesorId)
      } catch (error) {
          // If error verify.token, no asigna profesorId =undefined
          console.error("Error al verificar el token:", error.message);
      }
    }    
    const claseId = req.params.claseId;
    const {
      categoria,
      tipo,
      frecuencia,
      duracion,
      costo, 
    } = req.body;

    const claseData = {
      categoria,
      tipo,
      frecuencia,
      duracion,
      costo,
      id_profesor: profesorId,      
    };
    console.log("claseId: ",claseId, "\n",claseData);

    //const contentType = req.headers['content-type'];
    
    const nuevaClase = await ClaseFedeService.createClase(claseId, claseData);


    //const nuevaClase = await ClaseFedeService.createClase(claseId, claseData);
    if (claseId) {
      res.status(200).json(nuevaClase); // Actualización exitosa
    } 
    else {
      res.status(201).json(nuevaClase); // Creación exitosa
    }
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//module.exports = { createClase };


exports.getClasesProfesor = async (req, res) => {
    try {
      const id_profesor = req.userId; // Obtener el ID del profesor del token
      const clases = await ClaseFedeService.getClasesProfesor(id_profesor);
      res.status(200).json(clases);
      return clases;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
exports.getClases = async (req, res) => {
    try {    
      let profesorId;
      const token = req.headers['x-access-token'];
      if (token){
        try {          
          const decoded = jwt.verify(token, process.env.SECRET);
          profesorId = decoded.id;          
        } catch (error) {            
            console.error("Error al verificar el token:", error.message);
        }
      }      
      const filtro = req.query; // Obtener los parámetros de consulta de la URL
      const clases = await ClaseFedeService.getClases(filtro, profesorId);
      return res.status(200).json(clases);
    } 
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  //get detalle de una clase por id (categoria tipo costo profesor titulo exp mensajes filtrados)
  exports.getClaseById = async (req, res) => {
    try {
        let profesorId;
        const token = req.headers['x-access-token'];
        if (token){
          try {          
            const decoded = jwt.verify(token, process.env.SECRET);
            profesorId = decoded.id;          
          } 
          catch (error) {            
              console.error("Error al verificar el token:", error.message);
          }
        }   
        const claseId = req.params.claseId;
        console.log("claseID: ",claseId);

        const clase = await ClaseFedeService.getClaseById(claseId, profesorId);
        console.log("datos Clase: ",clase)
        if (!clase) {
            return res.status(404).json({ message: 'Clase no encontrada' });
        }
        res.status(200).json(clase);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


  // Agregar comentario a la clase actual
exports.addComentario = async (req, res) => {
  try {
    const claseId = req.params.claseId; // Obtener el _id de los parámetros de la URL
    console.log("claseID --> "+claseId)
    const comentarioData = req.body; // Datos del comentario desde el cuerpo de la solicitud    

    const resultado = await ClaseFedeService.addComentario(claseId, comentarioData);

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//cargar un contrato en una clase (alumno)

exports.createAlumno = async function (req, res, next) {
  // Req.Body contains the form submit values.
  console.log("llegue al controller",req.body)
  var Alumno = {        
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      email: req.body.email,
      horario: req.body.horario,
      mensaje: req.body.mensaje
  }

  var idClase = req.params.claseId;
  console.log("idClase: "+idClase)
  try {
      // Calling the Service function with the new object from the Request Body
      var createdAlumno = await ClaseFedeService.createAlumno(Alumno, idClase)
      console.log("====================\nclase contratada: ",idClase," \n ",Alumno)
      console.log("created contrato: ",createdAlumno);
      return res.status(201).json({createdAlumno, message: "Succesfully Created alumno"})
  } catch (e) {
      //Return an Error Response Message with Code and the Error Message.
      console.log(e)
      return res.status(400).json({status: 400, message: "alumno Creation was Unsuccesfull"})
  }
}

//obtener los contratos de una clase de un profesor logeado
exports.getContratos = async (req, res, next) => {      
  try {
    let profesorId;
    const token = req.headers['x-access-token'];
    if (token){
      try {
        const decoded = jwt.verify(token, process.env.SECRET);
        profesorId = decoded.id;
        console.log("idprofesor: "+profesorId)
      } catch (error) {
          // Si hay un error al verificar el token, no asigna profesorId (queda como undefined)
          console.error("Error al verificar el token:", error.message);
      }
    }
      const claseId = req.params.claseId; // Obtén el ID de la clase desde los parámetros de la URL

      const alumnosInscritos = await ClaseFedeService.getAlumnosInscritos(claseId, profesorId);
      console.log("=======================\ncontratos : ", alumnosInscritos)
      return res.status(200).json({alumnosInscritos, message: 'estos son los contratos'});
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.updateEstadoContrato = async (req, res, next) => {
  try {
    let profesorId;
    const token = req.headers['x-access-token'];
    if (token){
      try {
        const decoded = jwt.verify(token, process.env.SECRET);
        profesorId = decoded.id;
        console.log("idprofesor: "+profesorId)
      } catch (error) {
          // Si hay un error al verificar el token, no asigna profesorId (queda como undefined)
          console.error("Error al verificar el token:", error.message);
      }
    }

      if(!profesorId){
        throw new Error ('profesor no logeado')        
      }

      const claseId = req.params.claseId; // Obtén el ID de la clase desde los parámetros de la URL
      const alumnoId = req.params.alumnoId
      const nuevoEstado = req.body.estado; // Obtén el nuevo estado desde el cuerpo de la solicitud

      const claseActualizada = await ClaseFedeService.updateClaseEstado(claseId, alumnoId, nuevoEstado);

      res.status(200).json(claseActualizada);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



exports.deleteContrato = async (req, res, next) => {
  try {
    let profesorId;
    const token = req.headers['x-access-token'];
    if (token){
      try {
        const decoded = jwt.verify(token, process.env.SECRET);
        profesorId = decoded.id;
        console.log("idprofesor: "+profesorId)
      } catch (error) {
          // Si hay un error al verificar el token, no asigna profesorId (queda como undefined)
          console.error("Error al verificar el token:", error.message);
      }
    }
      if(!profesorId){
        throw new error ('profesor no logeado');
      }
      const claseId = req.params.claseId;
      const alumnoId = req.params.alumnoId;

      const claseActualizada = await ClaseFedeService.deleteContrato(claseId, alumnoId);

      res.status(200).json(claseActualizada);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.cambiarEstadoClase = async (req, res, next) => {
  try {
      const profesorId = req.userId;
      console.log("idprofesor: ",profesorId)
      
      if(!profesorId){
        throw new error ('profesor no logeado');
      }
      const claseId = req.body.claseId;    
      console.log(claseId);

      const claseActualizada = await ClaseFedeService.cambiarEstadoClase(claseId);

      return res.status(200).json(claseActualizada);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
  

exports.deleteClase = async (req, res, next) => {
  try {
    let profesorId;
    const token = req.headers['x-access-token'];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET);
        profesorId = decoded.id;
        console.log("idprofesor: " + profesorId);
      } catch (error) {
        console.error("Error al verificar el token:", error.message);
      }
    }

    if (!profesorId) {
      throw new Error('Profesor no logeado');
    }

    const claseId = req.params.claseId;

    const claseEliminada = await ClaseFedeService.deleteClase(claseId);

    res.status(200).json(claseEliminada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};