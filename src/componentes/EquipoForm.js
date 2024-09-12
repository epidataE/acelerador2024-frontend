import React, { useState } from 'react';

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
        console.log('Datos del equipo:', team); // Verifica los datos antes de enviarlos
        const response = await fetch('/api/equipos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(team),
        });
        const data = await response.json();
        console.log('Equipo creado:', data);
    };
    
    return (
        <form onSubmit={handleSubmit} className='centered-div form-group'>
            <h3>Crea Nuevo Equipo</h3>
            <label>Equipo: </label>
            <input
                type="text"
                name="nombre"
                placeholder="Numero de equipo"
                value={team.nombre}
                onChange={handleTeamChange}
            />
            <label>Curso/Proyecto: </label>
            <select
                name="curso"
                value={team.curso}
                onChange={handleTeamChange}
            >
                <option value="">Selecciona un Proyecto</option>
                <option value="Acelerador 2024">Acelerador 2024</option>
                <option value="Proyecto de prueba">Proyecto prueba</option>
            </select>
            <h3>Ajustes de Equipo</h3>
            <label>
                Cantidad de participantes por equipo:
                <select name="totalParticipants" onChange={handleTeamChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </label>
            <label>
                Cantidad de participantes por rubro:
            </label>
            <div>
                <label>
                    Desarrolladores:
                    <select
                        name="desarrolladores"
                        value={team.desarrolladores}
                        onChange={handleTeamChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </label>
                <label>
                    UX/UI:
                    <select
                        name="uxUi"
                        value={team.uxUi}
                        onChange={handleTeamChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </label>
                <label>
                    QA:
                    <select
                        name="qa"
                        value={team.qa}
                        onChange={handleTeamChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </label>
            </div>
            <button type="submit">Crear Nuevo Equipo</button>
        </form>
    );
};

export default CrearEquipo;
