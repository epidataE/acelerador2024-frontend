import React, { useEffect, useState } from 'react';

const EstudianteList = ({ role }) => { //UserList va a recibir 'role' para saber si muestra Estudiantes o mentores

    const [users, setUsers] = useState([]); //useState para manejar los estados de users (users: mi lista de usuarios- inicilmente = array vacio / setUsers = funcion para actualizar Users )

    useEffect(() => {   //useEffect se ejecutacada vez que cambia el valor de 'role' (Estudiantes/ Mentores)
        //Realiza una solicitud a -/api/${role}-, convierte la respuesta a JSON y actualiza users con los datos recibidos.
        fetch(`/api/${role}`)  
            .then(response => response.json())
            .then(data => setUsers(data));
    }, [role]);

    return (  //retorna la lista de Estudiantes / Mentores segun el valor de role **Mejorar visualmente con Boostrap
        <div>
            <h2>{role === 'estudiantes' ? 'Estudiantes' : 'Mentores'} </h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.nombre} {user.apellido} | {user.curso.nombre} | {user.email}  </li>
                ))}
            </ul>
        </div>
    );
};

export default EstudianteList;
