import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './componentes/Landing';
import Home from './componentes/Home';
import EquipoForm from './componentes/EquipoForm';
import EquipoList from './componentes/EquipoList';
import UserForm from './componentes/UserForm';
import EstudianteList from './componentes/EstudianteList';
import MentorList from './componentes/MentorList';
import CursoList from './componentes/CursoList';

import './App.css';

const handleUserSubmit = (user) => {
    const { empresa, ...userData } = user;
    //const empresaId = parseInt(empresa, 10); // Convierte el ID de empresa a Long (entero)
    console.log(`Rol: ${user.rol}, Empresa: ${empresa}`);
    
    const url = user.rol === 'ESTUDIANTE' ? `/api/estudiantes?empresaId=${empresa}` : `/api/mentores?empresaId=${empresa}`;
   
   // console.log("UserData: " + JSON.stringify(userData));
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Usuario creado con éxito');
    })
    .catch(error => console.error('Error:', error));
};



const App = () => {
    //hardcodeo usuario ** falta funcionalidad 
    const usuarioId = 154;
    return (
      
        <Router>
            <div>
               {/* con Routes: envuelvo todas las rutas de la aplicación.
                con Route: Defino una ruta específica */}
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home usuarioId={usuarioId} />} />
                    <Route path="/inscripcion" element={<UserForm onSubmit={handleUserSubmit}/>} />
                    <Route path="/users/estudiantes" element={<EstudianteList  />} />
                    <Route path="/users/mentores" element={<MentorList  />} />
                    <Route path="/cursos" element={<CursoList />} />
                    <Route path="/equipos" element={<EquipoForm usuarioId={usuarioId}/>} />
                    <Route path="/equipos/listado" element={<EquipoList usuarioId={usuarioId} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
