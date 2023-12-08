var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const cloudinary = require('cloudinary').v2;


const ComentarioSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    nick: String,
    comentario: String,
    calificacion: { type: Number, min: 1, max: 5 },
    estado: {type: Boolean, default: false}
  });

  const AlumnoSchema = new mongoose.Schema({
    nombre: String,
    telefono: String,
    email: String,
    horario: String,
    mensaje: String,
    //el estado no inicializarlo, cuando el profesor responde se creara la clave estado en true o false //estado: {type: Boolean, default: false}, 
    estado: Boolean, //no inicializarlo hasta revision del profesor
    finalizado: {type: Boolean, default: false} //podriamos no inicializarlo y directamente hacer un remove cndo se hace clic en finalizar
  });

const ClaseSchema = new mongoose.Schema({
    categoria: String,
    tipo: String,
    frecuencia: String,
    duracion: Number,    
    costo: Number,
    id_profesor: String,
    imagen: String,
    alumnosInscritos: { type: [AlumnoSchema], default: [] }, // Array para almacenar IDs de alumnos inscritos
    comentarios: { type: [ComentarioSchema], default: [] }, // Array para almacenar comentarios
    publicada: {type: Boolean, default: false},
    
  });

// Configuración de Cloudinary 
cloudinary.config({
  cloud_name: 'ddy10tgci',
  api_key: '187851378689789',
  api_secret: 'y4TsRDQJeWiYxY1Sxd5cJx-iz40',
});

// Middleware para manejar la carga de imágenes antes de guardar en MongoDB
ClaseSchema.pre('save', async function(next) {
  const clase = this;

  if (clase.imagen && clase.isModified('imagen')) {
    try {
      // Carga la imagen a Cloudinary y obtén la URL
      const cloudinaryResponse = await cloudinary.uploader.upload(clase.imagen, {
        folder: 'tu_carpeta_en_cloudinary', // Puedes personalizar la carpeta en Cloudinary
      });

      // Actualiza la URL de la imagen en el esquema
      clase.imagen = cloudinaryResponse.secure_url;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


ClaseSchema.plugin(mongoosePaginate)

const Clase = mongoose.model('Clase', ClaseSchema)
const Alumno = mongoose.model('Alumno',AlumnoSchema)
const Comentario = mongoose.model('Comentario',ComentarioSchema)

module.exports = Clase, Alumno, Comentario;