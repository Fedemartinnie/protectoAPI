import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

//import Footer from '../componentes/Footer';

function Comentario() {
  //const [value, setValue] = React.useState(2);
  const {idClase} = useParams();
  const [state, setState] = useState({
    nombre: '',
    comentario: '',
    puntaje: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handlePuntajeChange = (e) => {
    const puntaje = parseInt(e.target.value, 5);
    setState({ ...state, puntaje });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!state.nombre || !state.comentario) {
      setError('Nombre y comentario son obligatorios');
      return;
    }

    const comentario = {
      nombre: state.nombre,
      comentario: state.comentario,
      puntaje: state.puntaje,
      //fecha: new Date().toISOString(),
    };
    try {
      const response = await axios.put(`http://localhost:4000/api/claseFede/putComentario/${idClase}`, comentario);      
    navigate(`/Clases/${idClase}`);
  } catch (error) {
    // Manejar errores
    console.error('Error al realizar la actualización:', error);
  }
  };

  const formContainerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    minHeight: '100px',  // Ajusta la altura según tus preferencias
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: 'center' }}>Comentario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={state.nombre}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label>Comentario:</label>
          <textarea
            name="comentario"
            value={state.comentario}
            onChange={handleChange}
            style={textareaStyle}
            required
          />
        </div>
        <div>
          <label>Puntaje:</label>
          <Box
          sx={{
            '& > legend': { mt: 2 },
          }}

          >
            <Rating
              name="simple-controlled"
              value={state.puntaje}
              onChange={(event, newValue) => {
                setState((prevState) => ({
                  ...prevState,
                  puntaje: newValue,
                }));
              }}
            />  
          </Box>
        </div>
        <button type="submit"  style={buttonStyle}>
          Enviar Comentario
        </button>
      </form>
      {/*<Footer />*/}
    </div>
  );
}

export default Comentario;
