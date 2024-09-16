import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
             <h2 className="h2 display-5 fw-bold text-dark card">Cursos</h2>
            <ul>
                {cursos.map(curso => (
                    <li key={curso.id}>{curso.nombre} | {curso.descripcion} |   </li>
                ))}
            </ul>
            <Link to="/home">
                <button className="btn btn-dark btn-lg ">Volver</button>
            </Link>
            <Link to="">
            <button className="btn btn-dark btn-lg ">Crear Curso</button>
            </Link>
        </div>
    );

}
export default CursoList;
