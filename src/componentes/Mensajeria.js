import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Mensajeria = ({usuarioId}) => {
   
    const [mensajesRecibidos, setMensajesRecibidos] = useState([]);
    const [mensajesEnviados, setMensajesEnviados] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState({
        remitenteId: usuarioId,
        destinatarioEmail: '',  
        contenido: ''
    });

    // Función para obtener mensajes recibidos
    const obtenerMensajesRecibidos = async () => {
        const response = await fetch(`/api/mensajes/recibir/${usuarioId}`);
        const data = await response.json();
        console.log(data)
        setMensajesRecibidos(data);
    };

    // Función para obtener mensajes enviados
    const obtenerMensajesEnviados = async () => {
        const response = await fetch(`/api/mensajes/enviados/${usuarioId}`);
        const data = await response.json();
        setMensajesEnviados(data);
    };
     // Función para buscar ID del destinatario basado en su email
     const buscarDestinatarioId = async (email) => {
        const response = await fetch(`/api/usuarios/buscarPorEmail?email=${email}`);
        if (response.ok) {
            const data = await response.json();
            return data.id; // Suponiendo que la respuesta tiene un campo 'id'
        }
        return null;
    };

    // Función para enviar un nuevo mensaje
    const enviarMensaje = async (e) => {
        e.preventDefault();
          // Busca el ID del destinatario usando su email
          const id = await buscarDestinatarioId(nuevoMensaje.destinatarioEmail);
        console.log("Mensaje a Enviar: " + JSON.stringify(nuevoMensaje, null, 2), "id Remitente: " + id);
          if (id) {
            nuevoMensaje.destinatarioId = id;
        await fetch('/api/mensajes/enviar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoMensaje),
        });
        // Limpiar el formulario y actualizar la lista de mensajes
        setNuevoMensaje({ remitenteId: '', destinatarioId: '', contenido: '' });
        alert("El mensaje se ha enviado correctamente")
        obtenerMensajesEnviados();}
        else {
            alert("El correo electrónico del destinatario no es válido.");
        }
    };

    useEffect(() => {      

        obtenerMensajesRecibidos();
        obtenerMensajesEnviados();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
       
       <div>
          <div className="recuadro d-flex justify-content-between align-items-center p-3">
           <h2 className="fw-bolder">MENSAJERIA</h2>                        
           <Link to="/"> <button className="btn btn-secondary">CERRAR SESION</button> </Link> 
            <Link to="/mensajes"> <button className="btn btn-secondary">MENSAJES</button> </Link>             
       </div>
            <div className='card'>
            <h2>Mensajes Recibidos</h2>          
            {mensajesRecibidos.length === 0 ? (
                    <p className='card-mensajes'>No tienes mensajes recibidos.</p>
                ) : (
                    <ul>
                        {mensajesRecibidos.map((recibidos) => (
                            <li className='card-mensajes' key={recibidos.id}>
                                Fecha: {recibidos.fechaEnvio} - De: {recibidos.remitenteNombre} - Mensaje: {recibidos.contenido}
                            </li>
                        ))}
                    </ul>
                )}
           
            </div>
            <div className='card'>
            <h2>Mensajes Enviados</h2>
            {mensajesEnviados.length === 0 ? (
                    <p>No tienes mensajes enviados.</p>
                ) : (
                    <ul>
                        {mensajesEnviados.map((enviados) => (
                            <li className='card-mensajes' key={enviados.id}>
                                Fecha: {enviados.fechaEnvio} - Para: {enviados.destinatarioNombre} - Mensaje: {enviados.contenido}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='card centered-div'>
            <h2 className='mb-4'>Enviar Mensaje</h2>
            <form onSubmit={enviarMensaje}>
                <input className='mx-5 my-3 mb-4 mt-4 w-75'
                    type="text"
                    placeholder="Destinatario Email"
                    value={nuevoMensaje.destinatarioEmail}
                    onChange={(e) => setNuevoMensaje({ ...nuevoMensaje, destinatarioEmail: e.target.value })}
                    required
                />
                <textarea className='mx-5 my-3 w-75'
                    placeholder="Contenido"
                    value={nuevoMensaje.contenido}
                    onChange={(e) => setNuevoMensaje({ ...nuevoMensaje, contenido: e.target.value })}
                    required
                />
                <button className='mx-5 w-50 btn btn-dark' type="submit">Enviar Mensaje</button>
            </form>
            </div>
            {/* Barra de Navegación */}
         <div className="d-flex justify-content-center mt-4  w-75">
                <Link to="/home">
                    <button className="btn btn-dark">HOME</button>
                </Link> </div>
        </div>
    );
};

export default Mensajeria;