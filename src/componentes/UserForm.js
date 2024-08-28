import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ onSubmit }) => {
    const [user, setUser] = useState({  //useState para manejar los estados de users  setUsers = para actualizar Users
        nombre: '',
        apellido: '',
        email: '',
        contrasena: '',
        fecha_creacion:'',
        rolId: '',
        cursoId: ''
    });
//me traigo los cursos para mostrar
const [cursos, setCursos] = useState([]);
const navigate = useNavigate(); // Hook que me permite la navegación

useEffect(() => {
    fetch('/api/cursos')
        .then(response => response.json())
        .then(data => setCursos(data));
}, []);

//Manejo de Cambios en el Form: handleChange se llama cada vez que hay un cambio en los inputs del formulario. Extrae el name y value del evento (e.target) y actualiza el estado user con el nuevo valor correspondiente al campo modificado.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

//Manejo de Envio del Form: handleSubmit se llama cuando se envía el formulario
    const handleSubmit = (e) => {
        e.preventDefault(); //Previene el comportamiento por defecto del formulario (que es recargar la página)
        onSubmit(user);
        navigate('/'); // Redirige al componente Home
    };

    return (  //esto hay que mejorar visualmente con Boostrap
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={user.nombre} onChange={handleChange} />
            </div>
            <div>
                <label>Apellido:</label>
                <input type="text" name="apellido" value={user.apellido} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" name="contrasena" value={user.contrasena} onChange={handleChange} />
            </div>
            <div>
                <label>Fecha Registro:</label>
                <input type="fecha_creacion" name="fecha_creacion" value={user.fecha_creacion} onChange={handleChange} />
            </div>
            <div>
                <label>Rol:</label>
                <select name="rolId" value={user.rolId} onChange={handleChange}>
                    <option value="">Seleccione un rol</option>
                    <option value="1">Estudiante</option>
                    <option value="2">Mentor</option>
                </select>
            </div>
            <div>
                {/* <label>Curso/Empresa:</label>
                <input type="text" name="cursoId" value={user.cursoId} onChange={handleChange} /> */}
                  <label>Curso/Empresa:</label>
                <select name="cursoId" value={user.cursoId} onChange={handleChange}>
                    <option value="">Seleccione un curso</option>
                    {cursos.map(curso => (
                        <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Registrar</button>
        </form>
    );
};

export default UserForm;
