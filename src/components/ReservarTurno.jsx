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

    // Efecto para definir el monto de la seña según el tipo de servicio seleccionado
    useEffect(() => {
        switch (tipoServicio) {
            case 'Corte de pelo':
            case 'Corte de pelo y barba':
            case 'Barba y bigote':
                setMontoSeña(1500);
                break;
            default:
                setMontoSeña('');
        }
    }, [tipoServicio]);

    // Efecto para obtener los horarios disponibles cuando se selecciona una fecha
    useEffect(() => {
        const fetchHorariosDisponibles = async () => {
            if (fecha) {
                const diaSemana = new Date(fecha).getUTCDay(); // Obtener día de la semana correctamente
                console.log("Día de la semana seleccionado:", diaSemana); // Debug
                if (diaSemana === 0) { // Si es domingo
                    setHorariosDisponibles([]);
                    setMensaje('No se pueden seleccionar turnos los domingos.');
                } else {
                    try {
                        console.log("Fetching horarios disponibles for fecha:", fecha); // Debug
                        const response = await axios.get('https://barberia-back.onrender.com/turnos/horarios-disponibles', {
                            params: { fecha }
                        });
                        console.log("Horarios disponibles recibidos del backend:", response.data); // Debug
                        setHorariosDisponibles(response.data);
                        setHora(''); // Reiniciar la selección de hora al cambiar la fecha
                        setMensaje(''); // Limpiar el mensaje si no es domingo
                    } catch (error) {
                        console.error('Error al obtener horarios disponibles:', error);
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
        const selectedDate = e.target.value;
        console.log("Fecha seleccionada:", selectedDate); // Debug
        setFecha(selectedDate);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
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
                        <option value="Corte de pelo">Corte de pelo</option>
                        <option value="Corte de pelo y barba">Corte de pelo y barba</option>
                        <option value="Barba y bigote">Barba y bigote</option>
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
                    <p>{montoSeña ? `$${montoSeña}` : 'Seleccione un tipo de servicio'}</p>
                </div>
                
                <button type="submit">Reservar Turno</button>
            </form>
            {mensaje && <p className='pago'>{mensaje}</p>}
        </div>
    );
};

export default ReservarTurno;
