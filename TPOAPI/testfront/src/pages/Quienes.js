import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const styles = {
  heroContainer: {
    paddingTop: '4rem', // Ajustamos el paddingTop para mover todo hacia arriba
    paddingBottom: '6rem',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#007bff', // Color azul resaltado
    marginTop: '2rem', // Margen superior para distanciar de la imagen
  },
  heroDescription: {
    fontSize: '1.5rem',
    color: 'text.secondary',
    marginTop: '2rem', // Margen superior para distanciar de la imagen
  },
  media: {
    paddingTop: '66.67%', // Cambiamos el valor para mover la imagen más abajo
    marginTop: '2rem', // Margen superior adicional para distanciar la imagen
  },
  footer: {
    position: 'fixed',
  },
};

export default function Pricing() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={styles.heroContainer}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={styles.heroTitle}
        >
          Quienes Somos
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          sx={styles.heroDescription}
        >
          La primera universidad online compuesta por empresarios y mentes exitosas de los negocios que se dedican a formar nuevos empresarios exitosos.
          Rompemos el molde tradicional para que te vuelvas una persona de elite en las carreras top del momento.
          Sin tener que memorizar por años teoría inservible ni sufrir por la crisis económica o el desempleo.
          Aprenderás solo lo necesario para que triunfes en el mundo
        </Typography>
        <CardMedia
          component="div"
          sx={styles.media}
          image="https://source.unsplash.com/random?wallpapers"
        />
      </Container>
    </ThemeProvider>
  );
}
