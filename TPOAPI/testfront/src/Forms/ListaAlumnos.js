import React, { useEffect, useState } from 'react';
//import Footer from '../componentes/Footer';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function ListaContratos() {
  const [contratos, setContratos] = useState([]);
  const [estadoContrato, setEstadoContrato] = useState();
  const {idClase} = useParams();  
  console.log("idClase params: ",idClase);    

  // Función para obtener los contratos
  const obtenerContratos = async () => {
    console.log(Cookies.get('token'));
    const token = Cookies.get('token');
    try {
      const response = await axios.get(`http://localhost:4000/api/claseFede/getContratos/${idClase}`,
      {headers: {'x-access-token': token}});
      //const { alumnosInscritos } = response.data;

    // Actualizar el estado de las clases agregando los alumnosInscritos a la clase correspondiente
    setContratos(response.data.alumnosInscritos);
    }
     catch (error) {
      console.error('Error al obtener contratos:', error.message);
    }
  };

  useEffect(() => {
    obtenerContratos();
  }, []);

  const handleAcceptContract = async (idContrato, estadoContrato) => {
    const token = Cookies.get('token');
    try {
      const response = await axios.put(`http://localhost:4000/api/claseFede/updateEstadoContrato/${idClase}/alumnos/${idContrato}`, 
      { estado: true }, {
        headers: {
          'x-access-token': token, // Asegúrate de reemplazar 'tu_token_aqui' con tu token real
        },
      });  
      if (response.status === 200) {
        
        // Actualizar el estado local (clases) para reflejar el cambio de estado
        setContratos((prevClases) => {
          return prevClases.map((contrato) => {
            console.log("contrato: estado => ",contrato.estado);
            if (contrato._id === idContrato) {
              // Cambiar el estado del contrato
              return { ...contrato, estado: !contrato.estado };
            }
            return contrato;
          });
        });
  
        console.log('Contrato actualizado exitosamente:', response.data);
      } else {
        console.error('Error al cambiar el estado de la clase:', response.statusText);
      }
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error('Error al aceptar el contrato:', error.message);
    }
  };

  const handleCancelContract = async (idContrato) => {
    const token = Cookies.get('token');
    try {
      const response = await axios.put(`http://localhost:4000/api/claseFede/updateEstadoContrato/${idClase}/alumnos/${idContrato}`, 
      { estado: false }, {
        headers: {
          'x-access-token': token, // Asegúrate de reemplazar 'tu_token_aqui' con tu token real
        },
      });  
      if (response.status === 200) {
        // Actualizar el estado local (clases) para reflejar el cambio de estado
        setContratos((prevClases) => {
          return prevClases.map((contrato) => {
            if (contrato._id === idContrato) {
              // Cambiar el estado del contrato              
              return { ...contrato, estado: false };
            }
            return contrato;
          });
        });
  
        console.log('Contrato actualizada exitosamente:', response.data);
      } else {
        console.error('Error al cambiar el estado de la clase:', response.statusText);
      }
    } catch (error) {
      // Manejar el error según tus necesidades
      console.error('Error al aceptar el contrato:', error.message);
    }
  };


  const handleFinishContract = async (idContrato) => {
    const token = Cookies.get('token');
    console.log("================================\n token: ",token);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/claseFede/finalizarContrato/${idClase}/alumnos/${idContrato}`,
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
        console.log(response.status,"===============================================");
      // Verificar si la eliminación fue exitosa (código 204)
      if (response.status === 200) {
        console.log('Contrato finalizado exitosamente');
        setContratos(prevContratos => prevContratos.filter(contrato => contrato._id !== idContrato));
        // Realizar acciones adicionales si es necesario
      } else {
        console.error('Error al finalizar el contrato:', response.statusText);
        // Manejar el error según tus necesidades
      }
    } catch (error) {
      console.error('Error al finalizar el contrato:', error.message);
      // Manejar el error según tus necesidades
    }
  };
  

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontSize: '16px',
    border: '1px solid #ddd',
  };

  const thTdStyle = {
    padding: '10px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  };

  const thStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const oddRowStyle = {
    backgroundColor: '#f2f2f2',
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Datos de Alumnos</h2>
      {contratos.length === 0 ? (
        <p>No hay contratos almacenados.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Teléfono de contacto</th>
              <th style={thStyle}>Email de contacto</th>
              <th style={thStyle}>Horario de contacto</th>
              <th style={thStyle}>Mensaje al profesor</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Aceptar en la Clase</th>
              <th style={thStyle}>Cancelar Contrato</th>
              <th style={thStyle}>Finalizar Contrato</th>
            </tr>
          </thead>
          <tbody>
            {contratos.map((contrato, index) => (
              <tr key={index} style={index % 2 === 0 ? oddRowStyle : {}}>
                <td style={thTdStyle}>{index + 1}</td>
                <td style={thTdStyle}>{contrato.nombre}</td>
                <td style={thTdStyle}>{contrato.telefono}</td>
                <td style={thTdStyle}>{contrato.email}</td>
                <td style={thTdStyle}>{contrato.horario}</td>
                <td style={thTdStyle}>{contrato.mensaje}</td>
                <td style={thTdStyle}>
                {contrato.estado!==undefined ? (contrato.estado === true ? 'Aceptado' : 'Cancelado') : 'Solicitado'}
                </td>
                <td style={thTdStyle}>
                  {contrato.estado !== true && (
                    <button style={buttonStyle} onClick={() => handleAcceptContract(contrato._id)}>
                      Aceptar
                    </button>
                  )}
                </td>
                <td style={thTdStyle}>
                  {(contrato.estado || contrato.estado===undefined)  && (
                    <button style={contrato.estado !== false ? cancelButtonStyle : { display: 'none' }} onClick={() => handleCancelContract(contrato._id)}>
                      Cancelar
                    </button>
                  )}
                </td>
                <td style={thTdStyle}>
                 
                    <button style={buttonStyle} onClick={() => handleFinishContract(contrato._id)}>Finalizar</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/*<Footer />*/}
    </div>
  );
}

export default ListaContratos;
