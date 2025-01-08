import { useState, useEffect } from 'react';
import axios from 'axios';
import './estilos/reservar.css';

const ReservarTurno = () => {
    const [nombreCliente, setNombreCliente] = useState('');
    const [tipoServicio, setTipoServicio] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [montoSeña, setMontoSeña] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [mensaje, setMensaje] = useState('');

    // Definir el monto de la seña según el tipo de servicio seleccionado
    useEffect(() => {
        const serviciosConSeña = [
            'Corte de pelo', 
            'Corte de pelo y barba', 
            'Barba y bigote',
            'Limpieza Facial Express',
            'Limpieza Facial Completa',
            'Arquitectura De Cejas',
            'Perfilado De Cejas',
            'Diseño Con Henna',
            'Laminado De Cejas',
            'Combo - Corte + Barba + Limpieza Express',
            'Combo - Arquitectura + Limpieza Express',
            'Combo - Perfilado + Laminado',
            'Combo - Diseño Con Henna + Perfilado',
            'Combo - Perfeccionamiento De Cejas + Limpieza Completa'
        ];

        if (serviciosConSeña.includes(tipoServicio)) {
            setMontoSeña(2500);
        } else {
            setMontoSeña('');
        }
    }, [tipoServicio]);

    // Obtener los horarios disponibles cuando se selecciona una fecha
    useEffect(() => {
        const fetchHorariosDisponibles = async () => {
            if (fecha) {
                const diaSemana = new Date(fecha).getUTCDay();
                if (diaSemana === 0) { // Si es domingo
                    setHorariosDisponibles([]);
                    setMensaje('No se pueden seleccionar turnos los domingos.');
                } else {
                    try {
                        const response = await axios.get('https://barberia-back.onrender.com/turnos/horarios-disponibles', {
                            params: { fecha }
                        });
                        setHorariosDisponibles(response.data);
                        setHora('');
                        setMensaje('');
                    } catch (error) {
                        setMensaje('Error al obtener horarios disponibles.');
                    }
                }
            }
        };

        fetchHorariosDisponibles();
    }, [fecha]);

    // Manejar el envío del formulario para reservar el turno
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://barberia-back.onrender.com/turnos/reservar', {
                fechaHora: `${fecha} ${hora}`,
                nombreCliente,
                tipoServicio,
                montoSeña,
                emailCliente
            });
            setMensaje(response.data.message);
            window.location.href = response.data.init_point; // Redirigir a MercadoPago
        } catch (error) {
            setMensaje(error.response?.data?.message || 'Error al reservar el turno');
        }
    };

    // Manejar el cambio de fecha para obtener los horarios disponibles
    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Reserva tu Turno!</h1>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} required />
                </div>
                <div>
                    <label>Tipo de Servicio:</label>
                    <select value={tipoServicio} onChange={(e) => setTipoServicio(e.target.value)} required>
                        <option value="" disabled>Selecciona un servicio</option>
                        <option value="Combo - Corte + Barba + Limpieza Express">Combo - Corte + Barba + Limpieza Express</option>
                        <option value="Combo - Arquitectura + Limpieza Express">Combo - Arquitectura + Limpieza Express</option>
                        <option value="Combo - Perfilado + Laminado">Combo - Perfilado + Laminado</option>
                        <option value="Combo - Diseño Con Henna + Perfilado">Combo - Diseño Con Henna + Perfilado</option>
                        <option value="Combo - Perfeccionamiento De Cejas + Limpieza Completa">Combo - Perfeccionamiento De Cejas + Limpieza Completa</option>
                        <option value="Corte de pelo">Corte de pelo</option>
                        <option value="Corte de pelo y barba">Corte de pelo y barba</option>
                        <option value="Barba y bigote">Barba y bigote</option>
                        <option value="Limpieza Facial Express">Limpieza Facial Express</option>
                        <option value="Limpieza Facial Completa">Limpieza Facial Completa</option>
                        <option value="Arquitectura De Cejas">Arquitectura De Cejas</option>
                        <option value="Perfilados De Cejas">Perfilados De Cejas</option>
                        <option value="Diseño Con Henna">Diseño Con Henna</option>
                        <option value="Laminado De Cejas">Laminado De Cejas</option>
                    </select>
                </div>
                <div>
                    <label>Fecha:</label>
                    <input type="date" value={fecha} onChange={handleFechaChange} required />
                </div>
                <div>
                    <label>Hora:</label>
                    <select value={hora} onChange={(e) => setHora(e.target.value)} required disabled={!fecha || horariosDisponibles.length === 0}>
                        <option value="" disabled>Selecciona una hora</option>
                        {horariosDisponibles.map((horaDisponible, index) => (
                            <option key={index} value={horaDisponible}>{horaDisponible}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Monto Seña:</label>
                    <p className='seña'>{montoSeña ? `$${montoSeña}` : 'Seleccione un tipo de servicio'}</p>
                </div>

                <button type="submit" disabled={!nombreCliente || !emailCliente || !tipoServicio || !fecha || !hora}>Reservar Turno</button>
            </form>
            {mensaje && <p className='pago'>{mensaje}</p>}
        </div>
    );
};

export default ReservarTurno;
