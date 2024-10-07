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
            const usuarioID = data.id; //
            console.log("usuarioID:" + usuarioID + email+contrasena)
            onLogin(usuarioID);

            navigate(`/home?usuarioID=${usuarioID}`);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className="centered-div roboto-font">
                <h1 className="h1 display-4 fw-bold text-dark mt-5">¡Te damos la Bienvenida!</h1>
                <img className="mb-5 w-15 mx-auto d-block mt-5" src={Image} alt='img' />
                <form id="loginForm" onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="contrasena">Contraseña:</label>
                    <input type="contrasena" id="contrasena" name="contrasena" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
