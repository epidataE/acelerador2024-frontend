import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg';

const CrearEquipo = ({ usuarioId }) => {
    const [user, setUser] = useState(null);
    const [team, setTeam] = useState({
        nombre: '',
        curso: '',
        desarrolladores: 0,
        uxUi: 0,
        qa: 0
    });
    const [cursos, setCursos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch usuario
        fetch(`/api/admin/${usuarioId}`)
            .then(response => response.json())
            .then(data => setUser(data));

        // Fetch cursos activos
        fetch('/api/cursos/activos')
            .then(response => response.json())
            .then(data => setCursos(data));
    }, [usuarioId]);

    if (!user) {
        return <div>Cargando...</div>;
    }

    console.log("Usuarios Logueado" + user.nombre);

    const handleTeamChange = (e) => {
       
        const { name, value } = e.target;
        setTeam((prevTeam) => ({
            ...prevTeam,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Crear el equipo
            console.log("id que le paso a la url:" + team.curso)
            const createResponse = await fetch(`/api/equipos?cursoId=${team.curso}`, {
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
            console.log("URL ASIGNAR:" + createData.id, team.desarrolladores, team.uxUi, team.qa)
            const assignResponse = await fetch(`/api/equipos/asignar/${createData.id}/${team.desarrolladores}/${team.uxUi}/${team.qa}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!assignResponse.ok) {
                // Eliminar el equipo si no se pueden asignar participantes
                await fetch(`/api/equipos/${createData.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                throw new Error(`Error al asignar participantes: ${assignResponse.statusText}`);
            }
            alert("¡Equipo creado con éxito!");
            navigate('/equipos/listado');
        } catch (error) {
            console.error('Error:', error);
            alert("No hay suficientes participantes: No se ha podido crear el Equipo");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-control centered-div">
            <div className="d-flex justify-content-between align-items-center p-3">
                <img src={Image} alt='img' />
                <h3 className="fw-bolder">PANEL DE ADMINISTRACION</h3>
                <Link to="/"> 
                    <button className="btn btn-secondary">SALIR</button> 
                </Link>
            </div>
            <hr />
            <div className="container d-flex justify-content-center vh-100">
                <div className="w-100" style={{ maxWidth: '600px' }}>
                    <div className="row align-items-center mb-3"></div>
                    <h3>Crear Nuevos Equipo</h3>
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
                        {cursos.map(curso => (
                            <option key={curso.id} value={curso.id}>
                                {curso.nombre}
                            </option>
                        ))}
                    </select>
                    <h3>Ajustes de Equipo</h3>
                    <div>
                        {/* <fieldset>
                            <label>
                                Cantidad de participantes por equipo:
                                <select name="totalParticipants" onChange={handleTeamChange}>
                                    {[...Array(7).keys()].map(i => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </label>
                        </fieldset> */}
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
                                        {[...Array(7).keys()].map(i => (
                                            <option key={i} value={i}>{i}</option>
                                        ))}
                                    </select>
                                </label>
                            ))}
                        </fieldset>
                    </div>
                    <button className="btn btn-dark mt-4" type="submit">CREAR NUEVO EQUIPO</button>
                    <hr />
                    <div className="d-flex justify-content-around mt-4 w-100">
                        <Link to="/admin">
                            <button className="btn btn-dark mx-5">HOME</button>
                        </Link>
                        <Link to="/equipos/listado">
                            <button className="btn btn-dark mx-5">EQUIPOS</button>
                        </Link>
                        <Link to="/cursos">
                            <button className="btn btn-dark mx-5">PROYECTOS</button>
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>
        </form>
    );
};

export default CrearEquipo;
