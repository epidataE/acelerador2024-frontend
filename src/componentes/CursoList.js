import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg'; 

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
        <div className="d-flex justify-content-between align-items-center p-3">
        <img src={Image} alt='img' /> 
        <h3 className="fw-bolder ">PANEL DE ADMINISTRACION</h3>        
        <Link to="/"> <button className="btn btn-secondary">SALIR</button> </Link>
        </div> 
        <hr /> 
       
        <div>
             <h3 className="pfw-bolder ms-5">Cursos</h3>
             <hr/>
            <ul>
                {cursos.map(curso => (
                    <li className= "card" key={curso.id}>{curso.nombre} | {curso.descripcion} |   </li>
                ))}
            </ul>

           </div>
            <hr />
           {/* Barra de Navegación */}
          <div className="centered-div">
                <Link to="/admin">
                    <button className="btn btn-dark mx-5 w-50">VOLVER</button>
                </Link>
            </div><hr />      
        </div>
    );

}
export default CursoList;
