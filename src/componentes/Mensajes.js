import React, { useEffect, useState } from 'react';

const Mensajes = ({ usuarioId }) => {
    const [mensajesRecibidos, setMensajesRecibidos] = useState([]);
    const [mensajesEnviados, setMensajesEnviados] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const [destinatarioId, setDestinatarioId] = useState('');

    // Función para obtener mensajes recibidos
    const obtenerMensajesRecibidos = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/mensajes/recibir/${usuarioId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setMensajesRecibidos(data);
            console.log(data.mensajesRecibidos);
        } catch (error) {
            console.error("Error al obtener los mensajes recibidos", error);
        }
    };

    // Función para obtener mensajes enviados
    const obtenerMensajesEnviados = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/mensajes/enviados/${usuarioId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setMensajesEnviados(data);
        } catch (error) {
            console.error("Error al obtener los mensajes enviados", error);
        }
    };

    // Función para enviar un nuevo mensaje
    const enviarMensaje = async () => {
        if (nuevoMensaje.trim() === '' || destinatarioId.trim() === '') return;

        try {
            const response = await fetch('http://localhost:8080/api/mensajes/enviar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    remitenteId: usuarioId,
                    destinatarioId: destinatarioId,
                    contenido: nuevoMensaje,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            setNuevoMensaje('');
            setDestinatarioId('');
            obtenerMensajesRecibidos(); // Actualiza la lista de mensajes después de enviar uno nuevo
            obtenerMensajesEnviados(); // También actualiza los mensajes enviados
        } catch (error) {
            console.error("Error al enviar el mensaje", error);
        }
    };

    useEffect(() => {
        obtenerMensajesRecibidos(); // Llama a la función al montar el componente
        obtenerMensajesEnviados(); // Llama a la función al montar el componente
    }, [usuarioId]);

    //console.log(mensajesRecibidos.remitente.apellido);

    return (
        <div>
            <h1>Mensajes Recibidos</h1>
            <div>
                {mensajesRecibidos.map((mensaje) => (
                    <div key={mensaje.id}>
                        <p>{mensaje.contenido} - De: {mensaje.remitenteId}</p>
                    </div>
                ))}
            </div>

            <h1>Mensajes Enviados</h1>
            <div>
                {mensajesEnviados.map((mensaje) => (
                    <div key={mensaje.id}>
                        <p>{mensaje.contenido} - Para: {mensaje.destinatarioId}</p>
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                placeholder="Escribe un nuevo mensaje"
            />
            <input
                type="text"
                value={destinatarioId}
                onChange={(e) => setDestinatarioId(e.target.value)}
                placeholder="ID del destinatario"
            />
            <button onClick={enviarMensaje}>Enviar</button>
        </div>
    );
};

export default Mensajes;