import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg'; 

const CursoForm = () => {
    const [curso, setCurso] = useState({
        nombre: '',
        descripcion: '',
        estado: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurso({
            ...curso,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
    
        try {
            // Crear el curso
            const createResponse = await fetch('/api/cursos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(curso), // Utiliza 'curso' en lugar de 'team'
            });
    
            if (!createResponse.ok) {
                throw new Error('Error en la creación del curso');
            }
    
            const data = await createResponse.json();
            console.log('Success:', data);
            alert('Proyecto creado con éxito'); // Muestra un mensaje de éxito
    
            // Aquí puedes limpiar el formulario si es necesario
            setCurso({
                nombre: '',
                descripcion: '',
                estado: true, // Resetea el estado a true si es necesario
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear el proyecto'); // Muestra un mensaje de error
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="form-control centered-div">
         {/* cabecera (Nombre y Mensajes)
         MENSAJES FALTA FUNCIONALIDAD  */} 
         <div className="d-flex justify-content-between align-items-center p-3">
        <img src={Image} alt='img' /> 
        <h3 className="fw-bolder ">PANEL DE ADMINISTRACION</h3>        
        <Link to="/"> <button className="btn btn-secondary">SALIR</button> </Link>
        </div> 
        <hr />    
         
        <div className="container d-flex justify-content-center vh-100">

        <div className="w-100" style={{ maxWidth: '600px' }}>
        <div className="row align-items-center mb-3">
       
         </div>
                
        {/* formulario crear equipo */}
       
                <h3>Nuevo Proyecto</h3>
                <hr/>
                <Form.Group controlId="formNombre">
                <Form.Label>Nombre del Curso</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del curso"
                    name="nombre"
                    value={curso.nombre}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ingrese la descripción del curso"
                    name="descripcion"
                    value={curso.descripcion}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formEstado" className="mt-3">
                <Form.Check
                    type="checkbox"
                    label="Activo"
                    name="estado"
                    checked={curso.estado}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="btn btn-dark" type="submit" className="mt-4">
               CREAR PROYECTO
            </Button>
                <hr />
           {/* Barra de Navegación */}
          <div className="d-flex justify-content-around mt-4 w-100">
                <Link to="/admin">
                    <button className="btn btn-dark mx-5">HOME</button>
                </Link>
                <Link to="/equipos/listado">
                    <button className="btn btn-dark mx-5 ">EQUIPOS</button>
                </Link>
                <Link to="/cursos">
                    <button className="btn btn-dark mx-5">PROYECTOS</button>
                </Link>
            </div><hr />
            </div>
            </div>
                </Form>
                
         );
    
}

export default CursoForm;