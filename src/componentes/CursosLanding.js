
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const CursosLanding = () => {
    const [cursos, setCursos] = useState([]); //useState para manejar los estados de users (users: mi lista de usuarios- inicilmente = array vacio / setUsers = funcion para actualizar Users )

    useEffect(() => {
        // Fetch cursos
        fetch('/api/cursos/activos')  
            .then(response => response.json())
            .then(data => setCursos(data))
            .catch(error => console.error('Error al cargar los cursos:', error));
    }, []);
 

 

    return ( 
       
        <div className="centered-div roboto-font">
        <h1 className="h1 display-4 fw-bold text-dark mt-5">¡Nuestros Proyectos Vigentes!</h1>
       
        <hr /> 
       
        <div className='card'>
             <h3 className="pfw-bolder ms-5">Cursos</h3>
             <hr/>
             <ul>
                    {cursos.map(curso => (
                        <li className="card-cartelera" key={curso.id}>
                        {curso.nombre} | {curso.descripcion} |
                      </li>
                    ))}
                </ul>
           </div>
            <hr />
           {/* Barra de Navegación */}
          <div className="centered-div">
                <Link to="/login">
                    <button className="btn btn-dark mx-5 w-50">INSCRIBIRTE</button>
                </Link>
            </div><hr />      
        </div>
    );

}
   

export default CursosLanding