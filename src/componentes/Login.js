import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../assets/POLO-IT-Buenos-Aires-sin fondo 1.svg';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const contrasena = e.target.contrasena.value;
       

        try {
            const response = await fetch('/api/login', { // Cambia la URL según tu configuración
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contrasena }),
            });

            if (!response.ok) {
                throw new Error('Email o contraseña incorrectos');
            }

            const data = await response.json();
            console.log(data)
            const usuarioID = data.id;
            const rol = data.rol //
            console.log("usuarioID:" + usuarioID + email+contrasena, rol)
            onLogin(usuarioID, rol);

            // Navegar según el rol
            if (rol === 'ADMIN') {
                navigate(`/admin?usuarioID=${usuarioID}`);
            } else {
                navigate(`/home?usuarioID=${usuarioID}`);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="card p-4 shadow-lg w-75">
                    <div className="text-center mb-4">
                        <h1 className="display-4 fw-bold">¡Te damos la Bienvenida!</h1>
                        <img className="mb-4 w-50" src={Image} alt='img' />
                    </div>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input className="form-control mt-2" type="email" 
                            placeholder="INGRESE SU EMAIL" id="email" name="email" required />
                        </div>
                        <div className="form-group mt-3">
                            {/* <label htmlFor="contrasena">Contraseña:</label> */}
                            <input className="form-control mt-2" type="password" 
                            placeholder="INGRESE SU CONTRASEÑA" id="contrasena" name="contrasena" required />
                        </div>
                        <button className="btn btn-dark w-100 mt-3" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;
