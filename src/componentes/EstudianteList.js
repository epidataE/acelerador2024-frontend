import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EstudianteList = () => { //UserList va a recibir 'role' para saber si muestra Estudiantes o mentores

    const [users, setUsers] = useState([]); //useState para manejar los estados de users (users: mi lista de usuarios- inicilmente = array vacio / setUsers = funcion para actualizar Users )
    console.log(users);

    useEffect(() => {   //useEffect se ejecutacada vez que cambia el valor de 'role' (Estudiantes/ Mentores)
        //Realiza una solicitud a -/api/${role}-, convierte la respuesta a JSON y actualiza users con los datos recibidos.
        fetch(`/api/estudiantes`)  
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    return (  //retorna la lista de Estudiantes / Mentores segun el valor de role **Mejorar visualmente con Boostrap
        <div>
            <h2 className="h2 display-5 fw-bold text-dark">{users.rol === 'ESTUDIANTE' ? 'Mentores' : 'Estudiantes'} </h2>
            
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.nombre} {user.apellido} | {user.empresa.nombre} | {user.email} | {user.especializacion} </li>
                ))}
            </ul>
            <Link to="/home">
                        <button className="btn btn-dark ">Volver</button>
            </Link>
        </div>
    );
};

export default EstudianteList;
