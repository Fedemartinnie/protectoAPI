import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../componentes/Footer';

function DatosProfesor() {
  const [state, setState] = useState({
    titulo: '',
    experiencia: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'titulo' && !/^\d*$/.test(value)) {
      return;
    }
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contrato = { ...state };

    // Recupera la lista actual de contratos del localStorage
    const storedData = localStorage.getItem('contratos');
    let contratos = [];

    if (storedData) {
      contratos = JSON.parse(storedData);
    }

    // Agrega el nuevo contrato a la lista
    contratos.push(contrato);

    // Almacena la lista actualizada en localStorage
    localStorage.setItem('contratos', JSON.stringify(contratos));

    // Redirige a la página de profesores
    navigate('/SignIn');
  }

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
      <h2 style={{ textAlign: 'center' }}>Ingresar Tus Datos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={state.horarioContacto}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label>Experiencia:</label>
          <textarea
            name="mensaje"
            value={state.mensaje}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>Enviar Datos Profesor</button>
      </form>
      <Footer />
    </div>
    
  );
  
}
export default DatosProfesor;