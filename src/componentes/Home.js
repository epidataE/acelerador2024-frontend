import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './UserForm';
import UserList from './UserList';

const handleUserSubmit = (user) => {
    //desestructuración para extraer rolId y cursoId del objeto user para usar en el endpoint, y el resto de las propiedades se agrupan en un nuevo objeto llamado userData
    const { rolId, cursoId, ...userData } = user;
    //llamo a la api con fetch (endpoint del backend)
    fetch(`/api/estudiantes?rolId=${rolId}&cursoId=${cursoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => console.log(data));
};

const Home = () => {
    return (
        //Router: de react-router-dom envuelve toda la aplicación y habilita la funcionalidad de enrutamiento. Permite definir rutas y navegar entre diferentes componentes.
        <Router>   
            <div className="centered-div">
                <h1>Acelerador 2024</h1>
                <nav>
                    <Link to="/inscripcion">
                        <button>Formulario Inscripción</button>
                    </Link>
                </nav>
                <nav>
                    <Link to="/cursos">
                        <button>Alta de Cursos</button>
                    </Link>
                </nav>
                {/* con Routes: envuelvo todas las rutas de la aplicación.
                con Route: Defino una ruta específica */}
                <Routes>
                    <Route path="/inscripcion" element={<UserForm onSubmit={handleUserSubmit} />} />
                    <Route path="/" element={<UserList role="estudiantes" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Home;