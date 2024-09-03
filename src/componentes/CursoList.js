import React, { useEffect, useState } from 'react';

const CursoList = () => { //UserList va a recibir 'role' para saber si muestra Estudiantes o mentores

    const [cursos, setCursos] = useState([]); //useState para manejar los estados de users (users: mi lista de usuarios- inicilmente = array vacio / setUsers = funcion para actualizar Users )

    useEffect(() => {   //useEffect se ejecutacada vez que cambia el valor de 'role' (Estudiantes/ Mentores)
        //Realiza una solicitud a -/api/${role}-, convierte la respuesta a JSON y actualiza users con los datos recibidos.
        fetch(`/api/cursos`)  
            .then(response => response.json())
            .then(data => setCursos(data));
    }, []);

    return (  //retorna la lista de cursos **Mejorar visualmente con Boostrap
        <div>
            <h2>Cursos</h2>
            <ul>
                {cursos.map(curso => (
                    <li key={curso.id}>{curso.nombre} | {curso.descripcion} |   </li>
                ))}
            </ul>
        </div>
    );

}
export default CursoList;
