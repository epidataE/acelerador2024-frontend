import React, { useState, useEffect } from 'react';

const EquipoList = () => {
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        fetch('/api/equipos')
            .then(response => response.json())
            .then(data => setEquipos(data));
    }, []);

    return (
        <div>
            <h2>Equipos</h2>
            {equipos.length === 0 ? (
                <p>No hay equipos disponibles.</p>
            ) : (
                equipos.map(equipo => (
                    <div key={equipo.id} className="equipo-card">
                        <h3>{equipo.nombre}</h3>
                        <p>Curso: {equipo.curso}</p>
                        <p>Participantes:</p>
                        <ul>
                            {equipo.users.map(user => (
                                <li key={user.id}>{user.nombre} {user.apellido}</li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default EquipoList;
