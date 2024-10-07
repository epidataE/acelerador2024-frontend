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
        <form onSubmit={handleSubmit} className="form-control centered-div">
              <div className="centered-div roboto-font">
              <img className="mb-5 w-25 mx-auto d-block" src={Image} alt='img' /> 
            <h1 className="fw-bold text-dark">Crear una Nueva Cuenta</h1>
            </div>
            <div className="form-group mt-2">
                <label>Nombre:</label>
                <input className="form-control mt-2" type="text" name="nombre" value={user.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Apellido:</label>
                <input className="form-control mt-2" type="text" name="apellido" value={user.apellido} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input className="form-control mt-2" type="email" name="email" value={user.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Contraseña:</label>
                <input className="form-control mt-2" type="password" name="contrasena" value={user.contrasena} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Fecha Registro:</label>
                <input className="form-control mt-2" type="date" name="fecha_creacion" value={user.fecha_creacion} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Especialización:</label>
                <select className="form-control mt-2" name="especializacion" value={user.especializacion} onChange={handleChange} required>
                    <option value="">Seleccione una especialización</option>
                    <option value="DESARROLLADOR">DESARROLLADOR</option>
                    <option value="UX_UI">UX/UI</option>
                    <option value="QA">QA</option>
                </select>
            </div>
            <div className="form-group mt-2">
                <label>Rol:</label>
                <select className="form-control" name="rol" value={user.rol} onChange={handleChange} required>
                    <option value="">Seleccione un rol</option>
                    <option value="ESTUDIANTE">ESTUDIANTE</option>
                    <option value="MENTOR">MENTOR</option>
                </select>
            </div>
            <div className="form-group mt-2">
                <label>Entidad:</label>
                <select className="form-control" name="empresa" value={user.empresa} onChange={handleChange} required>
                    <option value="">Seleccione una opción</option>
                    {entidades.map(entidad => (
                        <option key={entidad.id} value={entidad.id}>{entidad.nombre}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-dark w-100 mt-3" type="submit">Crear Cuenta</button>
          {/* Barra de Navegación
          <div className="d-flex justify-content-around mt-4 w-100">
                <Link to="/">
                    <button className="btn btn-dark">HOME</button>
                </Link>
                <Link to="/equipos/listado">
                    <button className="btn btn-dark">EQUIPOS</button>
                </Link>
                <Link to="/cursos">
                    <button className="btn btn-dark">CURSOS/PROYECTOS</button>
                </Link>
            </div> */}
            <div>______________________ o ____________________</div>
            <div >
                <Link to="">
                    <button className="btn btn-dark w-100 mt-2">Inicia Sesion con Google</button>
                </Link>
                <div>¿Ya Tienes una Cuenta?</div>

                <Link to="/login">
                    <button className="btn btn-dark mt-2">Inicia Sesion</button>
                </Link>
               
            </div> 

        </form>
        
    );
};

export default UserForm;

