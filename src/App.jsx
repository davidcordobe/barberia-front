import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import './styles.css';
import useStore from './store';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const App = () => {
  const [turnos, setTurnos] = useState([]);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('08:00');
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [turnosPerPage] = useState(6); // Cantidad de turnos por página
  const [mensajeReserva, setMensajeReserva] = useState(false); // Estado para mostrar el mensaje de reserva
  const [showLoader, setShowLoader] = useState(false); // Estado para mostrar el loader
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get('http://barberia-back.onrender.com:5000/turnos');
        setTurnos(response.data);
      } catch (error) {
        console.error('Error fetching turnos:', error);
      }
    };

    fetchTurnos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true); // Mostrar loader al iniciar la reserva

    const fechaHoraSeleccionada = moment(`${fecha}T${hora}`).toISOString();

    // Verificar si el turno seleccionado ya está reservado
    const turnoReservado = turnos.find(turno => moment(turno.fechaHora).toISOString() === fechaHoraSeleccionada);
    if (turnoReservado) {
      setShowLoader(false); // Ocultar loader
      alert('El turno seleccionado ya está reservado. Por favor, elige otro turno.');
      return;
    }

    try {
      await axios.post('http://barberia-back.onrender.com:5000/turnos/reservar', { fechaHora: fechaHoraSeleccionada });
      const nuevoTurno = { fechaHora: fechaHoraSeleccionada };
      setTurnos([...turnos, nuevoTurno].sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))); // Ordenar los turnos por fecha/hora
      setFecha('');
      setHora('08:00');
      setMensajeReserva(true); // Mostrar mensaje de reserva
    } catch (error) {
      console.error('Error al reservar el turno:', error);
    } finally {
      setShowLoader(false); // Ocultar loader después de completar la reserva
    }
  };

  const generarHorario = () => {
    const horas = [];
    for (let hora = 8; hora < 20; hora++) {
      for (let minuto of ['00', '30']) {
        const horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        const fechaHoraSeleccionada = moment(`${fecha}T${horaFormateada}`).toISOString();

        // Verificar si el turno está reservado
        const turnoReservado = turnos.find(turno => moment(turno.fechaHora).toISOString() === fechaHoraSeleccionada);
        if (!turnoReservado) {
          horas.push(horaFormateada);
        }
      }
    }
    setHorasDisponibles(horas);
  };

  useEffect(() => {
    generarHorario();
  }, [fecha, turnos]);

  const { backgroundPositionX, backgroundPositionY, moveBackground, buttonSize, increaseButtonSize } = useStore();

  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    moveBackground(x * 100, y * 100);
  };

  // Calcular índices de inicio y fin de la lista de turnos por página
  const indexOfLastTurno = currentPage * turnosPerPage;
  const indexOfFirstTurno = indexOfLastTurno - turnosPerPage;
  const currentTurnos = turnos.slice(indexOfFirstTurno, indexOfLastTurno);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <div className="background" style={{ backgroundPositionX: `${backgroundPositionX}%`, backgroundPositionY: `${backgroundPositionY}%` }} />
      <div className='container' style={{ scrollBehavior: 'smooth' }}>
        <h1><span className='barber'>Lo De Masche Barber</span> </h1> <h1 className='reserva'>Reserva de Turnos</h1>
        <form onSubmit={handleSubmit}>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          <select value={hora} onChange={(e) => setHora(e.target.value)} required>
            {horasDisponibles.map((horaDisponible) => (
              <option key={horaDisponible} value={horaDisponible}>{horaDisponible}</option>
            ))}
          </select>
          <button
            type="submit"
            style={{ width: buttonSize, height: buttonSize }}
            onClick={increaseButtonSize}
            disabled={showLoader} // Deshabilitar botón mientras se está reservando el turno
          >
            {showLoader ? 'Reservando...' : 'Reservar Turno'}
          </button>
        </form>
        {/* Mostrar mensaje de reserva */}
        {mensajeReserva && (
          <div className="alerta">
            <p>¡El turno se reservó correctamente!</p>
          </div>
        )}
        {/* Mostrar loader */}
        {showLoader && <div className="loader">Cargando...</div>}
        <h2>Turnos reservados</h2>
        <ul className='turnos-container' data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="2000">
          {currentTurnos.slice(0, 8).map((turno, index) => (
            <li key={index} className='turno-item' ref={index === currentTurnos.length - 1 ? scrollRef : null}>
              {moment(turno.fechaHora).format('DD-MM-YYYY HH:mm')}
            </li>
          ))}
        </ul>

        {/* Paginación */}
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastTurno >= turnos.length}>Siguiente</button>
        </div>

        <footer className="footer">
          <p>© 2024 Lo De Masche Barber. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;