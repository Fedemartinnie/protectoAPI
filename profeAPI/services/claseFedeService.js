// Gettign the Newly created Mongoose Model we just created 
var Clase = require('../models/claseFedeModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const mongoose = require ('mongoose');
const Profesor = require('../models/User.model');

// Saving the context of this module inside the _the variable
_this = this

// Función para crear una nueva clase
exports.createClase = async (claseId, claseData) => {
    try {  
      console.log(claseId)
      console.log(claseId!==null);
      if (claseId) {
        // Si claseId está presente, es una actualización
        const claseActualizada = await Clase.findByIdAndUpdate(claseId, claseData, { new: true });
        return claseActualizada;
      } 
      else {
        // Si claseId no está presente, es una creación
        const nuevaClase = new Clase(claseData);
        const claseGuardada = await nuevaClase.save();
        return claseGuardada;
      }
    } 
    catch (error) {
      throw error;
    }
  };    

  //get clases de un profesor
  exports.getClasesProfesor = async (id_profesor) => {
    try {
      // Buscar clases del profesor por su ID
      /*const clases = await Clase.find({ id_profesor }).exec();
      return clases;*/
    } 
    catch (error) {
      throw error;
    }
  };
  
  //get clases 
  exports.getClases = async (filtro, profesorId) => {
    try {
        console.log("filtros: "+filtro.tipo)
      // Construir el filtro basado en los parámetros proporcionados
      const filtroQuery = {}; //solo clases publicadas
      
      if (filtro.categoria) filtroQuery.categoria = filtro.categoria;
      if (filtro.tipo) filtroQuery.tipo = filtro.tipo;
      if (filtro.frecuencia) filtroQuery.frecuencia = filtro.frecuencia;
      if (filtro.duracion) filtroQuery.duracion = filtro.duracion;
      if (filtro.costo) filtroQuery.costo = filtro.costo;
      
      if(!profesorId){ //no logeado muestras solo las publicadas
        filtroQuery.publicada = true;
      }
      else{ //sino muestra todas las de ese profesor (segun filtros)
        filtroQuery.id_profesor = profesorId
      }          
      // Buscar clases basadas en el filtro
      const clases = await Clase.find(filtroQuery).select('_id id_profesor categoria tipo frecuencia publicada').exec();
      console.log("clases: "+clases)
      return clases;
    } catch (error) {
      throw error;
    }
  };
  
  
  // mostrar datos de una clase (comentarios true si logeado == false)
exports.getClaseById = async (claseId, profesorId) => {
  try {
      const clase = await Clase.findById(claseId).select('categoria tipo frecuencia comentarios id_profesor').exec();
      
      if (!clase) {
        throw new Error('Clase no encontrada');
      }

      const id_profesor = clase.id_profesor;
    
      const profesor = await Profesor.findById(id_profesor).select('_id name titulo experiencia').exec();
      
      let comentariosFiltrados = [];
      
      if (profesorId) {
          // Si el usuario (profesor) está autenticado, mostrar todos los comentarios
          comentariosFiltrados = clase.comentarios;
      } else {
          // Mostrar solo los comentarios con estado true
          comentariosFiltrados = clase.comentarios.filter((comentario) => comentario.estado === true);
      }
      clase.comentarios = comentariosFiltrados;
    
      const resultado = { clase, profesor};
      return resultado;        
  } catch (error) {
      throw error;
  }
};

  //add comentarios de la Clase
  exports.addComentario = async (claseId, comentarioData) => {
    try {
      // Verificar si la clase existe
      const clase = await Clase.findById(claseId).exec();
      if (!clase) {
        throw new Error('Clase no encontrada');
      }

      // Construir el objeto de comentario
      const nuevoComentario = {               
        nick: comentarioData.nick, // Puedes cambiar esto según tu lógica de usuario
        comentario: comentarioData.comentario, // Puedes cambiar esto según tus requisitos
        calificacion: comentarioData.calificacion,
      };

      // Agregar el comentario a la clase
      clase.comentarios.push(nuevoComentario);
      await clase.save();

      return { mensaje: 'Comentario agregado con éxito' };
    } catch (error) {
      throw error;
    }
};

exports.createAlumno = async function (Alumno, idClase) {
  // Creating a new Mongoose Object by using the new keyword    
  
  try {        
      console.log(Alumno.horario);
      var oldClase = await Clase.findById(idClase)
      console.log("idClase: "+idClase)
      //console.log("clase encontrada: ",oldClase.categoria)
      
      if(!oldClase){
          return false;
      }
      oldClase.alumnosInscritos.push(Alumno);        
      var savedAlumnoClase = await oldClase.save()            
      return savedAlumnoClase.alumnosInscritos;
  } catch (e) {
      // return a Error message describing the reason 
      console.log(e)    
      throw Error("Error while Creating Alumno inscripto a clase")
  }
}


exports.getAlumnosInscritos = async (claseId, profesorId) => {
  try {
      // Verifica que la clase existe y pertenece al profesor logeado
      const clase = await Clase.findOne({ _id: claseId , id_profesor: profesorId  }).select('_id alumnosInscritos').exec();

      if (!clase) {
          throw new Error('Clase no encontrada o no autorizada para el profesor actual.');
      }

      // Devuelve la lista de alumnos inscritos
      const alumnosInscritos = clase.alumnosInscritos;

      return alumnosInscritos;
  } catch (error) {
      throw error;
  }
};


exports.updateClaseEstado = async (claseId, alumnoId, nuevoEstado) => {
  try {
      // Verifica que la clase existe
      const clase = await Clase.findById(claseId).exec();
      console.log('idclase: '+claseId)
      if (!clase) {
          throw new Error('Clase no encontrada.');
      }

      const alumno = clase.alumnosInscritos.id(alumnoId);

      if (!alumno) {
          throw new Error('Alumno no encontrado en la clase.');
      }

      // Actualiza el estado del alumno
      alumno.estado = nuevoEstado;

      // Guarda los cambios en la base de datos
      await clase.save();

      return clase.alumnosInscritos;

  } catch (error) {
      throw error;
  }
};

exports.deleteContrato = async (claseId, alumnoId) => {
  try {
      const clase = await Clase.findById(claseId).exec();
      if (!clase) {
          throw new Error('Clase no encontrada.');
      }
      // Filtrar los alumnos inscritos y eliminar al alumno específico
      clase.alumnosInscritos = clase.alumnosInscritos.filter(alumno => alumno._id.toString() !== alumnoId);      
      // Guarda los cambios en la base de datos
      await clase.save();
      return clase.alumnosInscritos;
  } catch (error) {
      throw error;
  }
};

exports.cambiarEstadoClase = async (claseId) => {
  try {
      const clase = await Clase.findById(claseId).exec();

      if (!clase) {
          throw new Error('Clase no encontrada.');
      }

      // Actualizar el estado de la clase
      clase.publicada = !clase.publicada;

      // Guarda los cambios en la base de datos
      await clase.save();

      // Devuelve la información actualizada de la clase
      return clase;
  } catch (error) {
      throw error;
  }
};


exports.deleteClase = async (claseId) => {
  try {
    const clase = await Clase.findByIdAndDelete(claseId).exec();
    return clase;
  } catch (error) {
    throw error;
  }
};