import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout'; 
import Clases from './pages/Clases';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import VistaClase from './pages/VistaClase';
import ContratarServicio from './Forms/ContratarServicio';
import ListaAlumnos from './Forms/ListaAlumnos';
import CrearClase from './Forms/CrearClase';
import CrearComentario from './Forms/Comentario';
import Quienes from './pages/Quienes';
import PerfilProfesor from './Forms/PerfilProfesor';

function App() {
  return (    
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Quienes" element={<Quienes />}/>
          <Route path="Clases" element={<Clases />} />
          <Route path="Clases/:idClase" element={<VistaClase />} />
          <Route path="Clases/Inscripcion/:idClase" element={<ContratarServicio />} />
          <Route path="Clases/Contratos/:idClase" element={<ListaAlumnos />} />
          <Route path="Clases/CrearClase/:idClase?" element={<CrearClase />} />
          <Route path="Clases/CrearComentario/:idClase" element={<CrearComentario />} />
          <Route path="PerfilProfesor" element={<PerfilProfesor />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;