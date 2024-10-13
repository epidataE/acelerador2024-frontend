import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg'; 

const CursoList = () => { //UserList va a recibir 'role' para saber si muestra Estudiantes o mentores

    const [cursos, setCursos] = useState([]); //useState para manejar los estados de users (users: mi lista de usuarios- inicilmente = array vacio / setUsers = funcion para actualizar Users )

    const fetchCursos = async () => {
        const response = await fetch('/api/cursos');
        const data = await response.json();
        setCursos(data);
    };

    useEffect(() => {
        fetchCursos();
    }, []);
    

    //para modificar el estado del proyecto a Activo o No Activo
    const handleToggleStatus = async (cursoId, cursoNombre, cursoDescripcion, currentStatus) => {
        const newStatus = !currentStatus;

        try {
            const response = await fetch(`/api/cursos/${cursoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    nombre: cursoNombre,
                    descripcion: cursoDescripcion,
                    estado: newStatus }),
            });

            if (response.ok) {
                setCursos(prevCursos => 
                    prevCursos.map(curso =>
                        curso.id === cursoId ? { ...curso, status: newStatus } : curso
                    )
                );
                alert('Estado del curso actualizado con éxito');
                fetchCursos(); // Recarga la lista de cursos después de la actualización
            } else {
                alert('Error al actualizar el estado del curso');
            }
        } catch (error) {
            alert('Error al actualizar el estado del curso');
        }
    };

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
                        <li className="card curso-item" key={curso.id}>
                        {curso.nombre} | {curso.descripcion} | {curso.estado ? 'PROYECTO ACTIVO' : 'PROYECTO NO ACTIVO'}
                        <button 
                            onClick={() => handleToggleStatus(curso.id, curso.nombre, curso.descripcion, curso.estado)}
                            className={`btn ${curso.estado ? 'btn-danger' : 'btn-success'}`}
                        >
                            {curso.estado ? 'CAMBIAR A NO ACTIVO' : 'CAMBIAR A ACTIVO'}
                        </button>
                    </li>
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
