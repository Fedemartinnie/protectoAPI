import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from '../Components/MainFeaturedPost';
import FeaturedPost from '../Components/FeaturedPost';
import Typography from '@mui/material/Typography';

const mainFeaturedPost = {
  title: 'Escuelas Unidas',
  description: 'Multiple Proyectos son lo mejor',
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Nuestros Profesores',
    date: 'Nov 12',
    description: 'Nuestros Profesores son los mejores',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    materia: 'Materia1',
    profesor: 'Profesor1',
    tipo: 'Tipo1',
    frecuencia: 'Frecuencia1',
  },
  {
    title: 'Nuestras Materias',
    date: 'Nov 11',
    description: 'Nuestras Materias son las mejores',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    materia: 'Materia2',
    profesor: 'Profesor2',
    tipo: 'Tipo2',
    frecuencia: 'Frecuencia2',
  },
];

const defaultTheme = createTheme();

// Estilo CSS personalizado
const styles = {
  container: {
    backgroundColor: '#f8f8f8',
    padding: '20px',
    marginTop: '20px',
  },
  title: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  instructions: {
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif', // Cambiar la fuente
    fontSize: '18px', // Cambiar el tamaño de la fuente
  },
};

export default function Blog() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          {/* Renderiza los FeaturedPosts */}
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          {/* Instrucciones para unirse a una clase */}
          <div style={styles.container}>
            <Typography variant="h4" gutterBottom style={styles.title}>
              Cómo unirse a una clase
            </Typography>
            <div style={styles.instructions}>
              <Typography variant="body1" paragraph>
                1. Selecciona el botón de "Clases" en el menú principal.
              </Typography>
            </div>
            <div style={styles.instructions}>
              <Typography variant="body1" paragraph>
                2. Filtra la búsqueda o selecciona la clase a la que deseas unirte.
              </Typography>
            </div>
            <div style={styles.instructions}>
              <Typography variant="body1" paragraph>
                3. Haz clic en el botón "Ver clase".
              </Typography>
            </div>
            <div style={styles.instructions}>
              <Typography variant="body1" paragraph>
                4. Anota tus datos en cada uno de los casilleros.
              </Typography>
            </div>
            <div style={styles.instructions}>
              <Typography variant="body1" paragraph>
                5. Espera a la respuesta del profesor.
              </Typography>
            </div>
          </div>
        </main>
      </Container>
    </ThemeProvider>
  );
}