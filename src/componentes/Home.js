import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/LogoFigma.png'; 





const Home = () => {
    return (
        <div className="centered-div roboto-font">
            <h1 className="h1 display-4 fw-bold text-dark">¡Bienvenido!</h1>
            <img className="mb-5" src={Image} alt='img' />
            <nav className="mt-5 mb-3">
                <Link to="/login">
                    <button className="btn btn-dark btn-lg custom-button">Iniciar Sesion</button>
                </Link>
            </nav>
            <nav className="my-3">
                <Link to="/inscripcion">
                    <button className="btn btn-dark btn-lg custom-button">Registrarse</button>
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
                    <button className="btn btn-dark btn-lg custom-button">Ver Mentores</button>
                </Link>
            </nav>
            <nav className="my-3">
                <Link to="/equipos">
                    <button className="btn btn-dark btn-lg custom-button">Crear Equipo</button>
                </Link>
            </nav>
            <nav className="my-3">
                <Link to="/equipos/listado">
                    <button className="btn btn-dark btn-lg custom-button">Ver Equipos</button>
                </Link>
            </nav>
        </div>
    );
};

export default Home;
