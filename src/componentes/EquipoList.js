import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg'; 

const EquipoList = ({usuarioId}) => {
    const [equipos, setEquipos] = useState([]);
    const [user, setUser] = useState(null);
    const [visibleEquipo, setVisibleEquipo] = useState(null);


    useEffect(() => {
         // Fetch equipos
    fetch('/api/equipos')
        .then(response => response.json())
        .then(data =>  setEquipos(data));
         // Fetch usuario
    fetch(`/api/estudiantes/${usuarioId}`)
         .then(response => response.json())
         .then(data => setUser(data));
        
    }, [usuarioId]);


    if (!user) {
        return <div>Cargando...</div>;
    }
    console.log("Usuarios Logueado" + user.nombre + user.apellido )

    return (
        //cabecera (Nombre y Mensajes)
        <div>  
        <div className="d-flex justify-content-between align-items-center p-3">
        <img src={Image} alt='img' /> 
        <h3 className="fw-bolder ">PANEL DE ADMINISTRACION</h3>        
        <Link to="/"> <button className="btn btn-secondary">SALIR</button> </Link>
        </div> 
        <hr /> 
       
        <div>
             <h3 className="fw-bolder mx-4" > Todos Los Equipos</h3>
             <hr/>
       
        
            
        </div>
        {equipos.length === 0 ? (
                <h5 className='mx-4'>No hay equipos disponibles.</h5>
            ) : (
                equipos.map(equipo => (
                    <div key={equipo.id} className="card">
                        <h3>{equipo.nombre}</h3>
                        <h5>Curso/Proyecto: { equipo.curso.nombre}</h5>
                        {visibleEquipo === equipo.id ? (
                        <>
                            <h6>Participantes:</h6>
                            <ul>
                                {equipo.usuarios.filter(user => user.rol === 'ESTUDIANTE').map(user => (
                                    <li key={user.id}>{user.nombre} {user.apellido} | {user.rol} | {user.especializacion} | {user.email} </li>
                                ))}
                            </ul>
                            <h6>Mentores:</h6>
                            <ul>
                                {equipo.usuarios.filter(user => user.rol === 'MENTOR').map(user => (
                                    <li key={user.id}>{user.nombre} {user.apellido} | {user.rol} | {user.especializacion}| {user.email}</li>
                                ))}
                            </ul>
                            <p className="equipo-nombre" onClick={() => setVisibleEquipo(null)}>Ver Menos...</p>
                        </>
                    ) : (
                        <p className="equipo-nombre" onClick={() => setVisibleEquipo(equipo.id)}>Ver Más...</p>
                    )}
                </div>
            ))
        )}
        <hr/>
        <hr />
           {/* Barra de Navegación */}
          <div className="centered-div">
          <Link to="/equipos">
                    <button className="btn btn-dark mx-5 my-3 w-50">CREAR NUEVO EQUIPO</button>
                </Link>
                <Link to="/admin">
                    <button className="btn btn-dark mx-5 w-50">VOLVER</button>
                </Link>
               
            </div><hr />      
        </div>
    );
};

export default EquipoList;
