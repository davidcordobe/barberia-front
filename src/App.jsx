import ReservaTurno from './components/ReservarTurno';
import Footer from './components/Footer';
import './app.css'; // Importa estilos generales de la aplicación

const App = () => {
    return (
        <div className="app-container">
            <img src="../src/assets/fondo/MASCHE BARBER.png" alt="Logo" />
            <h1>Reserva tu Turno!</h1>
            <div className="content">
                <ReservaTurno />
            </div>
            <Footer />
        </div>
    );
};

export default App;
