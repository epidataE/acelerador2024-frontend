import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


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

    // Filtra los equipos en los que está el usuario
    // const equiposUsuario = equipos.filter(equipo =>
    //     equipo.usuarios.some(u => u.id === usuarioId)
    // );

    return (
        //cabecera (Nombre y Mensajes)
        //** MENSAJES FALTA FUNCIONALIDAD */
        <div>
           <div className="d-flex justify-content-between align-items-center p-3">
            <h3 className="fw-bolder">¡HOLA {admin.nombre} !</h3>            
            <Link to="/mensajes"> <button className="btn btn-secondary">MENSAJES</button> </Link>
            
        </div>
        {/* buscador FALTA FUNCIONALIDAD */}
        <div className="row mt-3 justify-content-center">
        <div className="col-md-6 col-lg-4">
                    <input type="text" className="form-control" placeholder="BUSCADOR" />
                </div>
            </div>
         {/* CURSOS */}
         <div className="align-items-center p-3">
         <h2 className="fw-bolder"> Tus Cursos/Proyectos</h2>
         </div>
         {cursos.length === 0 ? (
               <h5 className="d-flex align-items-center p-3">AUN NO ESTAS REGISTRADO EN NINGUN CURSO/PROYECTO</h5>
            ) : (
         cursos.map(cursos => (
        <div key={cursos.id} className="card">
            <h3>{cursos.nombre}</h3>  
            <ul>   
                <li key={cursos.id}> {cursos.descripcion}</li>
                </ul>
                </div>
               )))}


        {/* EQUIPOS */}
        <div className="d-flex align-items-center p-3">
         <h2 className="fw-bolder"> Tus Equipos</h2>
        </div>       
            {/* {equiposUsuario.length === 0 ? (
                <h5 className="d-flex align-items-center p-3">AUN NO TIENES EQUIPOS ASIGNADOS</h5>
            ) : (
                equiposUsuario.map(equipo => (
                    <div key={equipo.id} className="card">
                        <h3>{equipo.nombre}</h3>
                        <h5>Curso/Proyecto: {equipo.curso}</h5>
                        {visibleEquipo === equipo.id ? (
                        <>
                            <h6>Participantes:</h6>
                            <ul>
                                {equipo.usuarios.filter(user => user.rol === 'ESTUDIANTE').map(user => (
                                    <li key={user.id}>{user.nombre} {user.apellido} | {user.rol} | {user.especializacion}</li>
                                ))}
                            </ul>
                            <h6>Mentores:</h6>
                            <ul>
                                {equipo.usuarios.filter(user => user.rol === 'MENTOR').map(user => (
                                    <li key={user.id}>{user.nombre} {user.apellido} | {user.rol} | {user.especializacion}</li>
                                ))}
                            </ul>
                            <p className="equipo-nombre" onClick={() => setVisibleEquipo(null)}>Ver Menos...</p>
                        </>
                    ) : (
                        <p className="equipo-nombre" onClick={() => setVisibleEquipo(equipo.id)}>Ver Más...</p>
                    )}
                </div>
            ))
        )} */}
         <div className="container">
         {/* Barra de Navegación */}
         <div className="d-flex justify-content-around mt-4 w-75">
                <Link to="/home">
                    <button className="btn btn-dark">HOME</button>
                </Link>
                <Link to="/equipos/listado">
                    <button className="btn btn-dark">EQUIPOS</button>
                </Link>
                <Link to="/cursos">
                    <button className="btn btn-dark">CURSOS/PROYECTOS</button>
                </Link>
            </div>
            </div>
            </div>
       
      
    );
};

export default HomeAdmin;
