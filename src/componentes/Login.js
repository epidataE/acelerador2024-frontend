import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      {/* Main container */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        {/* Login containter */}
        <div className="row border rounded-5 p-3  shadow box-area" style={{ background: "#F0F0F0" }}>
          {/* Left-box */}
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center alignt-items-center flex-column left-box"
            style={{ background: "#7E7E7E" }}
          >
            <div className="featured-image mb-3">
              <img
                src={Image}
                className="img-fluid"
                style={{ width: "250px" }}
              ></img>
            </div>
            <h2 className=" text-white display-4 fw-bold" >¡Te damos la Bienvenida!</h2>
            {/* <p className="text-white fs-2 text-center">¡Te damos la Bienvenida!</p> */}
            <small className="fw-bold text-wrap text-center">
              Formaciones integrales
            </small>
          </div>

          {/* right-box */}

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <p className='fw-bolder'>Hola de nuevo!</p>
                <p>Estamos feliz que estes de vuelta.</p>
              </div>
              <form id="loginForm" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-light  fs-6"
                    placeholder="Email address"
                    id="email"
                    name="email"
                    required
                  ></input>
                </div>
                <div className="input-group mb-1">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
                    id="contrasena"
                    name="contrasena"
                    required
                  ></input>
                </div>
                {/* <div className="input-group mb-5 d-flex justify-content-between">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id='formCheck'></input>
                    <label for="formCheck" className="form-check-label text-secondary"><small>Recordarme</small></label>
                </div>
                <div className="forgot">
                    <small><a href="#">Olvido su contrasenia?</a></small>
                </div>
            </div> */}
                <div className="input-group mb-3">
                  <button
                 
                    className="btn btn-lg btn-primary w-100 fs-6" 
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
              {/* <div className="input-grop mb-3">
                <button className="btn btn-lg btn-light w-100 fs-6"><img src="https://e7.pngegg.com/pngimages/63/1016/png-clipart-google-logo-google-logo-g-suite-chrome-text-logo.png"  style={{width:"20px"}} 
                ></img><small className="">Inicia sesion con Google</small></button>
            </div> */}
              <div className="row">
                <small>
                  No tienes cuenta aun?{" "}
                  <Link to="/registro">Crear una cuenta</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
