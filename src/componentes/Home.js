import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';



const Home = ({usuarioId}) => {
    const [cursos, setCursos] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [user, setUser] = useState(null);
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
    fetch(`/api/estudiantes/${usuarioId}`)
         .then(response => response.json())
         .then(data => setUser(data));
        
    }, [usuarioId]);

    if (!user) {
        return <div>Cargando...</div>;
    }
   //console.log("Usuarios Logueado" + user.nombre + user.apellido )

    // Filtra los equipos en los que está el usuario
    const equiposUsuario = equipos.filter(equipo =>
        equipo.usuarios.some(u => u.id === usuarioId)
    );
     // Filtra los cursos/proyectos en los que está el usuario
     const cursosUsuario = cursos.filter(cursos =>
        cursos.usuarios.some(u => u.id === usuarioId)
    );

    return (
        //cabecera (Nombre y Mensajes)
       
        <div>
           <div className="recuadro d-flex justify-content-between align-items-center p-3">
            <h2 className="fw-bolder">¡HOLA   {user.nombre} {user.apellido} !</h2>                        
            <Link to="/"> <button className="btn btn-secondary">CERRAR SESION</button> </Link>            
        </div>
       
         {/* CURSOS */}
         <div className="align-items-center p-3">
         <h2 className="fw-bolder"> Tus Proyectos</h2>
         </div>
         {cursos.length === 0 ? (
               <h5 className="d-flex align-items-center p-3">AUN NO ESTAS REGISTRADO EN NINGUN PROYECTO</h5>
            ) : (
         cursosUsuario.map(cursos => (
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
            {equiposUsuario.length === 0 ? (
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
                                    <li key={user.id}>{user.nombre} {user.apellido} | {user.rol} | {user.especializacion} | {user.email}</li>
                                ))}
                            </ul>
                            <h6>Mentores:</h6>
                            <ul>
                                {equipo.usuarios.filter(user => user.rol === 'MENTOR').map(user => (
                                    <li key={user.id}>{user.nombre} {user.apellido} | {user.rol} | {user.especializacion} | {user.email}</li>
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
         <div className="container">
         {/* Barra de Navegación */}
         <div className="d-flex justify-content-center mt-4  w-75">
                <Link to="/home">
                    <button className="btn btn-dark">HOME</button>
                </Link>
                {/* <Link to="/equipos/listado">
                    <button className="btn btn-dark">EQUIPOS</button>
                </Link> */}
                <Link to="/cursos/inscripcion">
                    <button className="btn btn-dark mx-5">INSCRIPCION A PROYECTOS</button>
                </Link>
            </div>
            </div>
            <hr/>
            </div>
       
      
    );
};

export default Home;
