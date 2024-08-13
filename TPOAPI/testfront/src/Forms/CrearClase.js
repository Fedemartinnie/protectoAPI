import React, { useEffect, useState } from 'react';
import { useFetcher, useNavigate, useParams } from 'react-router-dom';
//import Footer from '../componentes/Footer';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button } from '@mui/material';

function CrearClase() {
  const [image, setImage] = useState(null);
  //const [selectedFile, setSelectedFile] = useState();
  const {idClase} = useParams();  
  console.log("idClase: ",idClase);
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [state, setState] = useState({
    categoria: '',
    tipo: '',
    frecuencia: '',
    costo: '',
    id_profesor:'',
    imagen: {url: ''},
  });
  const [error, setError] = useState('');  
  
  useEffect(() => {       
    const fetchClaseData = async () => {
        try{
            const response = await axios.get(`http://localhost:4000/api/claseFede/getClaseId/${idClase}`,
            {
              headers: {'x-access-token': Cookies.get('token')}
            });                 
            setState(prevState => ({
              ...prevState,
              ...response.data              
            }));
            console.log("=======================`\ndatosClase: ",state)
            console.log(response.data)
        }
        catch{
            return console.log('clase no encontrada');
        }      
    };

    // Llamada a la función para obtener la información de la clase
    fetchClaseData();
  }, [idClase]);

  //carga de imagen
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);    
  };

  const handleUpload = async () => {
    if (!image) {
      console.error('Selecciona una imagen antes de cargar');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/api/claseFede/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.imageUrl;     
      console.log("=================================") 
      console.log("imageUrl: ",imageUrl);
      setState(prevState => ({
        ...prevState,
        imagen: {
          ...prevState.imagen,
          url: imageUrl
        }
      }));
  
      console.log('URL de la imagen subida:', state.imagen.url);
      alert ("imagen cargada exitosamente");
    } 
    catch (error) {
      console.error('Error al cargar la imagen:', error.message);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value }); 
  };

  //create / update class
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si algún campo está vacío
    if (!state.categoria || !state.tipo || !state.frecuencia || !state.costo) {
      setError('Todos los campos son obligatorios');
      return;
    }
    //await handleUpload();

    try {  
      const url = idClase
        ? `http://localhost:4000/api/claseFede/createClaseFede/${idClase}`
        : 'http://localhost:4000/api/claseFede/createClaseFede';
      console.log("ClaseId: ",idClase);

      const method = 'post';      
      console.log("state: ===> ",state);
      const response = await axios[method](url, state, {
        headers: {
          'x-access-token': token,        
        },
      });

      // Maneja la respuesta según sea creación o edición
      if (idClase) {
        console.log('Clase actualizada con éxito:', response.data);
      } else {
        console.log('Nueva clase creada con éxito:', response.data);
      }      
      navigate('/Clases');
    } catch (error) {
      console.error('Error al crear o editar la clase:', error.message);
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
      <h2 style={{ textAlign: 'center' }}>{idClase ? 'Editar Clase' : 'Crear Clase'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div >
          <label>Imagen:</label>
          <input type="file" name="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Subir Imagen</button>    
        </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Categoria:</label>
          <select name="categoria" value={state.categoria} onChange={handleChange} style={inputStyle} required>
            <option value="">Seleccione una categoria</option>
            <option value="Matematica">Matemática</option>
            <option value="Programacion">Programación</option>
            <option value="Arte">Arte</option>
            <option value="Diseño">Diseño</option>
            <option value="Deporte">Deporte</option>
            <option value="Cocina">Cocina</option>
          </select>
        </div>
        <div>
          <label>Tipo:</label>
          <select name="tipo" value={state.tipo} onChange={handleChange} style={inputStyle} required>
            <option value="">Seleccione un tipo</option>
            <option value="individual">Individual</option>
            <option value="grupal">Grupal</option>            
          </select>
        </div>
        <div>
          <label>Frecuencia:</label>
          <select name="frecuencia" value={state.frecuencia} onChange={handleChange} style={inputStyle} required>
            <option value="">Seleccione una frecuencia</option>
            <option value="diaria">Diaria</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>            
          </select>
        </div>
        <div>
          <label>Duración:</label>
          <input
            type="text"
            name="duracion"
            value={state.duracion}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>        
        <div>
          <label>Costo:</label>
          <input
            type="text"
            name="costo"
            value={state.costo}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        
        <button type="submit" style={buttonStyle}>
          {idClase ? 'Realizar Cambios' : 'Crear Clase'}
        </button>
      </form>
      {/*<Footer />*/}
    </div>
  );
}

export default CrearClase;
