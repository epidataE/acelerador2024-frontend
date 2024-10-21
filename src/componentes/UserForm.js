import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg';


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
    // const [mensaje, setMensaje] = useState('');
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
        alert('¡Usuario creado con éxito!');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="card p-4 shadow-lg w-100">
                    <form onSubmit={handleSubmit}>
                        <div className="text-center mb-4">
                            <img className="mb-4 w-50" src={Image} alt='img' />
                            <h1 className="h3 mb-3 font-weight-normal">Crear una Nueva Cuenta</h1>
                        </div>
                        <div className="form-group">
                            <label >  Email:</label>
                            <input className="form-control mt-2 mx-5 w-50" type="email" name="email" value={user.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input className="form-control mt-2 mx-1 w-50" type="password" name="contrasena" value={user.contrasena} onChange={handleChange} required />
                        </div>
                        <div className="form-group mt-2">
                            <label> Rol   :</label>
                            <select className="form-control mx-5 w-75" name="rol" value={user.rol} onChange={handleChange} required>
                                <option value="">Seleccione un rol</option>
                                <option value="ESTUDIANTE">ESTUDIANTE</option>
                                <option value="MENTOR">MENTOR</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label>Nombre:</label>
                            <input className="form-control mt-2 mx-5 w-75" type="text" name="nombre" value={user.nombre} onChange={handleChange} required />
                        </div>
                        {user.rol !== 'ADMIN' && (
                            <div className="form-group mt-2">
                                <label>Apellido:</label>
                                <input className="form-control mt-2 mx-5 w-75" type="text" name="apellido" value={user.apellido} onChange={handleChange} required />
                            </div>
                        )}
                        {user.rol !== 'ADMIN' && (
                            <div className="form-group mt-2">
                                <label>Fecha Registro:</label>
                                <input className="form-control mt-2 mx-1 w-75" type="date" name="fecha_creacion" value={user.fecha_creacion} onChange={handleChange} required />
                            </div>
                        )}
                        {user.rol !== 'ADMIN' && (
                            <div className="form-group mt-2">
                                <label>Especialización:</label>
                                <select className="form-control mt-2 w-75" name="especializacion" value={user.especializacion} onChange={handleChange} required>
                                    <option value="">Seleccione una especialización</option>
                                    <option value="DESARROLLADOR">DESARROLLADOR</option>
                                    <option value="UX_UI">UX/UI</option>
                                    <option value="QA">QA</option>
                                </select>
                            </div>
                        )}
                        {user.rol !== 'ADMIN' && (
                            <div className="form-group mt-2">
                                <label>Entidad:</label>
                                <select className="form-control mx-5 mt-2 w-75" name="empresa" value={user.empresa} onChange={handleChange} required>
                                    <option value="">Seleccione una opción</option>
                                    {entidades.map(entidad => (
                                        <option key={entidad.id} value={entidad.id}>{entidad.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <button className="btn btn-primary w-100 mt-3" type="submit">Crear Cuenta</button>
                        <div className="text-center mt-3">
                            <span>¿Ya Tienes una Cuenta?</span>
                            <Link to="/login">
                                <button className="btn btn-link mt-2">Inicia Sesión</button>
                            </Link>
                        </div>
                        <Link to="/">
                    <button className="btn btn-light btn-lg custom-button border border-dark mt-5 w-50">Volver</button>
                </Link>
                    </form>
                </div>
            </div>
        </div>
    );}

export default UserForm;

