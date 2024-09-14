import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CrearEquipo = () => {
    const [team, setTeam] = useState({
        nombre: '',
        curso: '',
        desarrolladores: 0,
        uxUi: 0,
        qa: 0
    });

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
           // console.log('Equipo creado:', createData);
    
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
        <form onSubmit={handleSubmit} className="centered-div form-group">
            <h3>Crea Nuevo Equipo</h3>
            
            <label>Equipo:</label>
            <input
                type="text"
                name="nombre"
                placeholder="Número de equipo"
                value={team.nombre}
                onChange={handleTeamChange}
            />
            
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
            
            <button className="btn btn-dark" type="submit">Crear Nuevo Equipo</button>
            <Link to="/">
                <button className="btn btn-dark">Volver</button>
            </Link>
        </form>
    );
}    

export default CrearEquipo;
