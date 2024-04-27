import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import './styles.css';
import useStore from './store';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Logo from './Logo';



AOS.init();

const App = () => {
  const [turnos, setTurnos] = useState([]);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('08:00');
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mensajeReserva, setMensajeReserva] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [nombreCliente, setNombreCliente] = useState('');
  const scrollRef = useRef(null);
  const [turno, setTurno] = useState({
    tipoServicio: '',
    nombreCliente: '',
  });

  // Estado para almacenar la cantidad de turnos por página
  const [turnosPorPagina, setTurnosPorPagina] = useState(4);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get('https://barberia-back.onrender.com/turnos');
        setTurnos(response.data);
      } catch (error) {
        console.error('Error fetching turnos:', error);
      }
    };

    fetchTurnos();
  }, []);

  // Función para actualizar la cantidad de turnos por página cuando cambia el tamaño de la pantalla
  const updateTurnosPorPagina = () => {
    setTurnosPorPagina(window.innerWidth < 768 ? 2 : 4);
  };

  // Escucha el evento 'resize' para actualizar la cantidad de turnos por página
  useEffect(() => {
    window.addEventListener('resize', updateTurnosPorPagina);
    return () => {
      window.removeEventListener('resize', updateTurnosPorPagina);
    };
  }, []);

  const handleChange = (e) => {
    setNombreCliente(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = moment(fecha);
    if (selectedDate.day() === 0) {
      alert('Los domingos no están disponibles para reservar turnos.');
      return;
    }

    try {
      setShowLoader(true);
      const fechaHoraSeleccionada = moment(`${fecha}T${hora}`).toISOString();
      const turnoReservado = turnos.find(turno => moment(turno.fechaHora).toISOString() === fechaHoraSeleccionada);
      if (turnoReservado) {
        alert('El turno seleccionado ya está reservado. Por favor, elige otro turno.');
        return;
      }

      await axios.post('https://barberia-back.onrender.com/turnos/reservar', {
        fechaHora: fechaHoraSeleccionada,
        nombreCliente: nombreCliente,
        tipoServicio: turno.tipoServicio
      });
      const nuevoTurno = { fechaHora: fechaHoraSeleccionada };
      setTurnos([...turnos, nuevoTurno].sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora)));
      setFecha('');
      setHora('08:00');
      setNombreCliente('');
      setMensajeReserva(true);
    } catch (error) {
      console.error('Error al reservar el turno:', error);
    } finally {
      setShowLoader(false);
    }
  };

  const generarHorario = () => {
    const horas = [];
    if (fecha) {
      for (let hora = 8; hora < 21; hora++) {
        for (let minuto of ['00', '30']) {
          const horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
          const fechaHoraSeleccionada = moment(`${fecha}T${horaFormateada}`).toISOString();

          const turnoReservado = turnos.find(turno => moment(turno.fechaHora).toISOString() === fechaHoraSeleccionada);
          if (!turnoReservado) {
            horas.push(horaFormateada);
          }
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

  const indexOfLastTurno = currentPage * turnosPorPagina;
  const indexOfFirstTurno = indexOfLastTurno - turnosPorPagina;
  const currentTurnos = turnos.slice(indexOfFirstTurno, indexOfLastTurno);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <div className="background" style={{ backgroundPositionX: `${backgroundPositionX}%`, backgroundPositionY: `${backgroundPositionY}%` }} />
      <div className='container' style={{ scrollBehavior: 'smooth' }}>
      <Logo alt="Masche Barber" />
        <h1 className='reserva'>Reserva de Turnos</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombreCliente" value={nombreCliente} onChange={handleChange} className="cliente" placeholder="Nombre" required />
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          <select value={hora} onChange={(e) => setHora(e.target.value)} required>
            {horasDisponibles.map((horaDisponible) => (
              <option key={horaDisponible} value={horaDisponible}>{horaDisponible}</option>
            ))}
          </select>
          <select
            name="tipoServicio"
            value={turno.tipoServicio}
            onChange={(e) => setTurno({ ...turno, tipoServicio: e.target.value })}
            className="input"
            required
          >
            <option value="">Seleccionar</option>
            <option value="Corte de Pelo">Corte de Pelo</option>
            <option value="Corte y Barba">Corte y Barba</option>
            <option value="Barba y Bigote">Barba y Bigote</option>
          </select>
  
          <button
            type="submit"
            style={{ width: buttonSize, height: buttonSize }}
            onClick={increaseButtonSize}
            disabled={showLoader || !nombreCliente || (moment(fecha).day() === 0)}
          >
            {showLoader ? 'Reservando...' : 'Reservar Turno'}
          </button>
        </form>
        {mensajeReserva && (
          <div className="alerta">
            <p>¡El turno se reservó correctamente!</p>
          </div>
        )}
        {showLoader && <div className="loader">Cargando...</div>}
        <h2>Turnos reservados</h2>
        <ul className='turnos-container' data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="2000">
          {currentTurnos.map((turno, index) => (
            <li key={index} className='turno-item' ref={index === currentTurnos.length - 1 ? scrollRef : null}>
              {moment(turno.fechaHora).format('DD-MM-YYYY HH:mm')}
            </li>
          ))}
        </ul>
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
