import React from 'react';
import Image from '../assets/LogoFigma.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './UserForm';
import EstudianteList from './EstudianteList';
import MentorList from './MentorList';
import CursoList from './CursoList';


const handleUserSubmit = (user) => {
    const { rolId, cursoId, ...userData } = user;
    const url = rolId === '1' ? `/api/estudiantes?rolId=${rolId}&cursoId=${cursoId}` : `/api/mentores?rolId=${rolId}&empresaId=${cursoId}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};

const Home = () => {
    return (
        //Router: de react-router-dom envuelve toda la aplicación y habilita la funcionalidad de enrutamiento. Permite definir rutas y navegar entre diferentes componentes.
        <Router>   
            <div className="centered-div roboto-font">
                <h1 className="h1 display-4 fw-bold text-dark">¡Bienvenido!</h1>
                <img className="mb-5" src={Image} alt='img' />
                <nav className="mt-5 mb-3">
                     <Link to="">
                        <button className="btn btn-dark btn-lg custom-button">Iniciar Sesion</button>
                     </Link>
                </nav>
                <nav className="my-3" >
                    <Link to="/inscripcion">
                        <button className="btn btn-dark btn-lg custom-button ">Registrarse</button>
                    </Link>
                </nav>
                <nav className="my-3">
                    <Link to="/cursos">
                        <button className="btn btn-dark btn-lg custom-button">Ver Cursos</button>
                    </Link>
                </nav>
                <nav className="my-3">
                    <Link to="/users/estudiantes">
                        <button className="btn btn-dark btn-lg custom-button">Ver Estudiantes</button>
                    </Link>
                </nav>
                <nav className="my-3">    
                    <Link to="/users/mentores">
                        <button className="btn btn-dark btn-lg custom-button">Ver  Mentores </button>
                    </Link>
                </nav>
                {/* con Routes: envuelvo todas las rutas de la aplicación.
                con Route: Defino una ruta específica */}
                <Routes>
                    
                    <Route path="/inscripcion" element={<UserForm onSubmit={handleUserSubmit} />} />
                    <Route path="/users/estudiantes" element={<EstudianteList role="estudiantes" />} />
                    <Route path="/users/mentores" element={<MentorList role="mentores" />} />
                    <Route path="/cursos" element={<CursoList/>} />
                </Routes>
            </div>
        </Router>
    ); 
};

export default Home;