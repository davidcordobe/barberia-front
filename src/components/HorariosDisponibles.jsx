import { useState } from 'react';
import axios from 'axios';
import './Horarios.css'

const HorariosDisponibles = () => {
    const [fecha, setFecha] = useState('');
    const [horarios, setHorarios] = useState([]);

    const handleCheckAvailability = async () => {
        try {
            const response = await axios.get('https://barberia-back.onrender.com/turnos/horarios-disponibles', {
                params: { fecha }
            });
            setHorarios(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Horarios Disponibles</h2>
            <div>
                <label>Fecha:</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                <button onClick={handleCheckAvailability}>Consultar</button>
            </div>
            {horarios.length > 0 ? (
                <ul>
                    {horarios.map((horario, index) => (
                        <li key={index}>{horario}</li>
                    ))}
                </ul>
            ) : (
                <p>No hay horarios disponibles para la fecha seleccionada.</p>
            )}
        </div>
    );
};

export default HorariosDisponibles;
