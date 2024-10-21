import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg'; 


const Landing = () => {
    return (
        <div className="centered-div roboto-font">
            <h1 className="h1 display-4 fw-bold text-dark mt-5">¡Te damos la Bienvenida!</h1>
            <img className="mb-5 w-15 mx-auto d-block mt-5" src={Image} alt='img' />
            <div className="carousel-inner">
          <div className="carousel-item active c-item">
            <img
              className="d-block w-100 c-img"
              src="https://images.unsplash.com/photo-1729008014126-c0eb5498663b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ></img>
            <div className="carousel-caption top-0 mt-4 d-none d-md-block">
                <p className="mt-5 fs-3 text-uppercase ">Formaciones</p>
                <h1 className="dispaly-1 fw-bolder ">Es el momento de empezar a estudiar</h1>
                <Link to="/registro">
                <button className="btn btn-primary px-4 py-2 fs-5 mt-5">CREAR NUEVA CUENTA</button>
                </Link>
            </div>
          </div></div>
                 
            <nav className="my-3">
                <Link to="/login">
                    <button className="btn btn-dark btn-lg custom-button w-50"> <small>¿Ya Tienes una Cuenta?  </small>Inicia Sesion</button>
                </Link>
            </nav>
            {/* <div className="d-flex align-items-center justify-content-center mt-5">
            <span>¿Ya Tienes una Cuenta?</span>
            <nav className="ms-2">
             <Link to="/login"> Inicia Sesion </Link>
            </nav>
            </div>                */}
            <nav> 
                <Link to="/cartelera">
                    <button className="btn btn-light btn-lg custom-button border border-dark mt-5 w-50">Ver Cursos</button>
                </Link>
            </nav>
           
        </div>
    );
};

export default Landing;
