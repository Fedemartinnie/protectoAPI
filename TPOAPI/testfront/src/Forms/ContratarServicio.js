import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';


function ContratarServicio() {
  const [state, setState] = useState({ }); 
  const [error, setError] = useState('');
  const {idClase} = useParams();
  console.log("idClase: ",idClase,"=====================");  
  const navigate = useNavigate();
  
      
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'telefono' && !/^\d*$/.test(value)) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError('');
  };

  //LLAMADO AXIOS
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifica si algún campo está vacío
    if (!state.nombre || !state.telefono || !state.email || !state.horario || !state.mensaje) {
      setError('Todos los campos son obligatorios');
      return;
    }
    //console.log('Enviando solicitud Axios:', `http://localhost:4000/api/claseFede/createAlumno/${idClase}`);
    try {           
      const response = await axios.put(`http://localhost:4000/api/claseFede/createAlumno/${idClase}`, {
        nombre: state.nombre,
        telefono: state.telefono,
        email: state.email,
        horario: state.horario,
        mensaje: state.mensaje,
      });
      alert('Clase contratada ! te esperamos ');      
      console.log('Respuesta del servidor:', response.data);
      // Restablece el estado
      setState({
        nombre: '',
        telefono: '',
        email: '',
        horario: '',
        mensaje: '',
      });

      setError('');
     
      navigate('/Clases');
    } 
    catch (error) {      
      console.error('Error al crear alumno:', error.message);
      setError('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.');
    }
    
  };   
   

  const formContainerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'cadetblue',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
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
      <h2 style={{ textAlign: 'center' }}>Contratar Servicio</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="nombre"
            name="nombre"
            value={state.nombre}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label>Teléfono de contacto:</label>
          <input
            type="tel"
            name="telefono"
            value={state.telefono}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label>Email de contacto:</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label>Horario:</label>
          <input
            type="text"
            name="horario"
            value={state.horario}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label>Mensaje al proveedor:</label>
          <textarea
            name="mensaje"
            value={state.mensaje}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <Button variant='contained' color='success' type="submit" >
          Contratar Servicio
        </Button>
      </form>
      {/*<Footer />*/}
    </div>
  );
}

export default ContratarServicio;
