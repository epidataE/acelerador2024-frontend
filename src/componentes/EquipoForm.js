import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CrearEquipo = ({usuarioId}) => {
    const [user, setUser] = useState(null);
    const [team, setTeam] = useState({
        nombre: '',
        curso: '',
        desarrolladores: 0,
        uxUi: 0,
        qa: 0
    });
    useEffect(() => {
   // Fetch usuario
   fetch(`/api/estudiantes/${usuarioId}`)
        .then(response => response.json())
        .then(data => setUser(data));       
   }, [usuarioId]);
    
   if (!user) {
    return <div>Cargando...</div>;
}
console.log("Usuarios Logueado" + user.nombre + user.apellido )

    const handleTeamChange = (e) => {
        const { name, value } = e.target;
        setTeam((prevTeam) => ({
            ...prevTeam,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
       //console.log('Datos del equipo:', team); // Verifica los datos antes de enviarlos
        try {
            // Crear el equipo
            const createResponse = await fetch('/api/equipos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team),
            });
            if (!createResponse.ok) {
                throw new Error(`Error al crear el equipo: ${createResponse.statusText}`);
            }
            const createData = await createResponse.json();
            // Asignar participantes al equipo
            const assignResponse = await fetch(`/api/equipos/asignar/${createData.id}/${team.desarrolladores}/${team.uxUi}/${team.qa}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!assignResponse.ok) {
                throw new Error(`Error al asignar participantes: ${assignResponse.statusText}`);
            }
                 
        } catch (error) {
            console.error('Error:', error);
            alert(`Ocurrió un error: ${error.message}`);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="form-control centered-div">
         {/* cabecera (Nombre y Mensajes)
         MENSAJES FALTA FUNCIONALIDAD  */} 
         <div>
           <div className="d-flex justify-content-between align-items-center p-3">
            <h3 className="fw-bolder">¡ HOLA ! {user.nombre} {user.apellido}</h3>
            <button className="btn btn-secondary">MENSAJES</button>
            
        </div>
            
        </div>
         
        <div className="container d-flex justify-content-center vh-100">

        <div className="w-100" style={{ maxWidth: '600px' }}>
        <div className="row align-items-center mb-3">
       
         </div>
                
        {/* formulario crear equipo */}
       
                <h3>Crear Nuevos Equipo</h3>
                <label>Equipo:</label>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Número de equipo"
                    value={team.nombre}
                    onChange={handleTeamChange} />
                <label>Curso/Proyecto:</label>
                <select
                    name="curso"
                    value={team.curso}
                    onChange={handleTeamChange}
                >
                    <option value="">Selecciona un Proyecto</option>
                    <option value="Acelerador 2024">Acelerador 2024</option>
                    <option value="Proyecto de prueba">Proyecto de prueba</option>
                </select>
                <h3>Ajustes de Equipo</h3>
                <div>
                    <fieldset>
                        {/* <legend>Configuración General</legend> */}
                        <label>
                            Cantidad de participantes por equipo:
                            <select name="totalParticipants" onChange={handleTeamChange}>
                                {[...Array(7).keys()].map(i => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </label>
                    </fieldset>
                    {/* fieldset y legend para agrupar */}
                    <fieldset>
                        <legend>Cantidad de participantes por rubro:</legend>
                        {['desarrolladores', 'uxUi', 'qa'].map(rubro => (
                            <label key={rubro}>
                                {rubro.charAt(0).toUpperCase() + rubro.slice(1)}:
                                <select
                                    name={rubro}
                                    value={team[rubro]}
                                    onChange={handleTeamChange}
                                >
                                    {/* Array(7).keys(): Genera un array con los números del 0 al 6 */}
                                    {/* map: Itera sobre el array para crear las opciones de los select. */}
                                    {[...Array(7).keys()].map(i => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </label>
                        ))}
                    </fieldset>
                </div>
                <button className="btn btn-dark mt-4" type="submit">CREAR NUEVO EQUIPO</button>
           {/* Barra de Navegación */}
          <div className="d-flex justify-content-around mt-4 w-100">
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
            </div></div>
                </form>
                
          
            

           
    );
}    

export default CrearEquipo;
