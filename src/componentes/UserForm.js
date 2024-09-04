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
const [empresas, setEmpresas] = useState([]);
const navigate = useNavigate(); // Hook que me permite la navegación

useEffect(() => {
    if (user.rolId === '1') {
        fetch('/api/cursos')
            .then(response => response.json())
            .then(data => setCursos(data));
    } else if (user.rolId === '2') {
        fetch('/api/empresas')
            .then(response => response.json())
            .then(data => setEmpresas(data));
    }
}, [user.rolId]);

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
            <div className="form-group">
                <label>Nombre:</label>
                <input className="form-control" type="text" name="nombre" value={user.nombre} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Apellido:</label>
                <input className="form-control" type="text" name="apellido" value={user.apellido} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input className="form-control" type="email" name="email" value={user.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Contraseña:</label>
                <input className="form-control" type="password" name="contrasena" value={user.contrasena} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Fecha Registro:</label>
                <input className="form-control" type="fecha_creacion" name="fecha_creacion" value={user.fecha_creacion} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Rol:</label>
                <select className="form-control" name="rolId" value={user.rolId} onChange={handleChange}>
                    <option value="">Seleccione un rol</option>
                    <option value="1">Estudiante</option>
                    <option value="2">Mentor</option>
                </select>
            </div>
            <div className="form-group">
                <label>Curso/Empresa:</label>
                <select className="form-control" name="cursoId" value={user.cursoId} onChange={handleChange}>
                    <option value="">Seleccione una opción</option>
                    {user.rolId === '1' && cursos.map(curso => (
                        <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                    ))}
                    {user.rolId === '2' && empresas.map(empresa => (
                        <option key={empresa.id} value={empresa.id}>{empresa.nombre}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-success" type="submit">Registrar</button>
        </form>
    );
};

export default UserForm;
