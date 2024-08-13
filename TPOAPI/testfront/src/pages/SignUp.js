import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 

function SignUp () {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [titulo, setTitulo] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const navigate = useNavigate();
  
    const handleSignUp = async () => {
      // Verificar que los campos no estén vacíos
      if (!nombre || !apellido || !email || !password || !titulo || !experiencia) {
        alert('Por favor, completa todos los campos.');
        return;
      }
  
      try {
        // Realizar la solicitud POST al backend con Axios
        const response = await axios.post('http://localhost:4000/api/users/registration', {
          name: nombre,
          apellido: apellido,
          email: email,
          password: password,
          titulo: titulo,
          experiencia: experiencia,
        });
  
        // Manejar la respuesta del backend
        console.log('Respuesta del servidor:', response.data);
  
        // Verificar si el registro fue exitoso y redirigir al usuario a la página de inicio de sesión
        if (response.data.message === "Succesfully Created User") {
          alert('Usuario creado exitosamente. Redirigiendo a SignIn.');
          navigate('/SignIn');
        } else {
          // Mostrar un mensaje de error si el registro no fue exitoso
          alert('Error en el registro. Por favor, verifica tus datos.');
        }
      } catch (error) {
        alert('Usuario ya registrado');
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al registrar usuario:', error.message);
      }
    };
  
    return (
      <div className="signUpContainer">
        <i className="fas fa-lock fa-2x"></i> {/* Ícono del candado */}
        <h2>Sign Up</h2>
        <label>
          First Name:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </label>
        <label>
          Email Address:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Title:
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>
        <label>
          Experience:
          <input type="text" value={experiencia} onChange={(e) => setExperiencia(e.target.value)} />
        </label>
        <button onClick={handleSignUp}>Sign Up</button>
        <a href="/SignIn">Already have an account? Sign In</a>
      </div>
    );
  }
  
  export default SignUp;