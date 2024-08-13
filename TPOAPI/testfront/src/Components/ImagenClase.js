import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function ImagenComponent() {
  const { idClase } = useParams(); // Obteniendo el id de la clase desde la URL
  const EmbedUrl = 'https://res.cloudinary.com/ddy10tgci/image/upload/v1702524344/API/bhpucln1ncxwhuicthtr.jpg';

  const [claseData, setClaseData] = useState({
    profesor: { name: '', titulo: '', experiencia: '' },
    clase: { categoria: '', tipo: '', frecuencia: '', duracion: '', costo: '', imagenUrl: '' }
  });

  useEffect(() => {
    const fetchClaseData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/claseFede/getClaseId/${idClase}`, {
          headers: { 'x-access-token': Cookies.get('token') }
        });
        setClaseData(response.data);
      } catch (error) {
        console.log('Error al obtener datos de la clase', error);
      }
    };

    if (idClase) {
      fetchClaseData();
    }
  }, [idClase]);

  if (!claseData) {
    return <p>Cargando datos de la clase...</p>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ flex: 1, padding: '0 20px' }}>
        <h1>{claseData.clase.categoria}</h1>
        <p>Tipo: {claseData.clase.tipo}</p>
        {claseData.profesor && (
        <>
          <p>Nombre Profesor: {claseData.profesor.name}</p>
        </>)}
        <p>Frecuencia: {claseData.clase.frecuencia}</p>
        <p>Duración: {claseData.clase.duracion}</p>
        <p>Costo: {claseData.clase.costo}</p>
      </div>
      <div style={{ flex: 0}}>
        <iframe
          title="Imagen de Clase"
          width="560"
          height="280"
          src={EmbedUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default ImagenComponent;