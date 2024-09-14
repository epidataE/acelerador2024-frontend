import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserForm = ({ onSubmit }) => {
    const [user, setUser] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contrasena: '',
        fecha_creacion: '',
        rol: '',
       empresa: '',
        especializacion: ''
    });

    const [entidades, setEntidades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.rol === 'ESTUDIANTE') {
            fetch('api/empresas/entidad?tipoEntidad=INSTITUCION_EDUCATIVA')
                .then(response => response.json())
                .then(data => setEntidades(data));
        } else if (user.rol === 'MENTOR') {
            fetch('/api/empresas/entidad?tipoEntidad=EMPRESA')
                .then(response => response.json())
                .then(data => setEntidades(data));
        }
    }, [user.rol]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        onSubmit(user);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nombre:</label>
                <input className="form-control" type="text" name="nombre" value={user.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Apellido:</label>
                <input className="form-control" type="text" name="apellido" value={user.apellido} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input className="form-control" type="email" name="email" value={user.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Contraseña:</label>
                <input className="form-control" type="password" name="contrasena" value={user.contrasena} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Fecha Registro:</label>
                <input className="form-control" type="date" name="fecha_creacion" value={user.fecha_creacion} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Especialización:</label>
                <select className="form-control" name="especializacion" value={user.especializacion} onChange={handleChange} required>
                    <option value="">Seleccione una especialización</option>
                    <option value="DESARROLLADOR">DESARROLLADOR</option>
                    <option value="UX_UI">UX/UI</option>
                    <option value="QA">QA</option>
                </select>
            </div>
            <div className="form-group">
                <label>Rol:</label>
                <select className="form-control" name="rol" value={user.rol} onChange={handleChange} required>
                    <option value="">Seleccione un rol</option>
                    <option value="ESTUDIANTE">ESTUDIANTE</option>
                    <option value="MENTOR">MENTOR</option>
                </select>
            </div>
            <div className="form-group">
                <label>Entidad:</label>
                <select className="form-control" name="empresa" value={user.empresa} onChange={handleChange} required>
                    <option value="">Seleccione una opción</option>
                    {entidades.map(entidad => (
                        <option key={entidad.id} value={entidad.id}>{entidad.nombre}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-dark " type="submit">Crear Usuario</button>
            <Link to="/">
                        <button className="btn btn-dark ">Volver</button>
            </Link>
        </form>
    );
};

export default UserForm;

