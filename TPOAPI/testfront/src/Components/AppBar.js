import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

//const pages =  {/*['Home', 'Clases', 'Quiénes Somos']; */}

function ResponsiveAppBar() {
  const pages = Cookies.get('token') ? (
    ['Home', 'Clases', 'Quiénes Somos', 'Crear Clase']
  ) : (
    ['Home', 'Clases', 'Quiénes Somos','Sign In']
  );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  // Revisa si el token está presente para determinar el estado de inicio de sesión
  const isLogin = Cookies.get('token');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem('token');
    Cookies.remove('token');
    navigate('/SignIn');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="SignIn"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              page === 'Clases' ? (
                <Link key={page} to="Clases" style={{ textDecoration: 'none' }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Clases
                  </Button>
                </Link>
              ) :
                page === 'Home' ? (
                  <Link key={page} to="/" style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                  </Link>
                ) :
                  page === 'Quiénes Somos' ? (
                    <Link key={page} to="Quienes" style={{ textDecoration: 'none' }}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {page}
                      </Button>
                    </Link>
                  ) :                  
                  isLogin && page === 'Crear Clase' ? (
                    <Link key={page} to="/Clases/CrearClase" style={{ textDecoration: 'none' }}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {page}
                      </Button>
                    </Link>
                  ) : !isLogin && page === 'Sign In' ? (
                    <Link key={page} to="/SignIn" style={{ textDecoration: 'none' }}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        SignIn
                      </Button>
                    </Link>
                  ) :
                  (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                  )) 
            )} 
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="inherit" mr={1}>
              ¡Hola, {isLogin ? 'Usuario' : 'Invitado'}!
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile" src="/static/images/avatar/default.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              
            >
              {isLogin ? (
                <>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">LogOut</Typography>
                  </MenuItem>
                  <Link to="PerfilProfesor" onClick={handleCloseUserMenu} style={{ textDecoration: 'none' }}>
                    <MenuItem>
                      <Typography textAlign="center">Perfil Profesor</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="ListaAlumnos" onClick={handleCloseUserMenu} style={{ textDecoration: 'none' }}>
                    <MenuItem>
                      <Typography textAlign="center">Contratos</Typography>
                    </MenuItem>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/SignIn" onClick={handleCloseUserMenu} style={{ textDecoration: 'none' }}>
                    <MenuItem>
                      <Typography textAlign="center">SignIn</Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/SignUp" onClick={handleCloseUserMenu} style={{ textDecoration: 'none' }}>
                    <MenuItem>
                      <Typography textAlign="center">SignUp</Typography>
                    </MenuItem>
                  </Link>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
