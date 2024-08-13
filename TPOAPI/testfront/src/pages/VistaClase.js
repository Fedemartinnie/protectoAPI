import React, { useEffect, useState } from 'react';
//import FeedBack from '../componentes/FeedBack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const VistaClase = () => {
  const token = Cookies.get('token');
  const [claseData, setClaseData] = useState(null);
  const { idClase } = useParams();
  console.log ("idClase =======================\n",idClase);
  
  const handleEstadoComentario = async (comentarioId, index) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/claseFede/cambiarEstadoComentario/${comentarioId}`,
        { idClase, index },
        {
          headers: {
            'x-access-token': Cookies.get('token'),
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Estado del comentario cambiado exitosamente'); 
        setClaseData((prevClaseData) => ({
          ...prevClaseData,
          clase: {
            ...prevClaseData.clase,
            comentarios: prevClaseData.clase.comentarios.map((comentario) =>
              comentario._id === comentarioId ? { ...comentario, estado: !comentario.estado } : comentario
            ),
          },
        }));
      } else {
        console.error('Error al cambiar el estado del comentario:', response.statusText);        
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
      
    }
  };

  useEffect(() => {       
    const fetchClaseData = async () => {
        try{
            const response = await axios.get(`http://localhost:4000/api/claseFede/getClaseId/${idClase}`,
            {
              headers: {'x-access-token': Cookies.get('token')}
            });                 
            setClaseData(response.data);
            console.log("=======================`\ndatosClase: ",claseData)
        }
        catch{
            return console.log('clase no encontrada');
        }      
    };

    // Llamada a la función para obtener la información de la clase
    fetchClaseData();
  }, []); // El segundo parámetro vacío asegura que useEffect se ejecute solo una vez al montar el componente

  if (!claseData) {    
    return <p>Esta es la vista de la clase</p>;
  }

  const styles = {

    container: {
      backgroundColor:'#A2E9C1' ,
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      borderRadius: '5px',
      maxWidth: '1100px',
      margin: 'auto',
    },
    infoSection: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    leftInfo: {
      flex: '1',
      marginRight: '20px',
    },
    rightInfo: {
      flex: '1',
    },
    img: {
      maxWidth: '100%',
height: 'auto',
      borderRadius: '5px',
    },
    feedbackContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f8f8f8',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    feedbackBox: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '3px',      
    },
button: {
      display: 'block',
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    },
  };


  return (
    <div style={styles.container}>
      <div style={styles.infoSection}>
        <div style={styles.leftInfo}>
        {claseData.profesor && (
        <>
          <p>Nombre Profesor: {claseData.profesor.name}</p>
        </>)}
          <p>Categoría: {claseData.clase.categoria}</p>
          <p>Tipo: {claseData.clase.tipo}</p>
          <p>Frecuencia: {claseData.clase.frecuencia}</p>
          <p>Duración: {claseData.clase.duracion}</p>
          <p>Costo: {claseData.clase.costo}</p>        
          
        </div>
        <div style={styles.rightInfo}>
          <img src={claseData.clase.imagen} alt="Imagen de la Clase" />
        </div>
      </div>

      <div className="profesor-info">
        {claseData.profesor && (
        <>
      <h2>{claseData.profesor.titulo}</h2>
            <p>{claseData.profesor.experiencia}</p>
        </> )}
      </div>

      <div className="calificacion-clase">
        <p>Calificación de la Clase: 
        <Stack spacing={1} alignItems="center">                                                
            <Rating name="half-rating-read" defaultValue={claseData.clase.cantComents > 0 ? claseData.clase.calificacion / claseData.clase.cantComents : 0}
              precision={0.5} readOnly /> 
        </Stack>
        </p>
      </div>

      <div style={styles.feedbackContainer}>
      <h2>Comentarios</h2>
        {claseData.clase.comentarios.map((comentario, index) => (
          <div key={index} style={{
            ...styles.feedbackBox,
            backgroundColor: comentario.estado ? 'cadetblue' : 'lightcoral',
          }}>
            <p>Nick: {comentario.nick}</p>
            <p>Fecha: {comentario.fecha}</p>
            <p>Comentario: {comentario.comentario}</p>
            <p><Typography component="legend">Calificación: </Typography>
              <Rating name="read-only" value={comentario.calificacion} readOnly />
            </p>
            {/*{Cookies.get(´token´)}*/}
            {
              token && (
                <p>
                  <Button
                    onClick={() => handleEstadoComentario(comentario._id, index)}
                    variant="contained"
                    color="success"
                  >
                    {comentario.estado ? 'Ocultar' : 'Mostrar'}
                  </Button>
                </p>
              )
            }
          </div>
 ))}   
      </div>
      <div>
        {!token &&(
          <Link to={`/Clases/CrearComentario/${idClase}`}>
            <Button variant="contained" color='success'>
                Agregar Comentario
            </Button>
          </Link>
        )   }

      </div>
    </div>
  );
};

export default VistaClase;
