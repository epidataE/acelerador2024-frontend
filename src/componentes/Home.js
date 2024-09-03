import React from 'react';
import Image from '../assets/logoAcelerador.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './UserForm';
import EstudianteList from './EstudianteList';
import MentorList from './MentorList';
import CursoList from './CursoList';




const handleUserSubmit = (user) => {
    //desestructuración para extraer rolId y cursoId del objeto user para usar en el endpoint, y el resto de las propiedades se agrupan en un nuevo objeto llamado userData
    const { rolId, cursoId, ...userData } = user;
    //llamo a la api con fetch (endpoint del backend)
    if (rolId === 1){
        fetch(`/api/estudiantes?rolId=${rolId}&cursoId=${cursoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => console.log(data));

    } else if (rolId === 2){
        fetch(`/api/mentores?rolId=${rolId}&empresaId=${cursoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => console.log(data));
    }
    
};

const Home = () => {
    return (
        //Router: de react-router-dom envuelve toda la aplicación y habilita la funcionalidad de enrutamiento. Permite definir rutas y navegar entre diferentes componentes.
        <Router>   
            <div className="centered-div roboto-font">
                <h1 className="h1 display-1 fw-bold text-dark">¡Bienvenido!</h1>
                <img className="mb-5" src={Image} alt='img' />
                <nav className="mt-5 mb-3">
                     <Link to="/">
                        <button className="btn btn-dark">Iniciar Sesion</button>
                     </Link>
                </nav>
                <nav className="my-3" >
                    <Link to="/inscripcion">
                        <button className="btn btn-dark">Registrarse</button>
                    </Link>
                </nav>
                <nav className="my-3">
                    <Link to="/cursos">
                        <button className="btn btn-dark">Ver Cursos</button>
                    </Link>
                </nav>
                <nav className="my-3">
                    <Link to="/users">
                        <button className="btn btn-dark">Ver Estudiantes</button>
                    </Link>
                    <Link to="/mentores">
                        <button className="btn btn-dark">Ver  Mentores </button>
                    </Link>
                </nav>
                {/* con Routes: envuelvo todas las rutas de la aplicación.
                con Route: Defino una ruta específica */}
                <Routes>
                    <Route path="/inscripcion" element={<UserForm onSubmit={handleUserSubmit} />} />
                    <Route path="/users" element={<EstudianteList role="estudiantes" />} />
                    <Route path="/mentores" element={<MentorList role="mentores" />} />
                    <Route path="/cursos" element={<CursoList/>} />
                </Routes>
            </div>
        </Router>
    ); 
};

export default Home;