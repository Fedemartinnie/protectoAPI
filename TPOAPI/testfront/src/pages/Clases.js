import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import imageProfesores from '../img/Profesores-header.jpeg';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const defaultTheme = createTheme();

export default function Album() {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [clases, setClases] = useState([]);  
  const [filtros, setFiltros] = useState({
      tipo: '',
      categoria: '',
      frecuencia: '',
      duracion: '',
      costo: '',
  });

  const handleToggleDelete = async (claseId) => {
    const token = Cookies.get('token');
    try {
      // Realizar la solicitud para eliminar la clase por su ID
      await axios.delete(`http://localhost:4000/api/claseFede/deleteClase/${claseId}`, 
      {
        headers: {
          'x-access-token': token,
        },
      });
      // Actualizar la lista de clases en el componente padre después de la eliminación
      setClases((prevClases) => {
        return prevClases.filter((clase) => clase._id !== claseId);
      });      
    } 
    catch (error) {
      console.error('Error al eliminar la clase:', error.message);
    }
  };

  //publicada - no publicada
  const handleToggleEstado = async (claseId) => {
    try {      
      const token = Cookies.get('token');     
      const url = 'http://localhost:4000/api/claseFede/cambiarEstadoClase';
      const response = await axios.put(url, { claseId }, {      
        headers: { 
          'x-access-token': token,          
        },
      });
       // Verificar si la solicitud fue exitosa antes de actualizar el estado local
    if (response.status === 200) {
      // Actualizar el estado local (clases) para reflejar el cambio de estado
      setClases((prevClases) => {
        return prevClases.map((clase) => {
          if (clase._id === claseId) {
            // Invertir el estado publicado/despublicado
            return { ...clase, publicada: !clase.publicada };
          }
          return clase;
        });
      });

      console.log('Clase actualizada exitosamente:', response.data);
    } else {
      console.error('Error al cambiar el estado de la clase:', response.statusText);
    }
  } catch (error) {
    console.error('Error al cambiar el estado de la clase:', error.message);
  }
};

  //mostrar clases
  const getClases = async () => {
    try {
      setClases([]);
      const token = localStorage.getItem('token'); 
      const headers = { 'x-access-token': token };

      const response = await axios.get('http://localhost:4000/api/claseFede/getClases' ,{
           headers: headers,
           params:  filtros, // Enviar los filtros como parámetros de la URL
      });

      console.log('Respuesta del servidor:', response.data);
      setClases(response.data);    
    } 
    catch (error) {
      console.error('Error al obtener clases:', error.message);
    }
  };

  useEffect(() => { //esta funcion debe ser si o si asi
    getClases();
  }, []);

  const handleInputChange = (field, value) => {
    setFiltros((prevFiltros) => ({ ...prevFiltros, [field]: value }));
  };

  const handleBuscarClick = () => {  
    console.log("Filtros actuales:", filtros);  
    getClases();
  };
      
    const textFieldStyle = {
      background: 'white',
    };

    const buttonStyle = {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 5px 5px 2px rgba(33, 203, 243, .3)',
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            //backgroundImage: //url(${imageProfesores}),
            bgcolor: 'cadetblue',
            pt: 8,
            pb: 6,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
          }}
        >
          <div style={{ maxWidth: '70%', margin: '0 auto', textAlign: 'center' }}>
                  
          <div>
            <h2 style={{ fontSize: '50px', color: 'Blue' }}>
              {token ? "Aceptá tus contratos!" : "Busca Tu Clase!"}
            </h2>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel id="categoria-label">Categoria</InputLabel>
                <Select
                  labelId="caregoria-label"
                  id="categoria"
                  type="text" value={filtros.categoria} onChange={(e) => handleInputChange('categoria', e.target.value)}
                  label="Categoria"
                  style={textFieldStyle}
                >
                  <MenuItem value=""> . </MenuItem>
                  <MenuItem value="matematica">Matemática</MenuItem>
                  <MenuItem value="programacion">Programación</MenuItem>
                  <MenuItem value="arte">Arte</MenuItem>
                  <MenuItem value="diseno">Diseño</MenuItem>
                  <MenuItem value="deporte">Deporte</MenuItem>
                  <MenuItem value="musica">Música</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              id="tipo"
              type="text" value={filtros.tipo} onChange={(e) => handleInputChange('tipo', e.target.value)}
              label="Tipo"
              style={textFieldStyle}
            >
              <MenuItem value="">.</MenuItem>
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="grupal">Grupal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="frecuencia-label">Frecuencia</InputLabel>
            <Select
              labelId="frecuencia-label"
              id="frecuencia"
              type="text" value={filtros.frecuencia} onChange={(e) => handleInputChange('frecuencia', e.target.value)}
              label="Frecuencia"
              style={textFieldStyle}
            >
              <MenuItem value="">.</MenuItem>
              <MenuItem value="diaria">Diaria</MenuItem>
              <MenuItem value="semanal">Semanal</MenuItem>
              <MenuItem value="mensual">Mensual</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="duracion"
            variant="outlined"
            type="text" value={filtros.duracion} onChange={(e) => handleInputChange('duracion', e.target.value)}
            fullWidth
            style={textFieldStyle}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Costo"
            variant="outlined"
            type="text" value={filtros.costo} onChange={(e) => handleInputChange('costo', e.target.value)}
            fullWidth
            style={textFieldStyle}
          />
        </Grid>

        <Grid item xs={token ? 5 : 10}>
          <Button variant="contained" color="primary" onClick={handleBuscarClick} fullWidth style={buttonStyle}>
            Buscar
          </Button>
        </Grid>
          {token ? (
            <Grid item xs={5}>            
              <Link to="/Clases/CrearClase/" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" fullWidth style={buttonStyle}>
                  Agregar Clase
                </Button>
              </Link>
            </Grid>
          ) : null}
        </Grid>
      </div>
{/* CARTAS DE LAS CLASES */}
      </div>
        </Box >
        <Container sx={{ py: 8, backgroundColor:'#D1F4E0'}} maxWidth="md">
          <Grid container spacing={3}>
            {clases.map((clase, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: clase.publicada ? 'cadetblue' : 'lightcoral',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '77.25%',
                      position: 'relative',
                    }}
                    image={clase.imagen}
                  >                  
                      <Stack spacing={1} sx={{ position: 'relative' }}>
                        <div className="white-overlay"></div>
                        <Rating name="half-rating-read" defaultValue={clase.cantComents > 0 ? clase.calificacion / clase.cantComents : 0}
                          precision={0.5} readOnly 
                          ratingBackgroundColor="white"
                        /> 
                      </Stack>
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {clase.materia}
                    </Typography>
                    <Typography>Categoría: {clase.categoria}</Typography>
                    {/*<Typography>Calificacion: {clase.calificacion}</Typography>*/}
                    <Typography>Tipo: {clase.tipo}</Typography>
                    <Typography>Frecuencia: {clase.frecuencia}</Typography>
                    <Typography>Costo: ${clase.costo} </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container justifyContent="space-around" spacing={1}>

                      <Grid item xs={12} sm={6}>
                        <Link to={'/Clases/'+clase._id}>
                          <Button variant='contained' fullWidth size="small" color="success">
                            Ver Clase
                          </Button>
                        </Link>
                      </Grid>
                      {!token && (
                      <Grid item xs={12} sm={6}>
                        <Link to={'/Clases/Inscripcion/'+clase._id}>
                          <Button variant='contained' fullWidth size="small" color="success">
                            Inscribite
                          </Button>
                        </Link>
                      </Grid>
                      )}
                      {token && (
                        <>
                          <Grid item xs={12} sm={6}>
                            <Link to={'/Clases/CrearClase/'+clase._id}>
                              <Button variant='contained' fullWidth size="small" color="success">
                                Editar
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Link to={'/Clases/Contratos/'+clase._id}>
                              <Button variant='contained' fullWidth size="small" color="success">
                                Contratos
                              </Button>
                            </Link>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Button variant='contained' fullWidth size="small" color="success" onClick={() => handleToggleEstado(clase._id)}>
                              {clase.publicada ? 'Despublicar' : 'Publicar'}
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Button fullWidth variant='contained' size="small" color="error" onClick={() => handleToggleDelete(clase._id)}>
                              Eliminar
                            </Button>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </CardActions>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
            <div>
              <Grid
                sx={{ pt: 4 }}
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
               {/*<Grid item>
                    <Button
                      variant="contained"
                    >
                      Mostrar Más
                    </Button>
                  </Grid>*/}
              </Grid>
            </div>
        </Container>
      </main>
    </ThemeProvider>
  );
}