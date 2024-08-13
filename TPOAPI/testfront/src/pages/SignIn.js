import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './SignIn.css';
import Button from '@mui/material/Button';

function SignIn  () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {      
      const response = await axios.post('http://localhost:4000/api/users/login', {
        email: email,
        password: password,
      });
      
       if (response.data.message === "Succesfully login") {        
        window.localStorage.setItem('token', response.data.loginUser.token);
        Cookies.set('token', response.data.loginUser.token, { expires: 1 });        
        navigate('/Clases');
      } 
       else {        
        alert('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
      }
    }
     catch (error) {      
      alert ('Email o Contraseña incorrecta')
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <div className="signInContainer" backgroundColor='cadetBlue'>
      <h2>Sign In</h2>
      <label>
        User Mail:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <Button variant="contained" color="success" onClick={handleSignIn}>
          Sign In
      </Button>
      {/*<a href="#">Forgot password?</a>*/}
      
      <Link to="/SignUp">Don't have an account? Sign Up</Link>
    </div>
  );
}

export default SignIn;