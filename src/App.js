import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './componentes/Landing';
import Login from './componentes/Login';
import Home from './componentes/Home';
import HomeAdmin from './componentes/HomeAdmin'
import Mensajes from './componentes/Mensajes';
import EquipoForm from './componentes/EquipoForm';
import EquipoList from './componentes/EquipoList';
import UserForm from './componentes/UserForm';
import EstudianteList from './componentes/EstudianteList';
import MentorList from './componentes/MentorList';
import CursoList from './componentes/CursoList';

import './App.css';

const App = () => {
    const [usuarioId, setUsuarioId] = useState(null); // para manejar el id del usuario logueado
    
    const handleUserSubmit = (user) => {
        const { empresa, ...userData } = user;   
        console.log(`Rol: ${user.rol}, Empresa: ${empresa}`);
    
        let url;

        // Determinar la URL según el rol
        if (user.rol === 'ESTUDIANTE') {
            url = `/api/estudiantes?empresaId=${empresa}`;
        } else if (user.rol === 'MENTOR') {
            url = `/api/mentores?empresaId=${empresa}`;
        } else if (user.rol === 'ADMIN') {
            url = '/api/admin'; // Endpoint para administradores
        } else {
            console.error('Rol no válido');
            return; // Salir si el rol no es válido
        }
   
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
       // alert('Usuario creado con éxito');
    } 
   )
    .catch(error => console.error('Error:', error));
};
  
    const handleLogin = (id) => {
        setUsuarioId(id); // seteo el ID
    };

    return (
      
        <Router>
            <div>
               {/* con Routes: envuelvo todas las rutas de la aplicación.
                con Route: Defino una ruta específica */}
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/admin" element={<HomeAdmin usuarioId={usuarioId}/>}/>
                    <Route path="/home" element={<Home usuarioId={usuarioId} />} />
                    <Route path="/mensajes" element={<Mensajes  usuarioId={usuarioId} />} />
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
