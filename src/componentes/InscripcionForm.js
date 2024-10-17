import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate,  } from 'react-router-dom';
import { Link} from 'react-router-dom';

const InscripcionForm = ({ usuarioId }) => {
    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cursos
        fetch('/api/cursos/activos')  
            .then(response => response.json())
            .then(data => setCursos(data))
            .catch(error => console.error('Error al cargar los cursos:', error));
    }, []);

    const handleInscripcion = async () => {
        if (!cursoSeleccionado) {
            alert('Por favor, selecciona un curso para inscribirte.');
            return;
        }

        try {
            const response = await fetch(`/api/cursos/${cursoSeleccionado}/inscripcion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioId), // Enviar solo el ID del usuario
            });

            if (!response.ok) {
                throw new Error('Error en la inscripción');
            }

            const data = await response.json();
            console.log('Inscripción exitosa:', data);
            alert('Inscripción exitosa');
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al inscribir al usuario: YA TIENES UN PROYECTO ACTIVO');
        }
    };

    return (
        <div className='centered-div'>
            <h2 className='mx-5'>Inscripción a Proyectos</h2>
            <Form.Group className='mx-5' controlId="formCurso">
                <Form.Label>Selecciona un Proyecto</Form.Label>
                <Form.Control as="select" onChange={(e) => setCursoSeleccionado(e.target.value)}>
                    <option value="">Seleccione un Proyecto...</option>
                    {cursos.map(curso => (
                        <option key={curso.id} value={curso.id}>
                            {curso.nombre}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
           {/* Contenedor para los botones */}
           <div className='d-flex justify-content-center'>
                <Button variant="dark" onClick={handleInscripcion} className="my-5 mx-3">
                    Inscribirse
                </Button>
                
                <Link to="/home">
                    <Button variant="dark" className="my-5 mx-3">
                        Volver
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default InscripcionForm;