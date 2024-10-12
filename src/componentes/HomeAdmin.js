import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg'; 


const HomeAdmin = ({usuarioId}) => {
    const [cursos, setCursos] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [visibleEquipo, setVisibleEquipo] = useState(null);
  
    useEffect(() => {
        //fetch Cursos
    fetch(`/api/cursos`)  
        .then(response => response.json())
        .then(data => setCursos(data));

         // Fetch equipos
    fetch('/api/equipos')
        .then(response => response.json())
        .then(data =>  setEquipos(data));
         // Fetch usuario
    fetch(`/api/admin/${usuarioId}`)
         .then(response => response.json())
         .then(data => setAdmin(data));
        
    }, [usuarioId]);

    if (!admin) {
        return <div>Cargando...</div>;
    }
   console.log("Usuarios Logueado" + admin.nombre  )

    

    return (
        <div>  
        <div className="d-flex justify-content-between align-items-center p-3">
        <img src={Image} alt='img' /> 
        <h3 className="fw-bolder ">PANEL DE ADMINISTRACION</h3>        
        <Link to="/"> <button className="btn btn-secondary">SALIR</button> </Link>
        </div> 
        <hr />     
         {/* CURSOS */}
        
        <hr />
        <div className="centered-div roboto-font">
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
                <Link to="/cursos">
                    <button className="btn btn-dark btn-lg custom-button">Ver Proyectos</button>
                </Link>
            </nav>
            <nav className="my-3">
                <Link to="/cursos/nuevo">
                    <button className="btn btn-dark btn-lg custom-button">Nuevo Proyecto</button>
                </Link>
            </nav>
            <nav className="my-3">
                <Link to="/equipos/listado">
                    <button className="btn btn-dark btn-lg custom-button">Ver Equipos</button>
                </Link>
            </nav>
            </div>
       
            <hr/>
            </div>
       
      
    );
};

export default HomeAdmin;
