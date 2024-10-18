import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg'; 


const Landing = () => {
    return (
        <div className="centered-div roboto-font">
            <h1 className="h1 display-4 fw-bold text-dark mt-5">¡Te damos la Bienvenida!</h1>
            <img className="mb-5 w-15 mx-auto d-block mt-5" src={Image} alt='img' />
                 
            <nav className="my-3">
                <Link to="/registro">
                    <button className="btn btn-dark btn-lg custom-button w-50">Crear Nueva Cuenta</button>
                </Link>
            </nav>
            <div className="d-flex align-items-center justify-content-center mt-5">
            <span>¿Ya Tienes una Cuenta?</span>
            <nav className="ms-2">
             <Link to="/login"> Inicia Sesion </Link>
            </nav>
            </div>               
            <nav> 
                <Link to="/cartelera">
                    <button className="btn btn-light btn-lg custom-button border border-dark mt-5 w-50">Ver Cursos</button>
                </Link>
            </nav>
           
        </div>
    );
};

export default Landing;
